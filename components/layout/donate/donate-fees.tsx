"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { createPaymentIntent } from "@/lib/actions/donate";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics/react";
import { Icons } from "@/components/ui/icons";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { addTransactionFeesFormSchema } from "@/lib/validations/donate-form";
import { AddTransactionFeesFormSchema } from "@/types";
import donationConfig from "@/config/donate";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { addStripeTransactionFees, cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";

export default function DonateFees({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const addTransactionFees = searchParams.get("include_fees");
    const hasTransactionFeesAdded =
        addTransactionFees === "include_fees" ? true : false;
    const isRecurring =
        searchParams.get("frequency") === "recurring" ? true : false;
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const donationAmount = searchParams.get("donation_amount");

    const form = useForm<AddTransactionFeesFormSchema>({
        resolver: zodResolver(addTransactionFeesFormSchema),
        defaultValues: {
            addFees: false,
        },
        mode: "onChange",
    });

    const watchAddTransactionFeeSelection = form.watch("addFees");

    const handleCheckedChange = (checked: boolean) => {
        if (!checked) {
            router.push(`${pathName}?include_fees=true`);
        } else {
            router.push(`${pathName}?include_fees=false`);
        }
    };

    const router = useRouter();
    const pathName = usePathname();

    async function onSubmit(form: AddTransactionFeesFormSchema) {
        try {
            const { addFees } = form;
            if (donationAmount !== null && email !== null && name !== null) {
                if (addFees) {
                    const newDonationAmount = addStripeTransactionFees(
                        parseFloat(donationAmount)
                    );
                    const clientSecret = await createPaymentIntent(
                        newDonationAmount,
                        email,
                        name
                    );
                    router.push(
                        `${pathName}?donate=true&frequency=${
                            isRecurring ? `recurring` : `one-time`
                        }&client_secret=${clientSecret}&name=${name}&email=${email}&donation_amount=${newDonationAmount}&include_fees=true`
                    );
                } else {
                    const clientSecret = await createPaymentIntent(
                        parseFloat(donationAmount),
                        email,
                        name
                    );
                    router.push(
                        `${pathName}?donate=true&frequency=${
                            isRecurring ? `recurring` : `one-time`
                        }&client_secret=${clientSecret}&name=${name}&email=${email}&donation_amount=${donationAmount}&include_fees=false`
                    );
                }
            }
        } catch (error: any) {
            toast.error(`An unexpected error occurred: ${error.message}`);
        }
    }

    const errors = form.formState.errors;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("grid items-start gap-4", className)}
            >
                <FormField
                    control={form.control}
                    name="addFees"
                    render={({ field }) => (
                        <FormItem className="items-center hidden gap-x-2">
                            <FormLabel className="capitalize">
                                Would you like to cover the transaction fees?
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    onCheckedChange={handleCheckedChange}
                                    checked={hasTransactionFeesAdded}
                                    name={field.name}
                                    id={field.name}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">{watchAddTransactionFeeSelection ? 'Add the fees and continue' : 'Provide no additional support and continue'  }</Button>
            </form>
        </Form>
    );
}

