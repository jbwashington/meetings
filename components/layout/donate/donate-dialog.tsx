"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DonateForm from "@/components/forms/donate-form";
import donationConfig from "@/config/donate";
import useWindowSize from "@/hooks/use-window-size";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/forms/checkout-form";
import { loadStripe, StripeElementsOptions, } from "@stripe/stripe-js";
import DonateSuccess from "./donate-success";
import DonateSummary from "./donate-summary";
import { useTheme } from "next-themes";
import { env } from "@/env.mjs";
import DonateButton from "./donate-button";
import { lightAppearance, darkAppearance, checkoutFormConfig } from "@/config/checkout-form";
import { successUrlSerializer } from "@/lib/serializers";
import { useQueryStates } from "nuqs";
import { donateDialogParser } from "@/lib/parsers/donate-dialog";
import { donateDialogKeyMap } from "@/lib/keymaps/donate-dialog";

export default function DonateDialog() {
    const windowSize = useWindowSize();
    const isDesktop = windowSize.isDesktop;

    const [
        {
            open,
            recurring,
            success,
            donationAmount,
            name,
            email,
            includeFees,
            paymentIntent,
            paymentIntentClientSecret,
            clientSecret,
            redirectStatus,
            sessionId,
        },
        setDonateDialogStates,
    ] = useQueryStates(donateDialogParser, donateDialogKeyMap);


    const handleDialogChange = (open: boolean) => {
        if (!open) {
            setDonateDialogStates(null);
        }
    };

    const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_API_KEY);

    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";
    const returnURL = successUrlSerializer();

    const mode: StripeElementsOptions['mode'] = recurring ? "subscription" : "payment";

    const options = {
        // clientSecret: clientSecret,
        appearance: isDarkMode ? darkAppearance : lightAppearance,
        mode: mode,
        amount: donationAmount,
        currency: 'usd',
    };



        // amount: donationAmount,
        // currency: 'usd',
        // mode: recurring ? "subscription" : "payment",
        // returnUrl: returnURL,

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                    <DonateButton />
                </DialogTrigger>
                {!success ? (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {clientSecret
                                    ? checkoutFormConfig.title
                                    : donationConfig.title}
                            </DialogTitle>
                            <DialogDescription>
                                {clientSecret
                                    ? checkoutFormConfig.description
                                    : donationConfig.description}
                            </DialogDescription>
                        </DialogHeader>
                        {clientSecret && (
                            <DonateSummary
                                name={name}
                                donationAmount={donationAmount}
                                recurring={recurring}
                                includeFees={includeFees}
                            />
                        )}
                        {!clientSecret && !name ? (
                            <DonateForm />
                        ) : (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        )}
                        <DialogFooter>
                            <div className="flex w-full grid-cols-2 pt-2 m-auto space-x-4 text-xs text-muted-foreground">
                                <Link href="/contact">
                                    Questions? Contact Us
                                </Link>
                                <Link href="/privacy-statement">
                                    Privacy Statement
                                </Link>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                ) : paymentIntentClientSecret ? (
                    <DialogContent>
                        <DonateSuccess
                            paymentIntent={paymentIntentClientSecret}
                        />
                    </DialogContent>
                ) : null}
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleDialogChange}>
            <DrawerTrigger asChild>
                <DonateButton />
            </DrawerTrigger>
            <DrawerContent className="container">
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {clientSecret
                            ? checkoutFormConfig.title
                            : donationConfig.title}
                    </DrawerTitle>
                    <DrawerDescription>
                        {clientSecret
                            ? checkoutFormConfig.description
                            : donationConfig.description}
                    </DrawerDescription>
                </DrawerHeader>
                {!clientSecret && !name ? (
                    <DonateForm />
                ) : success && paymentIntent ? (
                    <DonateSuccess paymentIntent={paymentIntent} />
                ) : (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <div className="flex w-full grid-cols-2 pt-2 m-auto space-x-4 text-xs text-muted-foreground">
                            <Link href="mailto:jbwashington@gmail.com">
                                {" "}
                                Questions? Contact Us
                            </Link>
                            <Link href="/privacy-statement">
                                Privacy Statement
                            </Link>
                        </div>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
