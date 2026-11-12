<?php

use App\Models\EmailVerificationCode;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();
});

test('AUTH-01: valid registration creates user with user role and sends OTP', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'SecurePass123!',
        'password_confirmation' => 'SecurePass123!',
    ]);

    $response->assertRedirect(route('verification.notice'));

    $user = User::where('email', 'john@example.com')->first();
    expect($user)->not->toBeNull()
        ->and($user->role)->toBe('user')
        ->and($user->email_verified_at)->toBeNull();

    $this->assertDatabaseHas('email_verification_codes', [
        'user_id' => $user->id,
        'purpose' => 'registration',
    ]);
});

test('AUTH-02: registration with duplicate email is rejected', function () {
    User::factory()->create(['email' => 'existing@example.com']);

    $response = $this->post(route('register.store'), [
        'name' => 'Another User',
        'email' => 'existing@example.com',
        'password' => 'SecurePass123!',
        'password_confirmation' => 'SecurePass123!',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('AUTH-03: registration with password mismatch is rejected', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'John Doe',
        'email' => 'mismatch@example.com',
        'password' => 'SecurePass123!',
        'password_confirmation' => 'DifferentPass!',
    ]);

    $response->assertSessionHasErrors(['password']);
});

test('AUTH-04: valid OTP successfully verifies user email', function () {
    $user = User::factory()->unverified()->create();
    $otpService = app(OtpService::class);
    $generated = $otpService->generate($user, 'registration');

    $response = $this->withSession(['pending_user_id' => $user->id])
        ->post(route('verification.verify'), [
            'otp' => $generated['code'],
        ]);

    $response->assertRedirect(route('user.dashboard'));

    $user->refresh();
    expect($user->hasVerifiedEmail())->toBeTrue();
    $this->assertAuthenticatedAs($user);
});

test('AUTH-05: invalid OTP is rejected and attempt counter increments', function () {
    $user = User::factory()->unverified()->create();
    $otpService = app(OtpService::class);
    $otpService->generate($user, 'registration');

    $response = $this->withSession(['pending_user_id' => $user->id])
        ->post(route('verification.verify'), [
            'otp' => '000000',
        ]);

    $response->assertSessionHasErrors(['otp']);

    $codeRecord = EmailVerificationCode::where('user_id', $user->id)->first();
    expect($codeRecord->attempts)->toBe(1);

    $user->refresh();
    expect($user->hasVerifiedEmail())->toBeFalse();
});

test('AUTH-06: expired OTP is rejected', function () {
    $user = User::factory()->unverified()->create();
    $code = '123456';
    EmailVerificationCode::create([
        'user_id' => $user->id,
        'code_hash' => Hash::make($code),
        'purpose' => 'registration',
        'expires_at' => now()->subMinute(),
        'attempts' => 0,
    ]);

    $response = $this->withSession(['pending_user_id' => $user->id])
        ->post(route('verification.verify'), [
            'otp' => $code,
        ]);

    $response->assertSessionHasErrors(['otp']);
    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('AUTH-07: already consumed OTP cannot be reused', function () {
    $user = User::factory()->unverified()->create();
    $code = '123456';
    EmailVerificationCode::create([
        'user_id' => $user->id,
        'code_hash' => Hash::make($code),
        'purpose' => 'registration',
        'expires_at' => now()->addMinutes(5),
        'attempts' => 1,
        'consumed_at' => now(),
    ]);

    $response = $this->withSession(['pending_user_id' => $user->id])
        ->post(route('verification.verify'), [
            'otp' => $code,
        ]);

    $response->assertSessionHasErrors(['otp']);
});

test('AUTH-08: verified user can login with valid password and is redirected by role', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => Hash::make('password123'),
        'role' => 'user',
        'email_verified_at' => now(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => 'user@example.com',
        'password' => 'password123',
    ]);

    $response->assertRedirect(route('user.dashboard'));
    $this->assertAuthenticatedAs($user);
});

test('AUTH-09: login with incorrect password fails with generic message', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => Hash::make('correct-password'),
        'email_verified_at' => now(),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => 'user@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors(['email']);
    $this->assertGuest();
});

test('AUTH-10: login before email verification redirects to OTP verification', function () {
    $user = User::factory()->unverified()->create([
        'email' => 'unverified@example.com',
        'password' => Hash::make('password123'),
    ]);

    $response = $this->post(route('login.store'), [
        'email' => 'unverified@example.com',
        'password' => 'password123',
    ]);

    $response->assertRedirect(route('verification.notice'));
    $this->assertGuest();
});

test('AUTH-11: logout destroys session and redirects to login', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});
