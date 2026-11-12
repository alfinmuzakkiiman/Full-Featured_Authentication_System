import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    className,
    alt = 'Universitas Ibn Khaldun',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/logo_uika/logo_uika.png"
            alt={alt}
            className={`object-contain ${className ?? ''}`}
            {...props}
        />
    );
}
