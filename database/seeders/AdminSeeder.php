<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $name = config('app.admin_name', env('ADMIN_NAME', 'Admin'));
        $email = config('app.admin_email', env('ADMIN_EMAIL', 'admin@example.com'));
        $password = config('app.admin_password', env('ADMIN_PASSWORD', 'password'));

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
