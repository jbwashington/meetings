import * as z from "zod";

export const donateFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    donation_amount: z.number().min(10, {message: "Minimum donation amount is $10"}),
    recurring: z.boolean(),
    add_fees: z.boolean(),
});