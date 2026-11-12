import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, Save } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { BreadcrumbItem } from '@/types';

type UserData = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    email_verified_at: string | null;
};

type Props = {
    user: UserData;
};

export default function EditUser({ user }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
        {
            title: `Edit: ${user.name}`,
            href: `/admin/users/${user.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        verify_immediately: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <>
            <Head title={`Edit User - ${user.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to Users
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Edit User #{user.id}</CardTitle>
                                <CardDescription>
                                    Update user credentials, role, or verification status.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {user.email_verified_at ? (
                                    <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-800 dark:text-green-300">
                                        <CheckCircle2 className="mr-1 h-3 w-3 text-green-600" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300">
                                        <Clock className="mr-1 h-3 w-3 text-amber-600" />
                                        Unverified
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="jane.doe@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(val: 'admin' | 'user') => setData('role', val)}
                                >
                                    <SelectTrigger id="role" className="w-full">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User (Standard Access)</SelectItem>
                                        <SelectItem value="admin">Admin (Full Access)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">New Password (Optional)</Label>
                                    <span className="text-xs text-muted-foreground">Leave empty to keep existing password</span>
                                </div>
                                <PasswordInput
                                    id="password"
                                    placeholder="Minimum 8 characters"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>

                            {!user.email_verified_at && (
                                <div className="flex items-start space-x-3 rounded-lg border p-4 bg-muted/20">
                                    <Checkbox
                                        id="verify_immediately"
                                        checked={data.verify_immediately}
                                        onCheckedChange={(checked) => setData('verify_immediately', checked === true)}
                                    />
                                    <div className="space-y-1 leading-none">
                                        <Label htmlFor="verify_immediately" className="cursor-pointer font-medium">
                                            Mark Email as Verified Immediately
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            Account is currently unverified. Check this to mark it as verified right now.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-full sm:w-auto" asChild>
                                    <Link href="/admin/users">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    {processing && <Spinner className="mr-2 h-4 w-4" />}
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
