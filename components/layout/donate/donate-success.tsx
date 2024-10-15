import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { env } from "@/env.mjs";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_API_KEY);

export default function DonateSuccess({paymentIntent}:{paymentIntent: Stripe.PaymentIntent['id']}) {
    const [paymentIntentDetails, setPaymentIntentDetails] = useState<Stripe.PaymentIntent | null>(null);

    useEffect(() => {
        async function fetchPaymentIntentDetails() {
            const stripe = await stripePromise;
            const paymentIntentDetails = await stripe?.retrievePaymentIntent(
                paymentIntent
            );
            if (paymentIntentDetails) {
                setPaymentIntentDetails(
                    paymentIntentDetails.paymentIntent as Stripe.PaymentIntent
                );
            }
        }

        fetchPaymentIntentDetails();
    }, [paymentIntent]);

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
                </CardDescription>
                {paymentIntentDetails && (
                    <div>
                        <p>Confirmation Number: {paymentIntentDetails.id}</p>
                        <p>Amount: {paymentIntentDetails.amount}</p>
                        <p>Status: {paymentIntentDetails.status}</p>
                        <p>
                            Check your inbox at{" "}
                            {paymentIntentDetails.receipt_email} for a receipt,
                            and <Link href="/contact">contact us</Link> if you
                            have any questions. Once again, we appreciate your
                            support!
                        </p>
                        {/* Display other relevant details here */}
                    </div>
                )}
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
