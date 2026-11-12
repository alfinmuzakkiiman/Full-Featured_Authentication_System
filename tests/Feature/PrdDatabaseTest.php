<?php

use App\Models\User;
use Database\Seeders\AdminSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

test('DB-01: database connection is established', function () {
    $result = DB::select('SELECT 1 as test');
    expect($result[0]->test)->toBe(1);
});

test('DB-02: required tables and columns exist in database schema', function () {
    expect(Schema::hasTable('users'))->toBeTrue()
        ->and(Schema::hasColumn('users', 'role'))->toBeTrue()
        ->and(Schema::hasColumn('users', 'email_verified_at'))->toBeTrue()
        ->and(Schema::hasTable('social_accounts'))->toBeTrue()
        ->and(Schema::hasTable('email_verification_codes'))->toBeTrue();
});

test('DB-03: admin seeder executes idempotently without duplicate records', function () {
    $seeder = new AdminSeeder;

    $seeder->run();
    $firstCount = User::where('role', 'admin')->count();
    expect($firstCount)->toBeGreaterThanOrEqual(1);

    // Run again to verify idempotency
    $seeder->run();
    $secondCount = User::where('role', 'admin')->count();
    expect($secondCount)->toBe($firstCount);

    $admin = User::where('role', 'admin')->first();
    expect($admin->isAdmin())->toBeTrue()
        ->and($admin->hasVerifiedEmail())->toBeTrue();
});
