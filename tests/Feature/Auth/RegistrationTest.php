<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register and are redirected to OTP verification', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('verification.notice'));
    $this->assertGuest();
    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com',
        'role' => 'user',
        'email_verified_at' => null,
    ]);
});

test('user can request a new registration OTP code via resend-otp', function () {
    \Illuminate\Support\Facades\Mail::fake();

    $user = \App\Models\User::factory()->create([
        'email_verified_at' => null,
    ]);

    // Resend with pending_user_id in session
    $response = $this->withSession(['pending_user_id' => $user->id])
        ->post(route('verification.resend'), [
            'email' => $user->email,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('status');

    \Illuminate\Support\Facades\Mail::assertSent(\App\Mail\OtpVerificationMail::class, function ($mail) {
        return $mail->purpose === 'registration';
    });
});
