import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

type Props = {
    email: string;
    cooldown?: number;
    status?: string;
};

export default function ResetPassword({ email, cooldown = 0, status }: Props) {
    const [timeLeft, setTimeLeft] = useState(cooldown);
    const [resending, setResending] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: email || '',
        otp: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        setTimeLeft(cooldown);
    }, [cooldown]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/reset-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleResend = () => {
        if (timeLeft > 0 || resending) return;
        setResending(true);
        router.post(
            '/forgot-password/resend-otp',
            { email },
            {
                onFinish: () => {
                    setResending(false);
                    setTimeLeft(60);
                },
            }
        );
    };

    return (
        <>
            <Head title="Reset Password" />

            {status && (
                <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}

            <div className="mb-6 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p>Kode verifikasi 6-digit telah dikirim ke:</p>
                <p className="mt-1 font-semibold text-foreground">{email}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                    Kode berlaku selama <strong>5 menit</strong>. Maksimal 5 kali percobaan.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* 6-Digit OTP Code */}
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="otp">Kode Verifikasi (OTP)</Label>
                        <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-xs text-muted-foreground font-normal hover:text-foreground"
                            onClick={handleResend}
                            disabled={timeLeft > 0 || resending}
                        >
                            {resending && <Spinner className="mr-1 h-3 w-3" />}
                            {timeLeft > 0 ? `Kirim ulang (${timeLeft}s)` : 'Kirim ulang kode'}
                        </Button>
                    </div>
                    <Input
                        id="otp"
                        type="text"
                        name="otp"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        pattern="[0-9]*"
                        autoFocus
                        value={data.otp}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setData('otp', val);
                        }}
                        placeholder="••••••"
                        className="text-center font-mono text-2xl tracking-[0.4em] font-bold h-12"
                        required
                    />
                    <InputError message={errors.otp} />
                </div>

                {/* New Password */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Masukkan password baru (min. 8 karakter)"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                    <PasswordInput
                        id="password_confirmation"
                        name="password_confirmation"
                        autoComplete="new-password"
                        placeholder="Ulangi password baru"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={processing || data.otp.length !== 6}
                    data-test="reset-password-button"
                >
                    {processing && <Spinner className="mr-2" />}
                    Reset Password
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                <span>Sudah ingat kata sandi Anda? </span>
                <TextLink href={login()}>Masuk kembali</TextLink>
            </div>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset Password',
    description: 'Masukkan kode verifikasi 6-digit dan password baru Anda',
};
