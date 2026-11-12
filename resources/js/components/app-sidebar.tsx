import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, User, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const { setOpenMobile } = useSidebar();
    const isAdmin = auth.user?.role === 'admin';

    const mainNavItems: NavItem[] = isAdmin
        ? [
              {
                  title: 'Admin Dashboard',
                  href: '/admin/dashboard',
                  icon: LayoutGrid,
              },
              {
                  title: 'User Management',
                  href: '/admin/users',
                  icon: Users,
              },
              {
                  title: 'My Profile',
                  href: '/admin/profile',
                  icon: User,
              },
          ]
        : [
              {
                  title: 'User Dashboard',
                  href: '/user/dashboard',
                  icon: LayoutGrid,
              },
              {
                  title: 'My Profile',
                  href: '/user/profile',
                  icon: User,
              },
          ];

    const homeHref = isAdmin ? '/admin/dashboard' : '/user/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={homeHref}
                                prefetch
                                onClick={() => setOpenMobile(false)}
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
