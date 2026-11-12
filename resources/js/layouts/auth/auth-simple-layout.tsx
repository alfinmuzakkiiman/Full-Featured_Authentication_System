import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-col items-center gap-2.5 text-center select-none">
                            <div className="flex h-24 w-24 items-center justify-center">
                                <img
                                    src="/logo_uika/logo_uika.png"
                                    alt="Universitas Ibn Khaldun"
                                    className="h-full w-full object-contain drop-shadow-sm"
                                    width={96}
                                    height={96}
                                />
                            </div>
                            <span className="text-base font-bold tracking-tight text-foreground">
                                Universitas Ibn Khaldun
                            </span>
                        </div>

                        <div className="space-y-1 text-center">
                            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
