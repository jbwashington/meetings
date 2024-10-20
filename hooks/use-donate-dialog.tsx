"use client";

import { donateDialogKeyMap } from "@/lib/keymaps/donate-dialog";
import { donateDialogParser } from "@/lib/parsers/donate-dialog";
import { useQueryStates } from "nuqs";

export function useDonateDialogStates() {
    return useQueryStates(donateDialogParser, donateDialogKeyMap);
}
