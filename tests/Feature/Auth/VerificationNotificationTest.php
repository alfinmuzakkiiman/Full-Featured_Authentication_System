<?php

use App\Mail\OtpVerificationMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('resend sends new OTP verification email', function () {
    Mail::fake();

    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->post(route('verification.resend'))
        ->assertRedirect();

    Mail::assertSent(OtpVerificationMail::class);
});

test('does not resend OTP if email is already verified', function () {
    Mail::fake();

    $user = User::factory()->create(['email_verified_at' => now(), 'role' => 'user']);

    $this->actingAs($user)
        ->post(route('verification.resend'))
        ->assertRedirect(route('user.dashboard'));

    Mail::assertNothingSent();
});
