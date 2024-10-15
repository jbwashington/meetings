import * as z from "zod";

export const donateFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    donationAmount: z.number().min(10, {message: "Minimum donation amount is $10"}),
    recurring: z.boolean(),
});

export const addTransactionFeesFormSchema = z.object({
    addFees: z.boolean(),
})