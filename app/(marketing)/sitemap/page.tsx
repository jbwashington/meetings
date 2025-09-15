import Link from "next/link";
import { Metadata } from "next";
import { Route } from "next";
import { getAllDocs, getAllPosts, getAllPages } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Site Map",
  description: "Complete navigation tree of The Neighborhood School PTA website",
};

interface SiteMapSection {
  title: string;
  items: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
}

export default async function SitemapPage() {
  // Get all content from MDX files
  const [allDocs, allBlogPosts, staticPages, guidePages] = await Promise.all([
    getAllDocs(),
    getAllPosts(),
    getAllPages('pages'),
    getAllPages('guides')
  ]);

  // Main marketing pages
  const mainPages: SiteMapSection = {
    title: "Main Pages",
    items: [
      { title: "Home", href: "/", description: "Welcome to TNS PTA" },
      { title: "Donate", href: "/donate", description: "Support our school community" },
      { title: "Contact", href: "/contact", description: "Get in touch with us" },
      ...staticPages.map(page => ({
        title: page.title,
        href: `/${page.slug}`,
        description: page.description,
      })),
    ],
  };

  // Blog section
  const blogSection: SiteMapSection = {
    title: "Blog",
    items: [
      { title: "Blog Home", href: "/blog", description: "Latest PTA news and updates" },
      ...allBlogPosts.map(post => ({
        title: post.title,
        href: `/blog/${post.slug}`,
        description: post.description,
      })),
    ],
  };

  // Documentation organized by categories
  const aboutSection: SiteMapSection = {
    title: "About TNS PTA",
    items: allDocs
      .filter(doc => doc.slug.startsWith("about/"))
      .map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };

  const eventsSection: SiteMapSection = {
    title: "Events & Activities",
    items: allDocs
      .filter(doc => doc.slug.startsWith("events/"))
      .map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };

  const fundraisingSection: SiteMapSection = {
    title: "Fundraising",
    items: allDocs
      .filter(doc => doc.slug.startsWith("fundraising/"))
      .map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };

  const documentationSection: SiteMapSection = {
    title: "Documentation",
    items: allDocs
      .filter(doc => doc.slug.startsWith("documentation/"))
      .map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };

  // Other docs that don't fit the above categories
  const otherDocsSection: SiteMapSection = {
    title: "Other Documentation",
    items: allDocs
      .filter(doc =>
        !doc.slug.startsWith("about/") &&
        !doc.slug.startsWith("events/") &&
        !doc.slug.startsWith("fundraising/") &&
        !doc.slug.startsWith("documentation/") &&
        doc.slug !== '' // Exclude the index page
      )
      .map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };

  // Guides section
  const guidesSection: SiteMapSection = {
    title: "Guides",
    items: guidePages.map(guide => ({
      title: guide.title,
      href: `/${guide.slug}`,
      description: guide.description,
    })),
  };

  // User account pages
  const accountSection: SiteMapSection = {
    title: "User Account",
    items: [
      { title: "Login", href: "/login", description: "Sign into your account" },
      { title: "Register", href: "/register", description: "Create a new account" },
      { title: "Dashboard", href: "/dashboard", description: "User dashboard (requires login)" },
      { title: "Settings", href: "/dashboard/settings", description: "Account settings (requires login)" },
    ],
  };

  const sections = [
    mainPages,
    aboutSection,
    eventsSection,
    fundraisingSection,
    documentationSection,
    otherDocsSection,
    guidesSection,
    blogSection,
    accountSection,
  ].filter(section => section.items.length > 0);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Site Map
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete navigation tree of all pages on The Neighborhood School PTA website.
          </p>
        </div>
      </div>
      <hr className="my-8" />

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-2xl tracking-tight mb-4">
              {section.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="group block space-y-2 rounded-lg border p-4 hover:border-foreground transition-colors"
                >
                  <div className="font-medium group-hover:underline">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground font-mono">
                    {item.href}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Need help finding something?</h3>
        <p className="text-sm text-muted-foreground">
          If you can&apos;t find what you&apos;re looking for, please <Link href="/contact" className="underline">contact us</Link> and we&apos;ll be happy to help.
        </p>
      </div>
    </div>
  );
}