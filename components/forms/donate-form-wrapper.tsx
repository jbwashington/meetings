"use client";

import { Suspense } from "react";
import DonateForm from "./donate-form";
import { Icons } from "../ui/icons";

function DonateFormLoading() {
    return (
        <div className="flex items-center justify-center p-8">
            <Icons.loadingCircle className="h-8 w-8 animate-spin" />
        </div>
    );
}

export default function DonateFormWrapper({ className }: { className?: string }) {
    return (
        <Suspense fallback={<DonateFormLoading />}>
            <DonateForm className={className} />
        </Suspense>
    );
}