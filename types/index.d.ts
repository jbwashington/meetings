export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        twitter: string;
        instagram: string;
    };
    mainNav: MainNavItem[];
};

export interface MainNavProps {
    items?: MainNavItem[];
    children?: React.ReactNode;
}

export type DashboardConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};
export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};
