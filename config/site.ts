import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
    name: "TNS PTA Knowledge Base",
    description: "Everything there is to know about the TNS PTA, and more.",
    url: env.NEXT_PUBLIC_SERVER_URL as string,
    ogImage: `${env.NEXT_PUBLIC_SERVER_URL}/public/og.jpg` as string,
    links: {
        twitter: "https://twitter.com/theneighborhoodschool",
        instagram: "https://instagram.com/theneighborhoodschool",
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