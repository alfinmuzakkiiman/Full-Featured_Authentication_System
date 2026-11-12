<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        if ($user->role !== $role) {
            // When regular user tries to access admin routes: 403 Forbidden
            if ($role === 'admin') {
                abort(403, 'Access denied. You do not have administrator privileges.');
            }

            // When admin visits user-specific route, redirect to admin dashboard
            if ($user->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }

            abort(403, 'Access denied.');
        }

        return $next($request);
    }
}
