<?php

use App\Models\User;

test('ROLE-01: admin can access admin dashboard', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('admin.dashboard'));

    $response->assertOk();
});

test('ROLE-02: user can access user dashboard', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->get(route('user.dashboard'));

    $response->assertOk();
});

test('ROLE-03: standard user accessing admin dashboard receives 403 Forbidden', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertForbidden();
});

test('ROLE-04: unauthenticated guest accessing dashboard is redirected to login', function () {
    $response = $this->get(route('dashboard'));

    $response->assertRedirect(route('login'));
});

test('ROLE-05: registration cannot set admin role from public request', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Attacker',
        'email' => 'attacker@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'role' => 'admin',
    ]);

    $user = User::where('email', 'attacker@example.com')->first();
    expect($user->role)->toBe('user');
});

test('ROLE-06: admin can create user with selected role (admin or user)', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->post(route('admin.users.store'), [
        'name' => 'New Staff',
        'email' => 'newstaff@example.com',
        'password' => 'StaffPass123!',
        'verify_immediately' => true,
        'role' => 'admin',
    ]);

    $response->assertRedirect(route('admin.users.index'));

    $created = User::where('email', 'newstaff@example.com')->first();
    expect($created)->not->toBeNull()
        ->and($created->role)->toBe('admin')
        ->and($created->hasVerifiedEmail())->toBeTrue();
});

test('admin can update user details and role', function () {
    $admin = User::factory()->admin()->create();
    $targetUser = User::factory()->create([
        'name' => 'Old Name',
        'email' => 'old@example.com',
        'role' => 'user',
    ]);

    $response = $this->actingAs($admin)->put(route('admin.users.update', $targetUser), [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'role' => 'admin',
    ]);

    $response->assertRedirect(route('admin.users.index'));

    $targetUser->refresh();
    expect($targetUser->name)->toBe('Updated Name')
        ->and($targetUser->email)->toBe('updated@example.com')
        ->and($targetUser->role)->toBe('admin');
});

test('admin can delete a user', function () {
    $admin = User::factory()->admin()->create();
    $targetUser = User::factory()->create([
        'name' => 'To Be Deleted',
        'email' => 'delete_me@example.com',
    ]);

    $response = $this->actingAs($admin)->delete(route('admin.users.destroy', $targetUser));

    $response->assertRedirect(route('admin.users.index'));
    expect(User::find($targetUser->id))->toBeNull();
});

test('admin cannot delete their own account', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->delete(route('admin.users.destroy', $admin));

    $response->assertRedirect();
    $response->assertSessionHas('error');
    expect(User::find($admin->id))->not->toBeNull();
});

test('admin accessing user dashboard is redirected to admin dashboard', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('user.dashboard'));

    $response->assertRedirect(route('admin.dashboard'));
});
