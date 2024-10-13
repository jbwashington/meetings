import DonateForm from "@/components/forms/donate-form";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const DonateDialogPage = () => {
    return (
        <>
            <Dialog>
                {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Donate to The Neighborhood School PTA
                        </DialogTitle>
                        <DialogDescription>
                            Your donation is fully tax deductible; the
                            Neighborhood School PTA is a 501(c)(3) charitable
                            organization.
                        </DialogDescription>
                    </DialogHeader>
                    <DonateForm />
                </DialogContent>
            </Dialog>
        </>
    );
};