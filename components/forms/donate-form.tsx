"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { createPaymentIntent } from "@/lib/actions/donate";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics/react";
import { Icons } from "../ui/icons";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Switch } from "../ui/switch";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { RadioGroupItem } from "../ui/radio-group";
import { donateFormSchema } from "@/lib/validations/donate-form";
import { DonateFormSchema, DonationTier } from "@/types";
import donationConfig from "@/config/donate";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Route } from "next";
import DonationTierItem from "../layout/donate/donation-tier-item";
import { cn } from "@/lib/utils";
import { SubmitButton } from "../layout/donate/submit-button";

export default function DonateForm({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const frequency = searchParams.get("frequency");
    const isRecurring = frequency === "recurring" ? true : false;

    const form = useForm<DonateFormSchema>({
        resolver: zodResolver(donateFormSchema),
        defaultValues: {
            name: "",
            email: "",
            donationAmount: donationConfig.tiers[2].donationAmount,
            recurring: false,
        },
        mode: "onChange",
    });

    const watchDonationAmount = form.watch("donationAmount");

    const handleTierSelect = (selectedTier: DonationTier) => {
        form.setValue("donationAmount", selectedTier.donationAmount);
    };

    const handleCheckedChange = (checked: boolean) => {
        if (!checked) {
            form.setValue("recurring", false);
            router.push(`${pathName}?donate=true&frequency=one-time` as Route);
        } else {
            form.setValue("recurring", true);
            router.push(`${pathName}?donate=true&frequency=recurring` as Route);
        }
    };

    const router = useRouter();
    const pathName = usePathname();

    async function onSubmit(form: DonateFormSchema) {
        try {
            const { name, email, donationAmount, recurring } = form;

            router.push(
                `${pathName}?donate=true&frequency=${
                    isRecurring ? `recurring` : `one-time`
                }&name=${name}&email=${email}&donation_amount=${donationAmount}` as Route
            );
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            {errors.name && (
                                <FormMessage>{errors.name.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                        <FormItem className="inline-flex items-center space-x-2 space-y-0">
                            <FormControl>
                                <Switch
                                    onCheckedChange={handleCheckedChange}
                                    checked={isRecurring}
                                    name={field.name}
                                    id={field.name}
                                />
                            </FormControl>
                            <FormDescription>
                                Repeat this donation monthly
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sponsor Levels</FormLabel>
                            <RadioGroup
                                onValueChange={(value) => {
                                    const numericValue = parseFloat(value); // Convert string to number
                                    if (!isNaN(numericValue)) {
                                        const selectedTier =
                                            donationConfig.tiers.find(
                                                (tier) =>
                                                    tier.donationAmount ===
                                                    numericValue
                                            );
                                        if (selectedTier) {
                                            handleTierSelect(selectedTier);
                                            form.setValue(
                                                "donationAmount",
                                                numericValue
                                            ); // Set as number
                                        }
                                    }
                                    field.onChange(numericValue);
                                }}
                                className="grid max-w-md grid-cols-2 gap-8 pt-2"
                            >
                                {donationConfig.tiers.map(
                                    (tier: DonationTier, index: number) => (
                                        <FormItem
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key === "Enter" ||
                                                    event.key === " "
                                                ) {
                                                    form.setValue(
                                                        "donationAmount",
                                                        tier.donationAmount
                                                    );
                                                }
                                            }}
                                            key={index}
                                            tabIndex={0}
                                        >
                                            <FormLabel className="[&:has([data-state=checked])>div]:border-accent-foreground">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        onSelect={() =>
                                                            handleTierSelect(
                                                                tier
                                                            )
                                                        }
                                                        checked={
                                                            tier.donationAmount ===
                                                            form.getValues(
                                                                "donationAmount"
                                                            )
                                                        }
                                                        value={tier.donationAmount.toString()}
                                                        className="sr-only"
                                                        aria-label={`Select ${tier.name} tier`}
                                                    />
                                                </FormControl>
                                                <DonationTierItem tier={tier} />
                                            </FormLabel>
                                        </FormItem>
                                    )
                                )}
                            </RadioGroup>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormDescription>
                                or enter a custom amount (minimum $10).
                            </FormDescription>
                            <div className="inline-flex w-full">
                                <div
                                    className={cn(
                                        buttonVariants({
                                            size: "icon",
                                            variant: "outline",
                                        }),
                                        "rounded-r-none"
                                    )}
                                >
                                    <Icons.dollarSign className="w-4 h-4" />
                                </div>
                                <FormControl>
                                    <Input
                                        className="font-bold rounded-l-none"
                                        {...field}
                                        type="number" // Ensure the input type is number
                                        onChange={(e) =>
                                            form.setValue(
                                                "donationAmount",
                                                parseFloat(e.target.value)
                                            )
                                        } // Parse and set as number
                                    />
                                </FormControl>
                            </div>
                            {errors.donationAmount && (
                                <FormMessage>
                                    {errors.donationAmount.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                        <FormItem className="items-center hidden gap-x-2">
                            <FormLabel className="capitalize">
                                Recurring
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    onCheckedChange={handleCheckedChange}
                                    checked={isRecurring}
                                    name={field.name}
                                    id={field.name}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton form={form} />
            </form>
        </Form>
    );
}
