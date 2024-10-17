'use client'

import { parseAsBoolean, parseAsFloat, parseAsString, useQueryState } from "nuqs";

export function useAddFees() {
    const [addFees, setAddFees] = useQueryState(
        "addFees",
        parseAsBoolean.withOptions({ clearOnDefault: true })
    );
    return { addFees, setAddFees };
}

export function useEmail() {
    const [email, setEmail] = useQueryState(
        "email",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { email, setEmail };
}

export function useRecurring() {
    const [recurring, setRecurring] = useQueryState(
        "recurring",
        parseAsBoolean.withOptions({ clearOnDefault: true })
    );
    return { recurring, setRecurring };
}

export function useName() {
    const [name, setName] = useQueryState(
        "name",
        parseAsString.withOptions({ clearOnDefault: true })
    );
    return { name, setName };
}

export function useDonationAmount() {
    const [donationAmount, setDonationAmount] = useQueryState(
        "donationAmount",
        parseAsFloat.withOptions({ clearOnDefault: true })
    );
    return { donationAmount, setDonationAmount };
}
