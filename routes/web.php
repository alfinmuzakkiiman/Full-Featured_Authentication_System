<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\OtpVerificationController;
use App\Http\Controllers\Auth\PasswordResetOtpController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Root URL: redirect to dashboard (authenticated) or login (guest)
Route::get('/', function (Request $request) {
    if ($user = $request->user()) {
        return $user->isAdmin()
            ? redirect()->route('admin.dashboard')
            : redirect()->route('user.dashboard');
    }

    return redirect()->route('login');
})->name('home');

// Guest Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->name('login.store')
        ->middleware('throttle:login');

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');

    Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

    // Forgot Password & OTP Password Reset Routes
    Route::get('/forgot-password', [PasswordResetOtpController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetOtpController::class, 'sendOtp'])->name('password.email');
    Route::get('/reset-password', [PasswordResetOtpController::class, 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', [PasswordResetOtpController::class, 'reset'])->name('password.update');
    Route::post('/forgot-password/resend-otp', [PasswordResetOtpController::class, 'resendOtp'])->name('password.resend');
});

// OTP Email Verification Routes (accessible by pending guest or authenticated unverified user)
Route::get('/verify-email', [OtpVerificationController::class, 'show'])->name('verification.notice');
Route::post('/verify-email', [OtpVerificationController::class, 'verify'])->name('verification.verify');
Route::post('/resend-otp', [OtpVerificationController::class, 'resend'])->name('verification.resend');

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Confirm Password (required by RequirePassword middleware for security settings)
    Route::get('/confirm-password', function () {
        return Inertia::render('auth/confirm-password');
    })->name('password.confirm');

    Route::post('/confirm-password', function (Request $request) {
        if (! Hash::check($request->password, $request->user()->password)) {
            return back()->withErrors([
                'password' => 'Password yang Anda masukkan salah.',
            ]);
        }

        $request->session()->passwordConfirmed();

        return redirect()->intended('/settings/security');
    })->middleware('throttle:6,1');

    // Default dashboard redirect based on role
    Route::get('/dashboard', function (Request $request) {
        return $request->user()->isAdmin()
            ? redirect()->route('admin.dashboard')
            : redirect()->route('user.dashboard');
    })->name('dashboard');

    // Admin Protected Routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
        Route::get('/profile', [UserProfileController::class, 'show'])->name('profile');
    });

    // Profile Avatar Routes
    Route::post('/profile/avatar', [UserProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::delete('/profile/avatar', [UserProfileController::class, 'destroyAvatar'])->name('profile.avatar.destroy');

    // User Protected Routes
    Route::middleware(['role:user', 'verified'])->prefix('user')->name('user.')->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
        Route::get('/profile', [UserProfileController::class, 'show'])->name('profile');
    });
});

require __DIR__.'/settings.php';
