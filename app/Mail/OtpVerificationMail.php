<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $code,
        public string $purpose = 'registration'
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $appName = 'Universitas Ibn Khaldun';
        $subject = match ($this->purpose) {
            'invitation' => "Account Invitation Verification Code - {$appName}",
            'password_reset' => "Password Reset Verification Code - {$appName}",
            default => "Your Email Verification Code - {$appName}",
        };

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.otp',
            with: [
                'code' => $this->code,
                'purpose' => $this->purpose,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
