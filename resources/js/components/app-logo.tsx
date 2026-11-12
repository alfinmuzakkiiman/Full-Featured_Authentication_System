import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden shrink-0">
                <img
                    src="/logo_uika/logo_uika.png"
                    alt="Universitas Ibn Khaldun"
                    className="size-8 object-contain"
                />
            </div>
            <div className="ml-1.5 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    Universitas Ibn Khaldun
                </span>
            </div>
        </>
    );
}
