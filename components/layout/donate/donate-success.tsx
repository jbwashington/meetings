import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default function DonateSuccess() {
    return (
        <div className="container">
            <div className="space-y-8">
                <CardTitle className="text-4xl font-bold capitalize">
                    Thank you!
                </CardTitle>
                <CardDescription className="leading-5 text-foreground">
                    <p>
                        Your donation is fully tax deductible; the Neighborhood
                        School PTA is a 501(c)(3) charitable organization.
                    </p>
                    <p>
                        Check your email for a receipt, and contact us if you
                        have any questions. Once again, we appreciate your
                        support!
                    </p>
                </CardDescription>
                <Link
                    href="/"
                    className={buttonVariants({
                        variant: "default",
                        className: "w-full capitalize",
                    })}
                >
                    Return to the Home page
                </Link>
            </div>
        </div>
    );
}