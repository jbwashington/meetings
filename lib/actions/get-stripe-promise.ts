'use server'

import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env.mjs";

const stripePromise = loadStripe(env.STRIPE_API_KEY);

export default stripePromise;