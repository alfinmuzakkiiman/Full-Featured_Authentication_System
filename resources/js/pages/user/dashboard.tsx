import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Lock,
    LogOut,
    Mail,
    Shield,
    Sparkles,
    User as UserIcon,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

type UserData = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    email_verified_at: string | null;
    created_at: string;
};

type SocialAccount = {
    provider: string;
    created_at: string;
};

type Props = {
    user: UserData;
    socialAccounts: SocialAccount[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Dashboard',
        href: '/user/dashboard',
    },
];

export default function UserDashboard({ user, socialAccounts }: Props) {
    const isGoogleLinked = socialAccounts.some((sa) => sa.provider === 'google');

    return (
        <>
            <Head title="User Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Welcome Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="gap-1 font-mono uppercase text-xs">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    Role: {user.role}
                                </Badge>
                                {user.email_verified_at ? (
                                    <Badge className="bg-green-600 hover:bg-green-700 text-white gap-1 text-xs">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-amber-600 border-amber-300 gap-1 text-xs">
                                        <Clock className="h-3 w-3" />
                                        Unverified
                                    </Badge>
                                )}
                            </div>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight">
                                Welcome back, {user.name}!
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                You are signed in as a regular user with access to personal services.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Button variant="outline" asChild>
                                <Link href="/user/profile">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    View Profile
                                </Link>
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    router.flushAll();
                                    router.post('/logout');
                                }}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Account Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-primary" />
                                Account Details
                            </CardTitle>
                            <CardDescription>
                                Personal credentials and account identification.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">Full Name</span>
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">Email Address</span>
                                <span className="text-sm font-medium flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                    {user.email}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">Assigned Role</span>
                                <Badge variant="outline" className="capitalize">
                                    {user.role}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-sm text-muted-foreground">Email Verification</span>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Verified on {new Date(user.email_verified_at || '').toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Member Since</span>
                                <span className="text-sm font-medium flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-t pt-4">
                            <Button variant="ghost" size="sm" className="w-full" asChild>
                                <Link href="/user/profile">Manage Profile & Security &rarr;</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Connected Accounts & Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Linked Accounts & Methods
                            </CardTitle>
                            <CardDescription>
                                Authentication methods connected to your identity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Google OAuth Provider */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background shadow-xs">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Google OAuth</div>
                                        <div className="text-xs text-muted-foreground">
                                            {isGoogleLinked
                                                ? 'Connected and active for single sign-on'
                                                : 'Not currently connected'}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {isGoogleLinked ? (
                                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                                            Connected
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-muted-foreground">
                                            Not Connected
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Email / Password Provider */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background shadow-xs">
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Email & Password</div>
                                        <div className="text-xs text-muted-foreground">
                                            Secured using bcrypt hashing & OTP verification
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-primary text-primary-foreground">
                                    Active
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserDashboard.layout = {
    breadcrumbs,
};
