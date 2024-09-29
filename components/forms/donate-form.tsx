"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { createPaymentIntent } from "@/lib/actions/donate";
import { toast } from "sonner";
import * as z from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics/react";
import { Icons } from "../ui/icons";

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    amount: z.number().min(10),
    recurring: z.boolean().default(false),
});

export default function DonateForm() {
    type DonationFormSchema = z.infer<typeof formSchema>;

    const form = useForm<DonationFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            amount: 25,
            recurring: false,
        },
    });

    const watchDonationAmount = form.watch("amount");

    async function onSubmit(form: DonationFormSchema) {
        try {
            const { name, email, amount, recurring } = form;

            const clientSecret = await createPaymentIntent(amount, email, name);

            console.log(clientSecret);
        } catch (error: any) {
            toast.error(`An unexpected error occurred: ${error.message}`);
        }
    }

    return (
        <>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}></form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    variant="default"
                    onClick={() => track("donate button clicked")}
                    className="w-full capitalize"
                    disabled={
                        !form.formState.isDirty ||
                        !form.formState.isValid ||
                        form.formState.isSubmitting
                    }
                >
                    {form.formState.isSubmitting && (
                        <Icons.loadingCircle className="h-4 w-4" />
                    )}
                    {!form.getFieldState("recurring")
                        ? `Start a recurring donation of $${watchDonationAmount} per month`
                        : `Make a one-time donation of $${
                              watchDonationAmount ? watchDonationAmount : 0
                          }`}
                </Button>
            </CardFooter>
        </>
    );
}
