// import type * as Lucide from "lucide-react";

// export type NavItem = {
//     title: string;
//     href: string;
//     disabled?: boolean;
// };

// export type MainNavItem = NavItem;

// export interface SiteConfig {
//     name: string;
//     description: string;
//     url: string;
//     ogImage: string;
//     links: {
//         twitter: string;
//         instagram: string;
//     };
//     mainNav: MainNavItem[];
// };

// export interface MainNavProps {
//     items?: MainNavItem[];
//     children?: React.ReactNode;
// }

// export type DashboardConfig = {
//     mainNav: MainNavItem[];
//     sidebarNav: SidebarNavItem[];
// };
// export type DocsConfig = {
//     mainNav: MainNavItem[];
//     sidebarNav: SidebarNavItem[];
// };

// export interface NavItem {
//   title: string;
//   href: string;
//   disabled?: boolean;
// }

// export type MainNavItem = NavItem;

// export interface DocsConfig {
//   mainNav: MainNavItem[];
//   sidebarNav: SidebarNavItem[];
// }

// export type SidebarNavItem = {
//   id: string;
//   title: string;
//   disabled?: boolean;
//   external?: boolean;
//   icon?: Lucide.LucideIcon;
// } & (
//   | {
//       href: string;
//       items?: never;
//     }
//   | {
//       href?: string;
//       items: NavLink[];
//     }
// );

// // export interface SiteConfig {
// //   name: string;
// //   description: string;
// //   url: string;
// //   ogImage: string;
// //   links: {
// //     github: string;
// //   };
// // }

// export interface DocsConfig {
//   mainNav: MainNavItem[];
//   sidebarNav: SidebarNavItem[];
// }

// export interface MarketingConfig {
//   mainNav: MainNavItem[];
// }

// export interface DashboardConfig {
//   mainNav: MainNavItem[];
//   sidebarNav: SidebarNavItem[];
// }

import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    instagram: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }