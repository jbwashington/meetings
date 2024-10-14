import { marketingConfig } from "@/config/marketing";
import { MainNav } from "@/components/layout/nav";
import { SiteFooter } from "@/components/layout/site-footer";
import DonateDialog from "@/components/layout/donate/donate-dialog";

interface MarketingLayoutProps {
    children: React.ReactNode;
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={marketingConfig.mainNav} />
                    <nav>
                        <DonateDialog />
                    </nav>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
