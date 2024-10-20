import { DonationConfig } from "@/types";

const donationConfig: DonationConfig = {
    title: "Donate",
    description:
        "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
    tiers: [
        {
            name: "Basic",
            donation_amount: 10,
            price: {
                subscription: "price_1QBjT7LftdtWF7iBr6EjOCRL",
                oneTime: "price_1QBoOOLftdtWF7iBbOApgSFf",
            },
        },
        {
            name: "Supporter",
            donation_amount: 25,
            price: {
                subscription: "price_1QBjT7LftdtWF7iBslheGrxP",
                oneTime: "price_1QBoYuLftdtWF7iBIRAIcMnC",
            },
        },
        {
            name: "Advocate",
            donation_amount: 50,
            price: {
                subscription: "price_1QBjT7LftdtWF7iBGXP5Vwnv",
                oneTime: "price_1QBoZsLftdtWF7iB5Q4iSTJ5",
            },
        },
        {
            name: "Champion",
            donation_amount: 100,
            price: {
                subscription: "price_1QBjT7LftdtWF7iBXsxhOtFj",
                oneTime: "price_1QBoaILftdtWF7iB7XpC0jop",
            },
        },
    ],
};

export default donationConfig;