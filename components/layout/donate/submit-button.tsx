import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { track } from "@vercel/analytics/react";
import { DonateFormSchema } from "@/types";
import { UseFormReturn } from "react-hook-form";

interface SubmitButtonProps {
    form: UseFormReturn<DonateFormSchema, any, undefined>;
}

export const SubmitButton = (form: SubmitButtonProps) => {

    const watchDonationAmount = form.form.watch("donationAmount");
    const watchRecurring = form.form.watch("recurring");
    const { isDirty, isValid, isSubmitting } = form.form.formState;

    return (
        <Button
            type="submit"
            variant="default"
            onClick={() => track("donate button clicked")}
            className="w-full"
            disabled={!isDirty || !isValid || isSubmitting}
        >
            {isSubmitting && <Icons.loadingCircle className="w-4 h-4 mr-2 animate-spin" />}
            {watchRecurring
                ? `Start a recurring donation of $${watchDonationAmount} per month`
                : `Make a one-time donation of $${
                      watchDonationAmount ? watchDonationAmount : 0
                  }`}
        </Button>
    );
};