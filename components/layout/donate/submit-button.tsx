import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { track } from "@vercel/analytics/react";
import { DonateFormSchema } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { longFloatToUSD } from "@/lib/utils";

export const SubmitButton = ({
    form,
    donationAmount,
    recurring,
}: {
    form: UseFormReturn<DonateFormSchema, any, undefined>;
    donationAmount: number;
    recurring: boolean;
}) => {
    const { isDirty, isValid, isSubmitting } = form.formState;
    const donationAmountCurrency = longFloatToUSD(donationAmount);

    return (
        <Button
            type="submit"
            variant="default"
            onClick={() => track("donate button clicked")}
            className="w-full"
            disabled={!isDirty || !isValid || isSubmitting}
        >
            {isSubmitting && (
                <Icons.loadingCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            {recurring
                ? `Start a recurring donation of $${donationAmount} per month`
                : `Make a one-time donation of $${
                      donationAmount ? donationAmount : 0
                  }`}
        </Button>
    );
};
