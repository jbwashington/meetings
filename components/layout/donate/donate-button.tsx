'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import donationConfig from "@/config/donate";
import { useDonateDialogStates } from "@/hooks/use-donate-dialog";


export default function DonateButton() {

    const [{}, setDonateDialogStates] = useDonateDialogStates();

    const handleOnClick = () => {
        setDonateDialogStates({open: true, donationAmount: donationConfig.tiers[2].donation_amount })
    }


    return (
        <Button
            onClick={handleOnClick}
            className={buttonVariants({ variant: "default", size: "sm" })}
        >
            <Icons.heartHandshake className="w-4 h-4 mr-2" />{" "}
            {donationConfig.title}
        </Button>
    );
}
