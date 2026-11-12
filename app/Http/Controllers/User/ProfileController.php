<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\AvatarService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
    public function updateAvatar(Request $request, AvatarService $avatarService): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:2048'],
        ]);

        $user = $request->user();

        // Delete old avatar if exists
        $avatarService->delete($user->getRawOriginal('avatar'));

        $path = $avatarService->upload($request->file('avatar'));

        $user->forceFill(['avatar' => $path])->save();

        return back()->with('success', 'Profile photo updated successfully.');
    }

    /**
     * Delete the user's avatar image.
     */
    public function destroyAvatar(Request $request, AvatarService $avatarService): RedirectResponse
    {
        $user = $request->user();

        $avatarService->delete($user->getRawOriginal('avatar'));

        $user->forceFill(['avatar' => null])->save();

        return back()->with('success', 'Profile photo removed.');
    }
}
