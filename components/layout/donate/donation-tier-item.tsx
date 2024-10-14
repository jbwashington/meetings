import { Card, CardContent } from "@/components/ui/card";
import { DonationTier } from "@/types";

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

export default function DonationTierItem({ tier }: { tier: DonationTier }) {
    return (
        <Card className="w-full">
            <CardContent className="p-4">
                <p className="text-xl font-extrabold">{tier.name}</p>
                {formatCurrency(tier.donationAmount)}
            </CardContent>
        </Card>
    );
}