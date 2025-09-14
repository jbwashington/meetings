import { DocsConfig } from "@/types";
import { isDocumentNew } from "@/lib/utils/docs";

export const docsConfig: DocsConfig = {
    mainNav: [
        {
            title: "Docs",
            href: "/docs",
        },
        {
            title: "Guides",
            href: "/guides",
        },
        {
            title: "Donate",
            href: "/donate",
        },
    ],
    sidebarNav: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Introduction",
                    href: "/docs",
                    isNew: isDocumentNew("/docs"),
                },
            ],
        },
        {
            title: "About",
            items: [
                {
                    title: "Executive Board",
                    href: "/docs/about/executive-board",
                    isNew: isDocumentNew("/docs/about/executive-board"),
                },
                {
                    title: "Committees",
                    href: "/docs/about/committees",
                    isNew: isDocumentNew("/docs/about/committees"),
                },
                {
                    title: "Elections",
                    href: "/docs/about/elections",
                    isNew: isDocumentNew("/docs/about/elections"),
                },
                {
                    title: "Mission",
                    href: "/docs/about/mission",
                    isNew: isDocumentNew("/docs/about/mission"),
                },
                {
                    title: "Parent Engagement",
                    href: "/docs/about/parent-engagement",
                    isNew: isDocumentNew("/docs/about/parent-engagement"),
                },
                {
                    title: "FAQs",
                    href: "/docs/about/faqs",
                    isNew: isDocumentNew("/docs/about/faqs"),
                },
            ],
        },
        {
            title: "Fundraising",
            items: [
                {
                    title: "Templates",
                    href: "/docs/fundraising/templates",
                    isNew: isDocumentNew("/docs/fundraising/templates"),
                },
                {
                    title: "Donor Engagement",
                    href: "/docs/fundraising/donor-engagement",
                    isNew: isDocumentNew("/docs/fundraising/donor-engagement"),
                },
            ],
        },
        {
            title: "PTA Meeting Minutes",
            items: [
                {
                    title: "2024-2025",
                    href: "/docs/about/meetings/minutes/2024-25",
                    isNew: isDocumentNew("/docs/about/meetings/minutes/2024-25"),
                },
                {
                    title: "2023-2024",
                    href: "/docs/about/meetings/minutes/2023-24",
                    isNew: isDocumentNew("/docs/about/meetings/minutes/2023-24"),
                },
                {
                    title: "2022-2023",
                    href: "/docs/about/meetings/minutes/2022-23",
                    isNew: isDocumentNew("/docs/about/meetings/minutes/2022-23"),
                },
            ],
        },
        {
            title: "Documentation",
            items: [
                {
                    title: "Bylaws",
                    href: "/docs/documentation/bylaws",
                    isNew: isDocumentNew("/docs/documentation/bylaws"),
                },
                {
                    title: "External Resources",
                    href: "/docs/documentation/external-resources",
                    isNew: isDocumentNew("/docs/documentation/external-resources"),
                },
                {
                    title: "Style Guide",
                    href: "/docs/documentation/style-guide",
                    isNew: isDocumentNew("/docs/documentation/style-guide"),
                },
                {
                    title: "Operational Manual",
                    href: "/docs/documentation/tns-pta-operational-manual",
                    isNew: isDocumentNew("/docs/documentation/tns-pta-operational-manual"),
                },
            ],
        },
        {
            title: "Events",
            items: [
                {
                    title: "Bake Sale",
                    href: "/docs/events/bake-sale",
                    isNew: isDocumentNew("/docs/events/bake-sale"),
                },
                {
                    title: "Earth Day",
                    href: "/docs/events/earth-day",
                    isNew: isDocumentNew("/docs/events/earth-day"),
                },
                {
                    title: "Halloween",
                    href: "/docs/events/halloween",
                    isNew: isDocumentNew("/docs/events/halloween"),
                },
                {
                    title: "Holiday Fair",
                    href: "/docs/events/holiday-fair",
                    isNew: isDocumentNew("/docs/events/holiday-fair"),
                },
                {
                    title: "Pi Day",
                    href: "/docs/events/pi-day",
                    isNew: isDocumentNew("/docs/events/pi-day"),
                },
            ],
        },
    ],
};
