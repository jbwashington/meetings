import { DonationConfig } from "@/types";

const donationConfig: DonationConfig = {
    title: "Donate",
    description:
        "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
    tiers: [
        {
            name: "Basic",
            donation_amount: 10,
        },
        {
            name: "Supporter",
            donation_amount: 25,
        },
        {
            name: "Advocate",
            donation_amount: 50,
        },
        {
            name: "Champion",
            donation_amount: 100,
        },
    ],
};

export default donationConfig;