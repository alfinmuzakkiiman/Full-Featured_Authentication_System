import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    email: string;
    status?: string;
    cooldown?: number;
};

export default function VerifyEmail({ email, status, cooldown = 0 }: Props) {
    const [timeLeft, setTimeLeft] = useState(cooldown);
    const [resending, setResending] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        otp: '',
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

    const submitOtp: FormEventHandler = (e) => {
        e.preventDefault();
        post('/verify-email', {
            onFinish: () => reset('otp'),
        });
    };

    const handleResend = () => {
        if (timeLeft > 0 || resending) return;
        setResending(true);
        router.post(
            '/resend-otp',
            {},
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
            <Head title="Verify Your Email" />

            {status && (
                <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}

            <div className="mb-6 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p>
                    We sent a 6-digit verification code to:
                </p>
                <p className="mt-1 font-semibold text-foreground">{email}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                    Code expires in <strong>5 minutes</strong>. Maximum 5 attempts allowed.
                </p>
            </div>

            <form onSubmit={submitOtp} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="otp" className="text-center">Enter 6-Digit Code</Label>
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
                            const val = e.target.value.replace(/\D/g, '');
                            setData('otp', val);
                        }}
                        placeholder="••••••"
                        className="text-center font-mono text-2xl tracking-[0.5em] font-bold h-12"
                        required
                    />
                    <InputError message={errors.otp} className="text-center" />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={processing || data.otp.length !== 6}
                >
                    {processing && <Spinner className="mr-2" />}
                    Verify Code
                </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4 border-t pt-4 text-sm">
                <div className="text-muted-foreground">
                    Didn't receive the code?{' '}
                    <Button
                        type="button"
                        variant="link"
                        className="p-0 h-auto font-medium"
                        onClick={handleResend}
                        disabled={timeLeft > 0 || resending}
                    >
                        {resending && <Spinner className="mr-1 h-3 w-3" />}
                        {timeLeft > 0
                            ? `Resend code in ${timeLeft}s`
                            : 'Resend code'}
                    </Button>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        router.flushAll();
                        router.post('/logout');
                    }}
                    className="text-xs text-muted-foreground hover:underline cursor-pointer"
                >
                    Log out
                </button>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify Your Email',
    description: 'Enter the 6-digit OTP code sent to your email address',
};
