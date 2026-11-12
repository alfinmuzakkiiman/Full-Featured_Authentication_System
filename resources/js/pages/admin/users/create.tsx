import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
        title: 'Create User',
        href: '/admin/users/create',
    },
];

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'user',
        password: '',
        verify_immediately: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <>
            <Head title="Create User" />

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
                        <div>
                            <CardTitle className="text-xl">Create New User Account</CardTitle>
                            <CardDescription>
                                Create a new user or administrator account in PostgreSQL.
                            </CardDescription>
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
                                    onValueChange={(val) => setData('role', val)}
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
                                    <Label htmlFor="password">Temporary Password (Optional)</Label>
                                    <span className="text-xs text-muted-foreground">Leave empty to auto-generate</span>
                                </div>
                                <PasswordInput
                                    id="password"
                                    placeholder="Minimum 8 characters"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>

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
                                        If unchecked, the account will be unverified and an invitation OTP code will be sent to their email.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-full sm:w-auto" asChild>
                                    <Link href="/admin/users">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    {processing && <Spinner className="mr-2 h-4 w-4" />}
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Create User Account
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateUser.layout = {
    breadcrumbs,
};
