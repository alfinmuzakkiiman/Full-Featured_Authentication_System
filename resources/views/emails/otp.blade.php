<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 24px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="100%" max-width="520px" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 32px; border: 1px solid #e5e7eb;">
                    <tr>
                        <td style="text-align: center; padding-bottom: 24px;">
                            <img src="{{ rtrim(config('app.url'), '/') }}/logo_uika/logo_uika.png" alt="Logo UIKA" width="80" style="width: 80px; height: auto; margin-bottom: 12px; display: inline-block;">
                            <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0;">Universitas Ibn Khaldun</h2>
                            <p style="color: #111827; font-size: 14px; font-weight: 600; margin-top: 6px;">
                                @if($purpose === 'password_reset')
                                    Kode Reset Password
                                @elseif($purpose === 'invitation')
                                    Kode Undangan Akun
                                @else
                                    Kode Verifikasi Email
                                @endif
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 16px 0; color: #374151; font-size: 15px; line-height: 24px;">
                            <p style="margin: 0 0 16px 0;">Halo,</p>
                            <p style="margin: 0 0 24px 0;">
                                @if($purpose === 'password_reset')
                                    Kami menerima permintaan untuk mereset kata sandi akun Anda di <strong>Universitas Ibn Khaldun</strong>. Gunakan kode verifikasi 6-digit berikut untuk melanjutkan proses reset password:
                                @elseif($purpose === 'invitation')
                                    Anda telah diundang untuk mengakses sistem Universitas Ibn Khaldun. Silakan gunakan kode verifikasi berikut untuk memverifikasi akun Anda:
                                @else
                                    Terima kasih telah mendaftar. Silakan masukkan kode verifikasi 6-digit berikut untuk menyelesaikan pendaftaran Anda:
                                @endif
                            </p>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0; border: 1px dashed #d1d5db;">
                                <span style="font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #111827; font-family: monospace;">{{ $code }}</span>
                            </div>
                            <p style="color: #dc2626; font-size: 13px; margin: 0 0 8px 0; text-align: center; font-weight: 500;">
                                Kode ini hanya berlaku selama <strong>5 menit</strong> (Maksimal 5 kali percobaan).
                            </p>
                            <p style="color: #6b7280; font-size: 13px; margin: 0; text-align: center;">
                                @if($purpose === 'password_reset')
                                    Jika Anda tidak merasa meminta reset kata sandi, abaikan email ini. Akun Anda tetap aman.
                                @else
                                    Jika Anda tidak meminta kode ini, silakan abaikan email ini.
                                @endif
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
                            &copy; {{ date('Y') }} Universitas Ibn Khaldun Bogor. Hak Cipta Dilindungi.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
