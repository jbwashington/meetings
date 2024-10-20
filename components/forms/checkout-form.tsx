"use client";

import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { track } from "@vercel/analytics/react";
import { useDonateDialogStates } from "@/hooks/use-donate-dialog";
import { successUrlSerializer } from "@/lib/serializers";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [{ clientSecret }, setDonateDialogStates] = useDonateDialogStates();
    const pathName = usePathname();

    if (!clientSecret) {
        return null;
    }

    const handleBackButton = () => {
        setDonateDialogStates({ clientSecret: null });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return;
        }
        setIsLoading(true);
        const successUrl = successUrlSerializer();
        const returnUrl = window.location.origin + `${pathName}${successUrl}`;

        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: returnUrl,
                },
            });

            if (result.error) {
                // Handle errors in payment submission
                toast.error(result.error.message);
            } else {
                // Payment processing is now handled by Stripe
                // The user will be redirected to the return_url after payment completion
                track("donation successful");
            }
        } catch (error: any) {
            toast.error(`An unexpected error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs",
    };

    return (
        <form className="space-y-7" id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
            />
            <Button
                disabled={isLoading || !stripe || !elements}
                variant="secondary"
                size="sm"
                className="w-1/2 capitalize"
                onClick={handleBackButton}
            >
                Go back
            </Button>
            <Button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                type="submit"
                variant="default"
                size="sm"
                className="w-1/2 capitalize"
            >
                {isLoading && (
                    <Icons.loadingCircle className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                Complete payment
            </Button>
        </form>
    );
}
