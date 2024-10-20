import Stripe from "stripe";
import { env } from "@/env.mjs";

export const stripe = new Stripe(env.STRIPE_API_SECRET, {
    apiVersion: "2024-06-20",
    typescript: true,
});
