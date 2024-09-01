import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
    name: "Meetings",
    description: "Keep up with meetings the easy way.",
    url: env.NEXT_PUBLIC_SERVER_URL as string,
    ogImage: `${env.NEXT_PUBLIC_SERVER_URL}/public/og.jpg` as string,
    links: {
        twitter: "https://twitter.com/jtothadub_",
        instagram: "https://instagram.com/jtothadub_",
    },
    mainNav: [
        {
            title: "Docs",
            href: "#",
        },
        {
            title: "About",
            href: "#",
        },
    ],
};