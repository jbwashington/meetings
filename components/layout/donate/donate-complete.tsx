'use client'

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Stripe from "stripe";
import stripe from "@/lib/vendors/stripe";

interface DonateCompleteParams {
    sessionId: string;
}

const session = async ({ sessionId }: { sessionId: string }) => {
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);
    return session;
};

export default function DonateComplete() {
    
    return (
        <section className="container">
            <div className="space-y-8">
                <CardTitle className="text-4xl font-bold capitalize">
                    Thank you!
                </CardTitle>
                <CardDescription className="leading-5 text-foreground">
                    <p>
                        Your donation is fully tax deductible; the Neighborhood
                        School PTA is a 501(c)(3) charitable organization.
                    </p>
                </CardDescription>
                {/* <p>Confirmation Number: {client_reference_id}</p>
                <p>Amount: {amount_total}</p>
                <p>Status: {status}</p>
                <p>
                    Check your inbox at {customer_email} for a receipt, and{" "}
                    <Link href="/contact">contact us</Link> if you have any
                    questions. Once again, we appreciate your support!
                </p> */}
                <Link
                    href="/"
                    className={buttonVariants({
                        variant: "default",
                        className: "w-full capitalize",
                    })}
                >
                    Subscribe to the TNS PTA newsletter
                </Link>
            </div>
        </section>
    );
}
