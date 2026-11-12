<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the User Dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $socialAccounts = $user->socialAccounts()->get(['provider', 'created_at']);

        return Inertia::render('user/dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
            ],
            'socialAccounts' => $socialAccounts,
        ]);
    }
}
