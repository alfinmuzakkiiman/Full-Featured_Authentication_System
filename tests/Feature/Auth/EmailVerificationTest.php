<?php

use App\Models\User;
use App\Services\OtpService;

test('email verification screen can be rendered for unverified user', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get(route('verification.notice'));

    $response->assertOk();
});

test('unverified users are redirected to the email verification prompt when accessing verified routes', function () {
    $user = User::factory()->unverified()->create(['role' => 'user']);

    $response = $this->actingAs($user)->get(route('user.dashboard'));

    $response->assertRedirect(route('verification.notice'));
});

test('email can be verified via OTP', function () {
    $user = User::factory()->unverified()->create();
    $otpService = app(OtpService::class);
    $generated = $otpService->generate($user, 'registration');

    $response = $this->actingAs($user)->post(route('verification.verify'), [
        'otp' => $generated['code'],
    ]);

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('user.dashboard'));
});

test('already verified user visiting verification notice is redirected to dashboard', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->get(route('verification.notice'));

    $response->assertRedirect(route('user.dashboard'));
});
