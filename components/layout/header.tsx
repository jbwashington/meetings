import { MainNav } from "./nav";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function Header() {
    return (
        <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={siteConfig.mainNav} />
            </div>
        </header>
    );
}