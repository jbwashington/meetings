import { Suspense } from "react";
import DonateDialog from "./donate-dialog";

export default function DonateDialogWrapper() {
    return (
        <Suspense fallback={null}>
            <DonateDialog />
        </Suspense>
    );
}