<?php

use App\Mail\OtpVerificationMail;
use App\Models\EmailVerificationCode;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

test('forgot password screen can be rendered', function () {
    $response = $this->get(route('password.request'));

    $response->assertOk();
});

test('forgot password fails for non-existent email', function () {
    $response = $this->post(route('password.email'), [
        'email' => 'nonexistent@example.com',
    ]);

    $response->assertSessionHasErrors('email');
});

test('forgot password sends 6-digit OTP code to registered email and redirects to reset password', function () {
    Mail::fake();

    $user = User::factory()->create([
        'email' => 'student@uika-bogor.ac.id',
    ]);

    $response = $this->post(route('password.email'), [
        'email' => $user->email,
    ]);

    $response->assertRedirect(route('password.reset'));
    $response->assertSessionHas('password_reset_email', $user->email);

    Mail::assertSent(OtpVerificationMail::class, function ($mail) {
        return $mail->purpose === 'password_reset' && strlen($mail->code) === 6;
    });

    $this->assertDatabaseHas('email_verification_codes', [
        'user_id' => $user->id,
        'purpose' => 'password_reset',
        'consumed_at' => null,
    ]);
});

test('reset password screen redirects to request page if no email in session or query', function () {
    $response = $this->get(route('password.reset'));

    $response->assertRedirect(route('password.request'));
});

test('reset password screen can be rendered with valid email in session', function () {
    $user = User::factory()->create();

    $response = $this->withSession(['password_reset_email' => $user->email])
        ->get(route('password.reset'));

    $response->assertOk();
});

test('reset password fails with invalid OTP code', function () {
    $user = User::factory()->create();

    /** @var OtpService $otpService */
    $otpService = app(OtpService::class);
    $otpService->generate($user, 'password_reset');

    $response = $this->post(route('password.update'), [
        'email' => $user->email,
        'otp' => '000000',
        'password' => 'NewSecretPassword123!',
        'password_confirmation' => 'NewSecretPassword123!',
    ]);

    $response->assertSessionHasErrors('otp');
});

test('reset password succeeds with valid OTP code, updates password and redirects to login', function () {
    $user = User::factory()->unverified()->create([
        'password' => Hash::make('OldPassword123!'),
    ]);

    /** @var OtpService $otpService */
    $otpService = app(OtpService::class);
    $generated = $otpService->generate($user, 'password_reset');
    $code = $generated['code'];

    $response = $this->withSession(['password_reset_email' => $user->email])
        ->post(route('password.update'), [
            'email' => $user->email,
            'otp' => $code,
            'password' => 'NewSecretPassword123!',
            'password_confirmation' => 'NewSecretPassword123!',
        ]);

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('status');

    $user->refresh();
    expect(Hash::check('NewSecretPassword123!', $user->password))->toBeTrue();
    expect($user->hasVerifiedEmail())->toBeTrue();

    // Verify OTP record is marked consumed
    $record = EmailVerificationCode::where('user_id', $user->id)
        ->where('purpose', 'password_reset')
        ->first();
    expect($record->consumed_at)->not->toBeNull();
});

test('resend OTP sends a new code for password reset', function () {
    Mail::fake();

    $user = User::factory()->create();

    $response = $this->withSession(['password_reset_email' => $user->email])
        ->post(route('password.resend'), [
            'email' => $user->email,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('status');

    Mail::assertSent(OtpVerificationMail::class, function ($mail) {
        return $mail->purpose === 'password_reset';
    });
});
