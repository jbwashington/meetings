"use server";

import { stripe } from "@/lib/vendors/stripe";
import Stripe from "stripe";
import { calculateDonationAmount } from "../utils";
import { env } from "@/env.mjs";


// checks if the stripe price already exists, if not it creates a new one
export const getStripePrice = async (
    amount: number,
    recurring: boolean,
    includeFees: boolean
) =>
     {
    try {
        const prices = await stripe.prices.list({
            product: env.STRIPE_TNS_DONATION_PRODUCT_ID,
        });
        // Check if a price with the same amount already exists
        const existingPrice = prices.data.find(
            (price: Stripe.Price) =>
                price.unit_amount ===
                calculateDonationAmount({ amount, includeFees })
        );

        // If a price with the same amount already exists, return it
        if (existingPrice) {
            const priceId = existingPrice.id as string
            const unitAmount = existingPrice.unit_amount as number;
            return {priceId, unitAmount}
        }

        if (recurring) {
            const newRecurringPrice = await stripe.prices.create({
                unit_amount: calculateDonationAmount({ amount, includeFees }),
                currency: "usd",
                product: env.STRIPE_TNS_DONATION_PRODUCT_ID,
                recurring: {
                    interval: "month",
                },
            });
            const priceId = newRecurringPrice.id as string;
            const unitAmount = newRecurringPrice.unit_amount as number;
            return {priceId, unitAmount};
        }

        // if its a custom one off donation, create a new one
        const newOneOffPrice = await stripe.prices.create({
            unit_amount: calculateDonationAmount({ amount, includeFees }),
            currency: "usd",
            product: env.STRIPE_TNS_DONATION_PRODUCT_ID,
        });
        return newOneOffPrice.id as string;
    } catch (error: any) {
        // If an error occurs, log it and return null
        console.error("Error creating Stripe price:", error);
        return null;
    }
};

export const getStripeCustomer = async ({ email }: { email: string }) => {
    const customers = await stripe.customers.list({
        email: email,
    });

    if (customers.data.length > 0) {
        return customers.data[0].id;
    }

    const customer: Stripe.Customer = await stripe.customers.create({
        email: email,
    });

    return customer.id as string;
};

export const getStripeSubscription = async ({
    customerId,
    priceId,
}: {
    customerId: Stripe.Customer["id"];
    priceId: Stripe.Price["id"];
}) => {
    try {
        const subscription: Stripe.Subscription =
            await stripe.subscriptions.create({
                customer: customerId,
                items: [
                    {
                        price: priceId,
                    },
                ],
                payment_behavior: "default_incomplete",
                // payment_settings: { save_default_payment_method: "on_subscription" },
                expand: ["latest_invoice.payment_intent"],
            });
        const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
        const paymentIntent =
            latestInvoice.payment_intent as Stripe.PaymentIntent;
            const clientSecret = paymentIntent?.client_secret as string;
        return { subscriptionId: subscription.id as string, clientSecret };
    } catch (error: any) {
        console.error("Error creating Stripe subscription:", error);
        return null;
    }
};

export const createPaymentIntent = async ({
    amount,
    email,
    name,
    includeFees,
    recurring,
}: {
    amount: number;
    email: string;
    name: string;
    includeFees: boolean;
    recurring: boolean;
}) => {
    // Set up the customer in stripe.
    const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
            amount: calculateDonationAmount({ amount, includeFees }),
            currency: "usd",
            receipt_email: email,
            metadata: {
                customerName: name,
            },
        });
    const clientSecret: Stripe.PaymentIntent["client_secret"] =
        paymentIntent.client_secret;
    return clientSecret;
};

export const getTotalSuccessfulPayments = async () => {
    let allCharges: Stripe.Charge[] = [];
    let lastChargeId = null;
    let totalAmount: number = 0;

    // Keep making requests until all pages have been traversed
    while (true) {
        const params: Stripe.ChargeListParams = {
            limit: 100, // Max limit per request
        };

        if (lastChargeId) {
            params.starting_after = lastChargeId;
        }

        try {
            const charges = await stripe.charges.list(params);

            // Filter for successful payments
            const successfulCharges = charges.data.filter(
                (charge: Stripe.Charge) =>
                    charge.paid === true && charge.status === "succeeded"
            );
            allCharges = allCharges.concat(successfulCharges);

            if (charges.data.length === params.limit) {
                lastChargeId = charges.data[charges.data.length - 1].id;
            } else {
                break; // Exit loop if last page
            }
        } catch (error) {
            console.error("Error retrieving charges:", error);
            break; // Exit loop in case of an error
        }
    }

    allCharges.forEach((charge) => {
        totalAmount += charge.amount / 100;
    });

    const goal = 50000;
    const progress = Math.round((totalAmount / goal) * 100);
    const percentage: number = progress < 100 ? progress : 100;
    return percentage;
};
