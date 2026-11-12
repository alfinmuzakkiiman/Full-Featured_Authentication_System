<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile view.
     */
    public function show(Request $request): Response
    {
        $user = $request->user();
        $socialAccounts = $user->socialAccounts()->get(['provider', 'provider_email', 'created_at']);

        return Inertia::render('user/profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar' => $user->avatar,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'has_password' => $user->password !== null,
            ],
            'socialAccounts' => $socialAccounts,
        ]);
    }

    /**
     * Update the user's avatar image.
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:2048'],
        ]);

        $user = $request->user();

        // Delete old avatar from public storage if exists
        $oldAvatar = $user->getRawOriginal('avatar');
        if ($oldAvatar && ! str_starts_with($oldAvatar, 'http://') && ! str_starts_with($oldAvatar, 'https://')) {
            Storage::disk('public')->delete($oldAvatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->forceFill(['avatar' => $path])->save();

        return back()->with('success', 'Profile photo updated successfully.');
    }

    /**
     * Delete the user's avatar image.
     */
    public function destroyAvatar(Request $request): RedirectResponse
    {
        $user = $request->user();
        $oldAvatar = $user->getRawOriginal('avatar');

        if ($oldAvatar && ! str_starts_with($oldAvatar, 'http://') && ! str_starts_with($oldAvatar, 'https://')) {
            Storage::disk('public')->delete($oldAvatar);
        }

        $user->forceFill(['avatar' => null])->save();

        return back()->with('success', 'Profile photo removed.');
    }
}
