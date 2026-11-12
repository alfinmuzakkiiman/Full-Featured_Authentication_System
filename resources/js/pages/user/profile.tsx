import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Camera,
    CheckCircle2,
    Clock,
    KeyRound,
    Mail,
    Shield,
    Trash2,
    User as UserIcon,
    XCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { AvatarCropperModal } from '@/components/avatar-cropper-modal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

type UserProfileData = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    has_password: boolean;
};

type SocialAccount = {
    provider: string;
    provider_email: string | null;
    created_at: string;
};

type Props = {
    user: UserProfileData;
    socialAccounts: SocialAccount[];
};

export default function UserProfile({ user, socialAccounts }: Props) {
    const page = usePage();
    const flashSuccess = (page.props as any).flash?.success;
    const flashError = (page.props as any).flash?.error;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
    const [cropperOpen, setCropperOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const isAdmin = user.role === 'admin';
    const dashboardHref = isAdmin ? '/admin/dashboard' : '/user/dashboard';
    const dashboardLabel = isAdmin ? 'Admin Dashboard' : 'User Dashboard';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: dashboardLabel,
            href: dashboardHref,
        },
        {
            title: 'My Profile',
            href: isAdmin ? '/admin/profile' : '/user/profile',
        },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalError(null);
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: Must be image
        if (!file.type.startsWith('image/')) {
            setLocalError('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
            return;
        }

        // Validation: Max 10MB input before crop
        if (file.size > 10 * 1024 * 1024) {
            setLocalError('Image size must be less than 10MB.');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setRawImageSrc(objectUrl);
        setCropperOpen(true);

        // Reset file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCropped = (croppedFile: File) => {
        setIsUploading(true);
        setLocalError(null);

        const formData = new FormData();
        formData.append('avatar', croppedFile);

        router.post('/profile/avatar', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setCropperOpen(false);
                if (rawImageSrc) {
                    URL.revokeObjectURL(rawImageSrc);
                    setRawImageSrc(null);
                }
            },
            onError: (errors) => {
                setLocalError(errors.avatar || 'Failed to upload photo.');
            },
            onFinish: () => {
                setIsUploading(false);
            },
        });
    };

    const handleRemoveAvatar = () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        setIsUploading(true);
        setLocalError(null);

        router.delete('/profile/avatar', {
            preserveScroll: true,
            onFinish: () => {
                setIsUploading(false);
            },
        });
    };

    return (
        <>
            <Head title="My Profile" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full">
                {/* Back Button */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={dashboardHref}>
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to {dashboardLabel}
                        </Link>
                    </Button>
                </div>

                {/* Notifications */}
                {flashSuccess && (
                    <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>{flashSuccess}</AlertDescription>
                    </Alert>
                )}

                {(flashError || localError) && (
                    <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription>{flashError || localError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Personal Profile</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your profile photo, role identity, email verification, and connected credentials.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Identity Overview Column with Interactive Avatar */}
                    <Card className="md:col-span-1">
                        <CardHeader className="text-center pb-3">
                            {/* Photo Circle with Edit Button */}
                            <div className="relative mx-auto mb-3">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-primary/10 shadow-md aspect-square">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-full w-full object-cover aspect-square"
                                        />
                                    ) : (
                                        <UserIcon className="h-12 w-12 text-primary" />
                                    )}
                                </div>

                                {/* Edit Camera Button */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110 active:scale-95 focus:outline-none ring-3 ring-card cursor-pointer disabled:opacity-50"
                                    title="Adjust & customize profile photo"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Remove photo option if user has a custom photo */}
                            {user.avatar && (
                                <div className="mb-2">
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        disabled={isUploading}
                                        className="inline-flex items-center text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="mr-1 h-3 w-3" />
                                        Remove photo
                                    </button>
                                </div>
                            )}

                            <CardTitle className="text-lg">{user.name}</CardTitle>
                            <CardDescription className="text-xs break-all">{user.email}</CardDescription>

                            <div className="mt-2 flex justify-center gap-1.5">
                                <Badge variant="secondary" className="capitalize">
                                    {user.role}
                                </Badge>
                                {user.email_verified_at ? (
                                    <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs">
                                        Unverified
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="border-t pt-4 text-xs text-muted-foreground space-y-2">
                            <div className="flex justify-between">
                                <span>Account ID:</span>
                                <span className="font-mono text-foreground">#{user.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Member Since:</span>
                                <span className="text-foreground">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Attributes Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Account Information</CardTitle>
                                <CardDescription>
                                    Primary attributes recorded in PostgreSQL.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-muted-foreground">Display Name</span>
                                    <span className="text-sm font-semibold">{user.name}</span>
                                </div>

                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-muted-foreground">Registered Email</span>
                                    <span className="text-sm font-semibold">{user.email}</span>
                                </div>

                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-muted-foreground">Access Privilege</span>
                                    <span className="text-sm font-semibold capitalize flex items-center gap-1.5">
                                        <Shield className="h-4 w-4 text-primary" />
                                        {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                                    </span>
                                </div>

                                <div className="grid gap-1">
                                    <span className="text-xs font-medium text-muted-foreground">Verification Timestamp</span>
                                    <span className="text-sm">
                                        {user.email_verified_at ? (
                                            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                                <CheckCircle2 className="h-4 w-4" />
                                                {new Date(user.email_verified_at).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                Email not verified
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Authentication Methods</CardTitle>
                                <CardDescription>
                                    Connected sign-in credentials and providers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div className="flex items-center gap-3">
                                        <KeyRound className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm font-medium">Local Password</div>
                                            <div className="text-xs text-muted-foreground">
                                                {user.has_password
                                                    ? 'Configured and active'
                                                    : 'Not set (Google OAuth only)'}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={user.has_password ? 'default' : 'outline'}>
                                        {user.has_password ? 'Enabled' : 'None'}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <svg className="h-5 w-5 shrink-0" width="20" height="20" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <div>
                                            <div className="text-sm font-medium">Google Social Account</div>
                                            <div className="text-xs text-muted-foreground">
                                                {socialAccounts.length > 0
                                                    ? `Connected (${socialAccounts[0].provider_email || user.email})`
                                                    : 'Not linked'}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={socialAccounts.length > 0 ? 'default' : 'outline'}>
                                        {socialAccounts.length > 0 ? 'Connected' : 'Not Linked'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal for adjusting / cropping the photo */}
            <AvatarCropperModal
                open={cropperOpen}
                imageSrc={rawImageSrc}
                onClose={() => {
                    setCropperOpen(false);
                    if (rawImageSrc) {
                        URL.revokeObjectURL(rawImageSrc);
                        setRawImageSrc(null);
                    }
                }}
                onCrop={handleCropped}
                isUploading={isUploading}
            />
        </>
    );
}
