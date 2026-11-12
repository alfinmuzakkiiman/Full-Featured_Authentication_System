import {
    ChevronRight,
    Code2,
    ExternalLink,
    FolderGit2,
    Github,
    Globe,
    Linkedin,
} from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';

export function NavFooter({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const developerLinks = [
        {
            title: 'LinkedIn',
            href: 'https://www.linkedin.com/in/alfin-muzakki-iman-14b889375/',
            icon: Linkedin,
            iconClass: 'text-[#0A66C2]',
        },
        {
            title: 'Portofolio Saya',
            href: 'https://alfindev.my.id/',
            icon: Globe,
            iconClass: 'text-emerald-500',
        },
        {
            title: 'GitHub Saya',
            href: 'https://github.com/alfinmuzakkiiman',
            icon: Github,
            iconClass: 'text-foreground',
        },
    ];

    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* Repository Link (Above Developer) */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Repository"
                            className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 cursor-pointer"
                        >
                            <a
                                href="https://github.com/alfinmuzakkiiman/Full-Featured_Authentication_System"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FolderGit2 className="h-5 w-5 text-primary" />
                                <span className="font-medium">Repository</span>
                                {!isCollapsed && (
                                    <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground/60" />
                                )}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Developer Section */}
                    {isCollapsed ? (
                        /* Collapsed Icon Mode: DropdownMenu popover */
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip="Developer"
                                        className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                                    >
                                        <Code2 className="h-5 w-5 text-primary" />
                                        <span>Developer</span>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 rounded-lg shadow-lg"
                                    align="start"
                                    side="right"
                                >
                                    <DropdownMenuLabel className="text-xs text-muted-foreground font-semibold">
                                        Developer Profile
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {developerLinks.map((link) => (
                                        <DropdownMenuItem key={link.title} asChild>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2.5 cursor-pointer text-sm"
                                            >
                                                <link.icon className={`h-4 w-4 shrink-0 ${link.iconClass}`} />
                                                <span>{link.title}</span>
                                                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                                            </a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ) : (
                        /* Expanded Mode: Collapsible menu with direct sub-links */
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip="Developer"
                                        className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 cursor-pointer"
                                    >
                                        <Code2 className="h-5 w-5 text-primary" />
                                        <span className="font-medium">Developer</span>
                                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub className="mr-0 pr-0">
                                        {developerLinks.map((link) => (
                                            <SidebarMenuSubItem key={link.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-xs py-1.5"
                                                    >
                                                        <link.icon className={`h-3.5 w-3.5 shrink-0 ${link.iconClass}`} />
                                                        <span className="truncate">{link.title}</span>
                                                        <ExternalLink className="ml-auto h-2.5 w-2.5 text-muted-foreground/60 shrink-0" />
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
