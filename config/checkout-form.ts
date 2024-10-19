import { CheckoutFormConfig } from "@/types";
import { Appearance } from "@stripe/stripe-js";

export const checkoutFormConfig: CheckoutFormConfig = {
    title: "Secure Donation",
    description:
        "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
};

export const lightAppearance: Appearance = {
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

export const darkAppearance: Appearance = {
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
