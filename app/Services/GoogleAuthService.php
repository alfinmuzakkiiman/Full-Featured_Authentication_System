<?php

namespace App\Services;

use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GoogleAuthService
{
    /**
     * Redirect to Google OAuth provider.
     */
    public function getRedirectResponse(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google.
     *
     * @throws Exception
     */
    public function handleCallback(): User
    {
        /** @var SocialiteUser $googleUser */
        $googleUser = Socialite::driver('google')->user();

        $googleId = (string) $googleUser->getId();
        $email = $googleUser->getEmail();
        $name = $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User';

        try {
            $avatar = $googleUser->getAvatar();
        } catch (\Throwable) {
            $avatar = null;
        }

        // Check if raw user data indicates email is verified
        $raw = $googleUser->getRaw();
        $emailVerified = $raw['email_verified'] ?? true;

        if (empty($email)) {
            throw new Exception('Unable to retrieve email from Google account.');
        }

        return DB::transaction(function () use ($googleId, $email, $name, $avatar, $emailVerified) {
            // 1. Check if social account already linked
            $socialAccount = SocialAccount::where('provider', 'google')
                ->where('provider_user_id', $googleId)
                ->first();

            if ($socialAccount) {
                return $socialAccount->user;
            }

            // 2. Check if local account exists with this email
            $existingUser = User::where('email', $email)->first();

            if ($existingUser) {
                // Only link if Google email is verified
                if (! $emailVerified) {
                    throw new Exception('Google email is not verified. Account linking rejected.');
                }

                $updates = [];
                if (! $existingUser->email_verified_at) {
                    $updates['email_verified_at'] = now();
                }
                if (! $existingUser->getRawOriginal('avatar') && $avatar) {
                    $updates['avatar'] = $avatar;
                }
                if (! empty($updates)) {
                    $existingUser->update($updates);
                }

                SocialAccount::create([
                    'user_id' => $existingUser->id,
                    'provider' => 'google',
                    'provider_user_id' => $googleId,
                    'provider_email' => $email,
                ]);

                return $existingUser;
            }

            // 3. Create new user with role 'user'
            $newUser = User::create([
                'name' => $name,
                'email' => $email,
                'password' => null,
                'role' => 'user',
                'avatar' => $avatar,
                'email_verified_at' => now(),
            ]);

            SocialAccount::create([
                'user_id' => $newUser->id,
                'provider' => 'google',
                'provider_user_id' => $googleId,
                'provider_email' => $email,
            ]);

            return $newUser;
        });
    }
}
