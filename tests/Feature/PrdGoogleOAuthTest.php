<?php

use App\Models\SocialAccount;
use App\Models\User;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;

function mockGoogleUser(string $id, string $email, string $name, bool $emailVerified = true)
{
    $socialiteUser = Mockery::mock(SocialiteUser::class);
    $socialiteUser->shouldReceive('getId')->andReturn($id);
    $socialiteUser->shouldReceive('getEmail')->andReturn($email);
    $socialiteUser->shouldReceive('getName')->andReturn($name);
    $socialiteUser->shouldReceive('getNickname')->andReturn(null);
    $socialiteUser->shouldReceive('getRaw')->andReturn(['email_verified' => $emailVerified]);

    $provider = Mockery::mock('Laravel\Socialite\Two\GoogleProvider');
    $provider->shouldReceive('user')->andReturn($socialiteUser);

    Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

    return $socialiteUser;
}

test('GOOGLE-01: new google user creates user account with role user and social account', function () {
    mockGoogleUser('google-id-123', 'newgoogle@gmail.com', 'Google User');

    $response = $this->get(route('auth.google.callback'));

    $response->assertRedirect(route('user.dashboard'));

    $user = User::where('email', 'newgoogle@gmail.com')->first();
    expect($user)->not->toBeNull()
        ->and($user->role)->toBe('user')
        ->and($user->password)->toBeNull()
        ->and($user->hasVerifiedEmail())->toBeTrue();

    $this->assertDatabaseHas('social_accounts', [
        'user_id' => $user->id,
        'provider' => 'google',
        'provider_user_id' => 'google-id-123',
    ]);

    $this->assertAuthenticatedAs($user);
});

test('GOOGLE-02: existing linked google user logs in directly', function () {
    $user = User::factory()->create();
    SocialAccount::create([
        'user_id' => $user->id,
        'provider' => 'google',
        'provider_user_id' => 'existing-id-456',
        'provider_email' => $user->email,
    ]);

    mockGoogleUser('existing-id-456', $user->email, $user->name);

    $response = $this->get(route('auth.google.callback'));

    $response->assertRedirect(route('user.dashboard'));
    $this->assertAuthenticatedAs($user);
});

test('GOOGLE-03: verified google email matching local user links social account', function () {
    $localUser = User::factory()->create(['email' => 'local@example.com']);

    mockGoogleUser('google-link-789', 'local@example.com', 'Link User', true);

    $response = $this->get(route('auth.google.callback'));

    $response->assertRedirect(route('user.dashboard'));
    $this->assertAuthenticatedAs($localUser);

    $this->assertDatabaseHas('social_accounts', [
        'user_id' => $localUser->id,
        'provider' => 'google',
        'provider_user_id' => 'google-link-789',
    ]);
});

test('GOOGLE-04: unverified google email fails auto-link', function () {
    User::factory()->create(['email' => 'unverified-google@example.com']);

    mockGoogleUser('unverified-id', 'unverified-google@example.com', 'Unverified', false);

    $response = $this->get(route('auth.google.callback'));

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('error');
    $this->assertGuest();
});

test('GOOGLE-05: oauth error callback handles failure safely', function () {
    $response = $this->get(route('auth.google.callback', ['error' => 'access_denied']));

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('error');
    $this->assertGuest();
});
