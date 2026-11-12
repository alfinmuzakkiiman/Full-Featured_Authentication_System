<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetOtpController extends Controller
{
    public function __construct(
        protected OtpService $otpService
    ) {}

    /**
     * Display the forgot password request view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Send a 6-digit OTP code to the user's registered email.
     */
    public function sendOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);

        $user = User::where('email', Str::lower($request->email))->first();

        if (! $user) {
            return back()->withErrors([
                'email' => 'Kami tidak dapat menemukan akun dengan alamat email tersebut.',
            ]);
        }

        if (! $this->otpService->canResend($user, 'password_reset')) {
            $remaining = $this->otpService->getResendCooldownSeconds($user, 'password_reset');

            return back()->withErrors([
                'email' => "Silakan tunggu {$remaining} detik sebelum meminta kode baru.",
            ]);
        }

        $this->otpService->generate($user, 'password_reset');

        $request->session()->put('password_reset_email', $user->email);

        return redirect()->route('password.reset')->with('status', 'Kode verifikasi 6-digit telah dikirimkan ke email Anda.');
    }

    /**
     * Display the reset password view with OTP verification.
     */
    public function showResetForm(Request $request): Response|RedirectResponse
    {
        $email = $request->session()->get('password_reset_email') ?? $request->query('email');

        if (! $email) {
            return redirect()->route('password.request');
        }

        $user = User::where('email', Str::lower($email))->first();

        if (! $user) {
            return redirect()->route('password.request');
        }

        $cooldown = $this->otpService->getResendCooldownSeconds($user, 'password_reset');

        return Inertia::render('auth/reset-password', [
            'email' => $user->email,
            'cooldown' => $cooldown,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Resend a fresh OTP code for password reset.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $email = $request->input('email') ?? $request->session()->get('password_reset_email');

        if (! $email) {
            return redirect()->route('password.request');
        }

        $user = User::where('email', Str::lower($email))->first();

        if (! $user) {
            return redirect()->route('password.request');
        }

        if (! $this->otpService->canResend($user, 'password_reset')) {
            $remaining = $this->otpService->getResendCooldownSeconds($user, 'password_reset');

            return back()->withErrors([
                'otp' => "Silakan tunggu {$remaining} detik sebelum meminta kode baru.",
            ]);
        }

        $this->otpService->generate($user, 'password_reset');

        return back()->with('status', 'Kode verifikasi baru telah dikirimkan ke email Anda.');
    }

    /**
     * Verify the OTP and reset the user's password.
     */
    public function reset(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'otp' => ['required', 'string', 'size:6'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
        ]);

        $user = User::where('email', Str::lower($request->email))->first();

        if (! $user) {
            return back()->withErrors([
                'email' => 'Akun dengan email tersebut tidak ditemukan.',
            ]);
        }

        $result = $this->otpService->verify($user, $request->otp, 'password_reset');

        if (! $result['success']) {
            return back()->withErrors([
                'otp' => $result['message'],
            ]);
        }

        // Update password and invalidate remember token
        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        // If email was unverified, mark as verified now that they verified ownership via OTP
        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        $request->session()->forget('password_reset_email');

        return redirect()->route('login')->with('status', 'Password Anda berhasil diperbarui! Silakan masuk dengan password baru.');
    }
}
