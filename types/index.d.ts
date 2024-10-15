import { User } from "@prisma/client";
import { type Icon, Icons } from "lucide-react";
import * as z from "zod";
import { donateFormSchema } from "@/lib/validations/donate-form";
import { addTransactionFeesFormSchema } from "@/lib/validations/donate-form";

export type DonateFormSchema = z.infer<typeof donateFormSchema>;
export type AddTransactionFeesFormSchema = z.infer<typeof addTransactionFeesFormSchema>;

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type MainNavItem = NavItem | SidebarNavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: Icon
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
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
    donate: string
  }
}

export type DocsConfig = {
  mainNav: SidebarNavItem[]
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

export type DonationTier = {
  name: string;
  donationAmount: number; // this cannot be called amount, it will collide with one of the props from the react node type!
};

export type DonationConfig = {
  title: string;
  description: string;
  tiers: DonationTier[];
};