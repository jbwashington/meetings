import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
    name: "Neighborhood News",
    description: "Everything there is to know about the TNS PTA, and more.",
    url: env.NEXT_PUBLIC_APP_URL as string,
    ogImage: `${env.NEXT_PUBLIC_APP_URL}/public/og.jpg` as string,
    links: {
        twitter: "https://twitter.com/SchoolTns",
        instagram: "https://instagram.com/neighborhoodgram",
        donate: "https://www.konstella.com/open/donations/651d960b47fc8495df11ac7a",
    },
};