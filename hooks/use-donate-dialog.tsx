'use client'

import { parseAsBoolean, parseAsFloat, parseAsString, useQueryState, useQueryStates } from "nuqs";

export function useDonateDialog() {
    const [open, setOpen] = useQueryState(
        "donate",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    return { open, setOpen };
}

export function useClientSecret() {
    const [clientSecret, setClientSecret] = useQueryState(
        "client_secret",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { clientSecret, setClientSecret };
}

export function useSuccess() {
    const [success, setSuccess] = useQueryState(
        "success",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    return { success, setSuccess };
}

export function useRecurring() {
    const [recurring, setRecurring] = useQueryState(
        "recurring",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    return { recurring, setRecurring };
}

export function useDonationAmount() {
    const [donationAmount, setDonationAmount] = useQueryState(
        "donation_amount",
        parseAsFloat.withOptions({ clearOnDefault: true })
    );
    return { donationAmount, setDonationAmount };
}

export function useName() {
    const [name, setName] = useQueryState(
        "name",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { name, setName };
}

export function useIncludeFees() {
    const [includeFees, setIncludeFees] = useQueryState(
        "include_fees",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    return { includeFees, setIncludeFees };
}

export function usePaymentIntent() {
    const [paymentIntent, setPaymentIntent] = useQueryState(
        "payment_intent",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { paymentIntent, setPaymentIntent };
}

export function usePaymentIntentClientSecret() {
    const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useQueryState(
        "payment_intent_client_secret",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { paymentIntentClientSecret, setPaymentIntentClientSecret };
}

export function useRedirectStatus() {
    const [redirectStatus, setRedirectStatus] = useQueryState(
        "redirect_status",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { redirectStatus, setRedirectStatus };
}
