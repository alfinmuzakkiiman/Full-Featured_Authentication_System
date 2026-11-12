import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Pencil,
    Plus,
    Search,
    Shield,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';

type UserItem = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    email_verified_at: string | null;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUsers = {
    data: UserItem[];
    current_page: number;
    last_page: number;
    total: number;
    links: PaginationLink[];
};

type Props = {
    users: PaginatedUsers;
    filters: {
        search?: string;
        role?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'User Management',
        href: '/admin/users',
    },
];

export default function UsersIndex({ users, filters }: Props) {
    const page = usePage();
    const flashSuccess = (page.props as any).flash?.success;
    const flashError = (page.props as any).flash?.error;
    const currentUserId = (page.props as any).auth?.user?.id;

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/users',
            {
                search: search || undefined,
                role: role !== 'all' ? role : undefined,
            },
            { preserveState: true }
        );
    };

    const handleRoleChange = (val: string) => {
        setRole(val);
        router.get(
            '/admin/users',
            {
                search: search || undefined,
                role: val !== 'all' ? val : undefined,
            },
            { preserveState: true }
        );
    };

    const confirmDelete = () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        router.delete(`/admin/users/${userToDelete.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setUserToDelete(null);
            },
        });
    };

    return (
        <>
            <Head title="User Management" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {flashSuccess && (
                    <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>{flashSuccess}</AlertDescription>
                    </Alert>
                )}

                {flashError && (
                    <Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{flashError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                        <p className="text-sm text-muted-foreground">
                            Inspect, edit, create, and manage user accounts. Total: {users.total} accounts.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create User
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>User Directory</CardTitle>
                                <CardDescription>
                                    List of all registered users in PostgreSQL.
                                </CardDescription>
                            </div>

                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-8 w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Select value={role} onValueChange={handleRoleChange}>
                                        <SelectTrigger className="w-full sm:w-[130px]">
                                            <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button type="submit" variant="secondary" size="sm" className="shrink-0">
                                        Search
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground">
                                        <th className="pb-3 font-medium">ID</th>
                                        <th className="pb-3 font-medium">User Details</th>
                                        <th className="pb-3 font-medium">Role</th>
                                        <th className="pb-3 font-medium">Verification Status</th>
                                        <th className="pb-3 font-medium">Joined Date</th>
                                        <th className="pb-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-muted/30">
                                            <td className="py-3 text-xs text-muted-foreground">#{user.id}</td>
                                            <td className="py-3">
                                                <div className="font-medium text-foreground">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {user.role === 'admin' && (
                                                        <Shield className="mr-1 h-3 w-3" />
                                                    )}
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                {user.email_verified_at ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Verified ({new Date(user.email_verified_at).toLocaleDateString()})
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
                                            <td className="py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        asChild
                                                        title="Edit User"
                                                    >
                                                        <Link href={`/admin/users/${user.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                        disabled={currentUserId === user.id}
                                                        onClick={() => setUserToDelete(user)}
                                                        title={currentUserId === user.id ? "Cannot delete own account" : "Delete User"}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                No users matching criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Links */}
                        {users.last_page > 1 && (
                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t pt-4">
                                <div className="text-xs text-muted-foreground text-center sm:text-left">
                                    Page {users.current_page} of {users.last_page} ({users.total} users)
                                </div>
                                <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                    {users.links.map((link, idx) => (
                                        <Button
                                            key={idx}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        >
                                            {link.url ? (
                                                <Link href={link.url} preserveScroll />
                                            ) : undefined}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Confirmation Dialog for Deletion */}
            <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete user <strong>{userToDelete?.name}</strong> ({userToDelete?.email}) from the PostgreSQL database. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete User'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs,
};
