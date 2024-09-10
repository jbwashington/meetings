import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
    name: "The Neighborhood School",
    description: "Everything there is to know about the TNS PTA, and more.",
    url: env.NEXT_PUBLIC_APP_URL as string,
    ogImage: `${env.NEXT_PUBLIC_APP_URL}/public/og.jpg` as string,
    links: {
        twitter: "https://twitter.com/theneighborhoodschool",
        instagram: "https://instagram.com/theneighborhoodschool",
    },
};