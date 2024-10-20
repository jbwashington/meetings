"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    createPaymentIntent,
    getStripePrice,
    getStripeCustomer,
    getStripeSubscription,
} from "@/lib/actions/donate";
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
import DonationTierItem from "../layout/donate/donation-tier-item";
import { cn, getStripeTransactionFees, longFloatToUSD } from "@/lib/utils";
import { SubmitButton } from "../layout/donate/submit-button";
import { useDonateDialogStates } from "@/hooks/use-donate-dialog";

export default function DonateForm() {
    const [
        { name, email, includeFees, recurring, donationAmount },
        setDonateDialogStates,
    ] = useDonateDialogStates();

    const form = useForm<DonateFormSchema>({
        resolver: zodResolver(donateFormSchema),
        defaultValues: {
            name: name,
            email: email,
            donation_amount: donationAmount,
            recurring: recurring,
            include_fees: includeFees,
        },
        mode: "onChange",
    });

    const handleTierSelect = (selectedTier: DonationTier) => {
        const priceId = recurring ? selectedTier.price.subscription : selectedTier.price.oneTime;
        setDonateDialogStates({ donationAmount: selectedTier.donation_amount, priceId: priceId });
    };

    const handleRecurringCheckedChange = (checked: boolean) => {
        if (!checked) {
            setDonateDialogStates({ recurring: null });
        } else {
            setDonateDialogStates({ recurring: true });
        }
    };

    const handleFeesCheckedChange = (checked: boolean) => {
        if (!checked) {
            setDonateDialogStates({ includeFees: null });
        } else {
            setDonateDialogStates({ includeFees: true });
        }
    };

    async function onSubmit(form: DonateFormSchema) {
        try {
            // create a new customer if one doesn't exist
            const customerId = await getStripeCustomer({ email });

            const price = await getStripePrice(
                donationAmount,
                recurring,
                includeFees
            );

            const priceData = price as { priceId: string; unitAmount: number };

            const { unitAmount, priceId } = priceData;

            // if the donation is recurring, we need to create a subscription

            if (recurring) {
                // create a new subscription
                const subscription = await getStripeSubscription({
                    customerId,
                    priceId: priceId as string,
                });

                setDonateDialogStates(
                    {
                        open: true,
                        recurring,
                        name: form.name,
                        email: form.email,
                        donationAmount: unitAmount,
                        includeFees,
                        clientSecret: subscription?.clientSecret,
                        priceId: priceId,
                        customerId: customerId,
                    },
                    {
                        history: "push",
                    }
                );
            } else {
            const clientSecret = await createPaymentIntent({
                amount: unitAmount,
                email: form.email,
                name: form.name,
                recurring,
                includeFees,
            });

            setDonateDialogStates(
                {
                    open: true,
                    recurring,
                    name: form.name,
                    email: form.email,
                    donationAmount: unitAmount,
                    includeFees,
                    clientSecret,
                },
                {
                    history: "push",
                }
            );
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
                className={cn("grid items-start gap-4")}
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
                                    onCheckedChange={
                                        handleRecurringCheckedChange
                                    }
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
                                Cover the transaction fees of{" "}
                                {longFloatToUSD(
                                    getStripeTransactionFees(donationAmount)
                                )}{" "}
                                for this donation.
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
                                            setDonateDialogStates({
                                                donationAmount: numericValue,
                                            });
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
                                        onChange={(e) => {
                                            setDonateDialogStates({
                                                donationAmount: parseFloat(
                                                    e.target.value
                                                ),
                                            }); // Update donationAmount state
                                            form.setValue(
                                                "donation_amount",
                                                parseFloat(e.target.value)
                                            );
                                        }} // Parse and set as number
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
                <SubmitButton
                    donationAmount={donationAmount}
                    form={form}
                    recurring={recurring as boolean}
                />
            </form>
        </Form>
    );
}
