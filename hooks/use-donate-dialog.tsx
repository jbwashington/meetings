"use client";

import { donateDialogParser } from "@/lib/parsers/donate-dialog";
import { useQueryStates } from "nuqs";

export function useDonateDialog() {
    const [queryStates, setQueryStates] = useQueryStates(donateDialogParser, {
        urlKeys: {
            open: "donate",
            donationAmount: "donation_amount",
            includeFees: "include_fees",
            paymentIntent: "payment_intent",
            paymentIntentClientSecret: "payment_intent_client_secret",
            clientSecret: "client_secret",
            redirectStatus: "redirect_status",
            sessionId: "session_id",
        },
    });

    const {
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
    } = queryStates;

    return {
        open,
        setOpen: () => setQueryStates({ open: true, donationAmount: 50 }),
        clear: () => setQueryStates(null),
        recurring,
        setRecurring: (value: boolean | null) =>
            setQueryStates({ recurring: value }),
        success,
        setSuccess: (value: boolean | null) =>
            setQueryStates({ success: value }),
        donationAmount,
        setDonationAmount: (value: number | null) =>
            setQueryStates({ donationAmount: value }),
        name,
        setName: (value: string | null) => setQueryStates({ name: value }),
        email,
        setEmail: (value: string | null) => setQueryStates({ email: value }),
        includeFees,
        setIncludeFees: (value: boolean | null) =>
            setQueryStates({ includeFees: value }),
        paymentIntent,
        setPaymentIntent: (value: string | null) =>
            setQueryStates({ paymentIntent: value }),
        paymentIntentClientSecret,
        setPaymentIntentClientSecret: (value: string | null) =>
            setQueryStates({ paymentIntentClientSecret: value }),
        clientSecret,
        setClientSecret: (value: string | null) =>
            setQueryStates({ clientSecret: value }),
        redirectStatus,
        setRedirectStatus: (value: "open" | "complete" | null) =>
            setQueryStates({ redirectStatus: value }),
        sessionId,
        setSessionId: (value: string | null) =>
            setQueryStates({ sessionId: value }),
    };
}
