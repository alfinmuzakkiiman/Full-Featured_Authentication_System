<?php

namespace App\Services;

use App\Mail\OtpVerificationMail;
use App\Models\EmailVerificationCode;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class OtpService
{
    public const CODE_LENGTH = 6;

    public const EXPIRATION_MINUTES = 5;

    public const MAX_ATTEMPTS = 5;

    public const RESEND_COOLDOWN_SECONDS = 60;

    /**
     * Generate and dispatch a new OTP for the user.
     *
     * @return array{code: string, record: EmailVerificationCode}
     */
    public function generate(User $user, string $purpose = 'registration'): array
    {
        // Invalidate previous unconsumed codes for this user & purpose
        EmailVerificationCode::where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->whereNull('consumed_at')
            ->update(['consumed_at' => now()]);

        // Generate 6 digit numeric code
        $code = sprintf('%06d', random_int(0, 999999));

        $record = EmailVerificationCode::create([
            'user_id' => $user->id,
            'code_hash' => Hash::make($code),
            'purpose' => $purpose,
            'expires_at' => now()->addMinutes(self::EXPIRATION_MINUTES),
            'attempts' => 0,
        ]);

        $this->sendEmail($user, $code, $purpose);

        return [
            'code' => $code,
            'record' => $record,
        ];
    }

    /**
     * Check if user is eligible to resend OTP.
     */
    public function canResend(User $user, string $purpose = 'registration'): bool
    {
        return $this->getResendCooldownSeconds($user, $purpose) <= 0;
    }

    /**
     * Remaining seconds of cooldown before next resend.
     */
    public function getResendCooldownSeconds(User $user, string $purpose = 'registration'): int
    {
        $lastRecord = EmailVerificationCode::where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->latest('created_at')
            ->first();

        if (! $lastRecord) {
            return 0;
        }

        $elapsedSeconds = (int) abs(now()->diffInSeconds($lastRecord->created_at));

        if ($elapsedSeconds < self::RESEND_COOLDOWN_SECONDS) {
            return self::RESEND_COOLDOWN_SECONDS - $elapsedSeconds;
        }

        return 0;
    }

    /**
     * Verify an OTP.
     *
     * @return array{success: bool, message: string}
     */
    public function verify(User $user, string $code, string $purpose = 'registration'): array
    {
        $record = EmailVerificationCode::where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->whereNull('consumed_at')
            ->latest('created_at')
            ->first();

        if (! $record) {
            return [
                'success' => false,
                'message' => 'Tidak ada kode verifikasi aktif. Silakan minta kode baru.',
            ];
        }

        if ($record->isExpired()) {
            return [
                'success' => false,
                'message' => 'Kode verifikasi telah kedaluwarsa (lebih dari 5 menit). Silakan minta kode baru.',
            ];
        }

        if ($record->attempts >= self::MAX_ATTEMPTS) {
            return [
                'success' => false,
                'message' => 'Batas maksimal 5 kali percobaan telah habis. Silakan klik "Kirim ulang kode" untuk mendapatkan kode baru.',
            ];
        }

        $record->increment('attempts');

        if (! Hash::check($code, $record->code_hash)) {
            $remaining = max(0, self::MAX_ATTEMPTS - $record->attempts);

            return [
                'success' => false,
                'message' => $remaining > 0
                    ? "Kode verifikasi salah. Sisa {$remaining} kali kesempatan lagi."
                    : 'Batas maksimal 5 kali percobaan telah habis. Silakan klik "Kirim ulang kode" untuk mendapatkan kode baru.',
            ];
        }

        // Code matched
        $record->update(['consumed_at' => now()]);

        if (in_array($purpose, ['registration', 'invitation'], true)) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }

        return [
            'success' => true,
            'message' => 'Verification successful.',
        ];
    }

    /**
     * Send email notification safely.
     */
    protected function sendEmail(User $user, string $code, string $purpose): void
    {
        try {
            Mail::to($user->email)->send(new OtpVerificationMail($code, $purpose));
        } catch (Throwable $e) {
            Log::warning('Failed to send OTP verification email: '.$e->getMessage(), [
                'user_id' => $user->id,
                'purpose' => $purpose,
            ]);
        }
    }
}
