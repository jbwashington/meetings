import {DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DrawerTitle, DrawerDescription, DrawerHeader } from "@/components/ui/drawer";
import donationConfig from "@/config/donate";

const donateConfig = {
    title: "Support Our School",
    description: "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
}

const checkoutConfig = {
    title: "Secure Donation",
    description:
        "Donations big and small allow TNS to continue our incredible mission and create a safe and nurturing environment for our children. The PTA raises money to fund so many of the programs and partnerships that make TNS so very special!",
};

const successConfig = {
    title: "Thank you for your donation!",
    description:
        "Your donation will help us continue our mission of providing a safe and nurturing environment for our children. Thank you for your support!",
}



export const DonateFormHeading = ({
    showDonationForm,
    showCheckoutForm,
    showSuccess,
    isDesktop,
}: {
    showDonationForm: boolean;
    showCheckoutForm: boolean;
    showSuccess: boolean;
    isDesktop: boolean;
}) => {
    return isDesktop ? (
        <DialogHeader>
            <DialogTitle>
                {showDonationForm
                    ? donateConfig.title
                    : showCheckoutForm
                    ? checkoutConfig.title
                    : showSuccess
                    ? successConfig.title
                    : null}
            </DialogTitle>
            <DialogDescription>
                {showDonationForm
                    ? donationConfig.description
                    : showCheckoutForm
                    ? checkoutConfig.description
                    : showSuccess
                    ? successConfig.description
                    : null}
            </DialogDescription>
        </DialogHeader>
    ) : (
        <DrawerHeader className="text-left">
            <DrawerTitle>
                {showDonationForm
                    ? donateConfig.title
                    : showCheckoutForm
                    ? checkoutConfig.title
                    : showSuccess
                    ? successConfig.title
                    : null}
            </DrawerTitle>
            <DrawerDescription>
                {showDonationForm
                    ? donationConfig.description
                    : showCheckoutForm
                    ? checkoutConfig.description
                    : showSuccess
                    ? successConfig.description
                    : null}
            </DrawerDescription>
        </DrawerHeader>
    );
};