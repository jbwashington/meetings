"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { createPaymentIntent } from "@/lib/actions/donate";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import DonationTierItem from "../layout/donate/donation-tier-item";
import { addStripeTransactionFees, cn, getStripeTransactionFees, longFloatToUSD } from "@/lib/utils";
import { SubmitButton } from "../layout/donate/submit-button";
import { useDonateDialog } from "@/hooks/use-donate-dialog";
import { stripeCheckoutSerializer } from "@/lib/serializers";

export default function DonateForm({ className }: { className?: string }) {

    const form = useForm<DonateFormSchema>({
        resolver: zodResolver(donateFormSchema),
        defaultValues: {
            name: "",
            email: "",
            donation_amount: donationConfig.tiers[2].donation_amount,
            recurring: false,
            include_fees: false,
        },
        mode: "onChange",
    });

    const {
        name,
        setName,
        email, 
        setEmail,
        includeFees,
        setIncludeFees,
        recurring,
        setRecurring,
        donationAmount,
        setDonationAmount,
        clientSecret,
        setClientSecret,
    } = useDonateDialog();

    const handleTierSelect = (selectedTier: DonationTier) => {
        setDonationAmount(selectedTier.donation_amount);
    };

    const handleRecurringCheckedChange = (checked: boolean) => {
        if (!checked) {
            setRecurring(null);
        } else {
            setRecurring(true);
        }
    };

    const handleFeesCheckedChange = (checked: boolean) => {
        if (checked) {
            const total = addStripeTransactionFees(donationAmount);
            setDonationAmount(total);
            
        } else {
            setDonationAmount(null);
        }
    };

    const router = useRouter();
    const pathName = usePathname();

    async function onSubmit(form: DonateFormSchema) {
        try {
            const clientSecret = await createPaymentIntent(form);

            setClientSecret(clientSecret);
            setName(form.name);
            setEmail(form.email);
            setIncludeFees(form.include_fees);
            setRecurring(form.recurring);
            setDonationAmount(form.donation_amount);

            const serialize = stripeCheckoutSerializer();
            const url = serialize(pathName, {
                open: true,
                recurring: recurring,
                name: form.name,
                email: form.email,
                donationAmount: donationAmount,
                includeFees: includeFees,
                clientSecret: clientSecret,
            });
            router.push(url);
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
                                <Input  placeholder="Name" {...field} />
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
                                    onCheckedChange={handleRecurringCheckedChange}
                                    checked={recurring as boolean}
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
                    name="include_fees"
                    render={({ field }) => (
                        <FormItem className="inline-flex items-center space-x-2 space-y-0">
                            <FormControl>
                                <Switch
                                    onCheckedChange={handleFeesCheckedChange}
                                    name={field.name}
                                    id={field.name}
                                />
                            </FormControl>
                            <FormDescription>
                            Cover the transaction fees of {longFloatToUSD(getStripeTransactionFees(donationAmount))} for this donation.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="donation_amount"
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
                                                    tier.donation_amount ===
                                                    numericValue
                                            );
                                        if (selectedTier) {
                                            handleTierSelect(selectedTier);
                                            setDonationAmount(numericValue);
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
                                                        "donation_amount",
                                                        tier.donation_amount
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
                                                            tier.donation_amount ===
                                                            form.getValues(
                                                                "donation_amount"
                                                            )
                                                        }
                                                        value={tier.donation_amount.toString()}
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
                    name="donation_amount"
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
                                                "donation_amount",
                                                parseFloat(e.target.value)
                                            )
                                        } // Parse and set as number
                                    />
                                </FormControl>
                            </div>
                            {errors.donation_amount && (
                                <FormMessage>
                                    {errors.donation_amount.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <SubmitButton donationAmount={donationAmount} form={form} recurring={recurring as boolean} />
            </form>
        </Form>
    );
}
