import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Plus,
    Shield,
    UserCheck,
    Users,
    XCircle,
} from 'lucide-react';
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

type Stats = {
    totalUsers: number;
    totalAdmins: number;
    totalRegularUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
};

type RecentUser = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    email_verified_at: string | null;
    created_at: string;
};

type Props = {
    stats: Stats;
    recentUsers: RecentUser[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function AdminDashboard({ stats, recentUsers }: Props) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Role-Based Authentication System overview & PostgreSQL metrics.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/admin/users/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create User
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/users">
                                <Users className="mr-2 h-4 w-4" />
                                Manage Users
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Registered in PostgreSQL database
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                            <Shield className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.totalAdmins}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Privileged admin accounts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Verified Accounts</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {stats.verifiedUsers}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Email verified via OTP / OAuth
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                            <Clock className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                {stats.unverifiedUsers}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Awaiting OTP verification
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Users Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Users</CardTitle>
                            <CardDescription>
                                Latest 5 accounts registered in the system.
                            </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/users">View all</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Email</th>
                                        <th className="pb-3 font-medium">Role</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-muted/30">
                                            <td className="py-3 font-medium">{user.name}</td>
                                            <td className="py-3 text-muted-foreground">{user.email}</td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                {user.email_verified_at ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 text-xs text-muted-foreground">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentUsers.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs,
};
