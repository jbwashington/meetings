import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground font-sans antialiased",
                    GeistMono.variable,
                    GeistSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Header />
                    <div className="flex-grow">{children}</div>
                    <SiteFooter />
                    <Toaster />
                    <TailwindIndicator />
                </ThemeProvider>
            </body>
        </html>
    );
}
