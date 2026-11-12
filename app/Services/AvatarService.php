<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class AvatarService
{
    /**
     * Upload an avatar file and return its storage path or full URL.
     */
    public function upload(UploadedFile $file): string
    {
        $cloudinaryUrl = config('services.cloudinary.url') ?: env('CLOUDINARY_URL');

        if (! empty($cloudinaryUrl)) {
            try {
                $cloudinary = new Cloudinary($cloudinaryUrl);
                $result = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'avatars',
                    'resource_type' => 'image',
                    'transformation' => [
                        'width' => 400,
                        'height' => 400,
                        'crop' => 'fill',
                        'gravity' => 'face',
                    ],
                ]);

                if (isset($result['secure_url'])) {
                    return $result['secure_url'];
                }
            } catch (Throwable $e) {
                Log::error('Cloudinary avatar upload failed, falling back to local: '.$e->getMessage());
            }
        }

        return $file->store('avatars', 'public');
    }

    /**
     * Delete an existing avatar if necessary.
     */
    public function delete(?string $pathOrUrl): void
    {
        if (empty($pathOrUrl)) {
            return;
        }

        $cloudinaryUrl = config('services.cloudinary.url') ?: env('CLOUDINARY_URL');

        if (str_starts_with($pathOrUrl, 'http://') || str_starts_with($pathOrUrl, 'https://')) {
            if (! empty($cloudinaryUrl) && str_contains($pathOrUrl, 'cloudinary.com')) {
                try {
                    $cloudinary = new Cloudinary($cloudinaryUrl);
                    $publicId = $this->extractPublicId($pathOrUrl);
                    if ($publicId) {
                        $cloudinary->uploadApi()->destroy($publicId);
                    }
                } catch (Throwable $e) {
                    Log::warning('Cloudinary avatar deletion failed: '.$e->getMessage());
                }
            }

            return;
        }

        Storage::disk('public')->delete($pathOrUrl);
    }

    /**
     * Extract Cloudinary public_id from URL.
     */
    protected function extractPublicId(string $url): ?string
    {
        if (preg_match('#/upload/(?:v\d+/)?(avatars/[^.]+)#', $url, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
