<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('authenticated user can view their profile', function () {
    $user = User::factory()->create([
        'role' => 'user',
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->get(route('user.profile'));

    $response->assertOk();
});

test('admin can view admin profile', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('admin.profile'));

    $response->assertOk();
});

test('authenticated user can upload a custom profile avatar', function () {
    Storage::fake('public');

    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('my-avatar.jpg', 200, 200);

    $response = $this->actingAs($user)->post(route('profile.avatar.update'), [
        'avatar' => $file,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $user->refresh();
    expect($user->getRawOriginal('avatar'))->not->toBeNull();
    Storage::disk('public')->assertExists($user->getRawOriginal('avatar'));
});

test('avatar upload rejects invalid file format and files larger than 2MB', function () {
    Storage::fake('public');

    $user = User::factory()->create();

    // Not an image (text file)
    $badFile = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');

    $response = $this->actingAs($user)->post(route('profile.avatar.update'), [
        'avatar' => $badFile,
    ]);

    $response->assertSessionHasErrors('avatar');

    // Too large (> 2MB)
    $largeFile = UploadedFile::fake()->image('large.jpg')->size(3000);

    $response = $this->actingAs($user)->post(route('profile.avatar.update'), [
        'avatar' => $largeFile,
    ]);

    $response->assertSessionHasErrors('avatar');
});

test('authenticated user can remove their custom avatar', function () {
    Storage::fake('public');

    $user = User::factory()->create([
        'avatar' => 'avatars/sample.jpg',
    ]);
    Storage::disk('public')->put('avatars/sample.jpg', 'content');

    $response = $this->actingAs($user)->delete(route('profile.avatar.destroy'));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $user->refresh();
    expect($user->getRawOriginal('avatar'))->toBeNull();
    Storage::disk('public')->assertMissing('avatars/sample.jpg');
});

test('unauthenticated guest cannot upload or delete avatar', function () {
    $response = $this->post(route('profile.avatar.update'), [
        'avatar' => UploadedFile::fake()->image('avatar.jpg'),
    ]);

    $response->assertRedirect(route('login'));

    $deleteResponse = $this->delete(route('profile.avatar.destroy'));
    $deleteResponse->assertRedirect(route('login'));
});
