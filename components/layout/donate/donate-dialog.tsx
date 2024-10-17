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
import { Button } from "@/components/ui/button";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/forms/checkout-form";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import DonateSuccess from "./donate-success";
import DonateSummary from "./donate-summary";
import { useTheme } from "next-themes";
import { track } from "@vercel/analytics/react";
import { Icons } from "@/components/ui/icons";
import { env } from "@/env.mjs";
import DonateFees from "./donate-fees";

const donateConfig = {
    title: "Support Our School",
    description: "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
}

const addFeesConfig = {
    title: "Would you like to cover the fees?",
    description:
    "By covering 2.9% + $0.30 per transaction, you can help us raise more money for our school programs."
};
const checkoutConfig = {
    title: "Secure Donation",
    description:
        "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
};

export default function DonateDialog() {

    const windowSize = useWindowSize();
    const isDesktop = windowSize.isDesktop;
    const searchParams = useSearchParams();
    const isOpen = searchParams.has("donate");
    const success = searchParams.has("success");
    const frequency = searchParams.get("frequency");
    const donationAmount = searchParams.get("donation_amount");
    const name = searchParams.get("name");
    const includeFees = searchParams.has("include_fees");
    const paymentIntent = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get(
        "payment_intent_client_secret"
    );
    const redirectStatus = searchParams.get("redirect_status");

    const router = useRouter();

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            router.push("/");
        }
    };

    console.log("isOpen: ", isOpen);
    console.log("success: ", success);
    console.log("frequency: ", frequency);
    console.log("donationAmount: ", donationAmount);
    console.log("name: ", name);
    console.log("includeFees: ", includeFees);
    console.log("paymentIntent: ", paymentIntent);
    console.log("paymentIntentClientSecret: ", paymentIntentClientSecret);
    console.log("redirectStatus: ", redirectStatus);

    // const showDonationForm: boolean = !success && !frequency && !donationAmount && !name && !includeFees && !paymentIntent && !paymentIntentClientSecret;
    // const showAddFeesDialog: boolean = !success && frequency && donationAmount && name && !includeFees && !paymentIntent && !paymentIntentClientSecret;
    // const showCheckoutForm: boolean = !success && frequency && donationAmount && name && includeFees && !paymentIntent && !paymentIntentClientSecret;
    // const showSuccessDialog: boolean = success && frequency && donationAmount && name && includeFees && paymentIntent && paymentIntentClientSecret;

    // console.log('showDonationForm: ', showDonationForm);
    // console.log('showAddFeesDialog: ', showAddFeesDialog);
    // console.log('showCheckoutForm: ', showCheckoutForm);
    // console.log('showSuccessDialog: ', showSuccessDialog);

    const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_API_KEY);

    const clientSecret = searchParams.get("client_secret");

    const lightAppearance: Appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "rgb(226, 232, 240)",
            colorBackground: "rgb(255, 255, 255)",
            colorText: "rgb(2, 8, 23)",
            fontFamily: "Inter, Roboto, Helvetica Neue, sans-serif",
            fontSizeBase: "14px",
            spacingUnit: "2px",
            borderRadius: "2px",
        },
    };

    const darkAppearance: Appearance = {
        theme: "night",
        variables: {
            colorPrimary: "rgb(30, 41, 59)",
            colorBackground: "rgb(2, 8, 23)",
            colorText: "rgb(248, 250, 252)",
            fontFamily: "Inter, Roboto, Helvetica Neue, sans-serif",
            fontSizeBase: "14px",
            spacingUnit: "2px",
            borderRadius: "2px",
        },
    };

    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";

    const options = {
        clientSecret: clientSecret as string,
        returnURL: `/?donate=true&success=true`,
        appearance: isDarkMode ? darkAppearance : lightAppearance,
    };

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                    <Link href="/?donate=true&frequency=one-time">
                        <Button
                            onClick={() => track("donate button clicked")}
                            variant="default"
                            size="sm"
                        >
                            <Icons.heartHandshake className="w-4 h-4 mr-2" />{" "}
                            {donationConfig.title}
                        </Button>
                    </Link>
                </DialogTrigger>
                {!success ? (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {!clientSecret && !includeFees
                                    ? donationConfig.title : !clientSecret && name ? addFeesConfig.title
                                    : checkoutConfig.title}
                            </DialogTitle>
                            <DialogDescription>
                                {!clientSecret && !includeFees
                                    ? donationConfig.description : !clientSecret && name ? addFeesConfig.description
                                    : checkoutConfig.description}
                            </DialogDescription>
                        </DialogHeader>
                        {clientSecret && (
                            <DonateSummary
                                name={name ? name : ""}
                                donationAmount={
                                    donationAmount
                                        ? parseInt(donationAmount)
                                        : 0
                                }
                                recurring={
                                    frequency === "recurring" ? true : false
                                }
                            />
                        )}
                        {!clientSecret && !name ? (
                            <DonateForm />
                        ) : !clientSecret && name ? (
                            <DonateFees />
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
                        <DonateSuccess paymentIntent={paymentIntentClientSecret} />
                    </DialogContent>
                ) : null}
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={handleDialogChange}>
            <DrawerTrigger asChild>
                <Link href="/?donate=true">
                    <Button variant="default">{donationConfig.title}</Button>
                </Link>
            </DrawerTrigger>
            <DrawerContent className="container">
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {!clientSecret && !includeFees
                            ? donationConfig.title : !clientSecret && name ? addFeesConfig.title
                            : checkoutConfig.title}
                    </DrawerTitle>
                    <DrawerDescription>
                        {!clientSecret && !includeFees
                            ? donationConfig.description : !clientSecret && name ? addFeesConfig.description
                            : checkoutConfig.description}
                    </DrawerDescription>
                </DrawerHeader>
                        {!clientSecret && !name ? (
                            <DonateForm />
                        ) : !clientSecret && name ? (
                            <DonateFees />
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
