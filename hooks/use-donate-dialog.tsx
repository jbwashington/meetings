'use client'

import { parseAsBoolean, useQueryState } from "nuqs";

export function useDonateDialog() {
    const [open, setOpen] = useQueryState(
        "donate",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    return { open, setOpen };
}
