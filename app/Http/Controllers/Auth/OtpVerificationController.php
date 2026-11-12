<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OtpVerificationController extends Controller
{
    public function __construct(
        protected OtpService $otpService
    ) {}

    /**
     * Resolve the target user for verification.
     */
    protected function resolveUser(Request $request): ?User
    {
        if ($user = $request->user()) {
            return $user;
        }

        if ($userId = $request->session()->get('pending_user_id')) {
            return User::find($userId);
        }

        return null;
    }

    /**
     * Show the OTP verification screen.
     */
    public function show(Request $request): Response|RedirectResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return redirect()->route('login');
        }

        if ($user->hasVerifiedEmail()) {
            return $user->isAdmin()
                ? redirect()->route('admin.dashboard')
                : redirect()->route('user.dashboard');
        }

        $cooldown = $this->otpService->getResendCooldownSeconds($user, 'registration');

        return Inertia::render('auth/verify-email', [
            'email' => $user->email,
            'status' => $request->session()->get('status'),
            'cooldown' => $cooldown,
        ]);
    }

    /**
     * Verify the submitted OTP code.
     */
    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'otp' => ['required', 'string', 'size:6'],
        ]);

        $user = $this->resolveUser($request);

        if (! $user) {
            return redirect()->route('login')->with('error', 'Session expired. Please log in again.');
        }

        if ($user->hasVerifiedEmail()) {
            return $user->isAdmin()
                ? redirect()->route('admin.dashboard')
                : redirect()->route('user.dashboard');
        }

        $result = $this->otpService->verify($user, $request->input('otp'), 'registration');

        if (! $result['success']) {
            return back()->withErrors([
                'otp' => $result['message'],
            ]);
        }

        // Log in the verified user
        Auth::login($user);
        $request->session()->regenerate();
        $request->session()->forget('pending_user_id');

        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard')->with('success', 'Email verified successfully.');
        }

        return redirect()->route('user.dashboard')->with('success', 'Email verified successfully.');
    }

    /**
     * Resend a fresh OTP verification code.
     */
    public function resend(Request $request): RedirectResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return redirect()->route('login');
        }

        if ($user->hasVerifiedEmail()) {
            return $user->isAdmin()
                ? redirect()->route('admin.dashboard')
                : redirect()->route('user.dashboard');
        }

        if (! $this->otpService->canResend($user, 'registration')) {
            $remaining = $this->otpService->getResendCooldownSeconds($user, 'registration');

            return back()->withErrors([
                'otp' => "Please wait {$remaining} seconds before requesting a new code.",
            ]);
        }

        $otp = $this->otpService->generate($user, 'registration');

        $status = 'A new 6-digit verification code has been sent to your email.';
        if (config('app.show_demo_otp')) {
            $status .= " (Mode Demo OTP: {$otp['code']})";
        }

        return back()->with('status', $status);
    }
}
