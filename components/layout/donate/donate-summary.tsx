
export default function DonateSummary(
{
    name,
    donationAmount,
    recurring,
}:{
  name: string;
  donationAmount: number;
  recurring: boolean;
}
) {
  return (
    <div className="grid gap-1 text-sm font-bold rounded-lg bg-background">
      <div className="flex justify-between">
        <p>On Behalf Of:</p>
        <p className="capitalize">{name}</p>
      </div>
      <div className="flex justify-between">
        <p>Donation Amount:</p>
        <p>${donationAmount}</p>
      </div>
      <div className="flex justify-between">
        <p>Donation Frequency:</p>
        <p>{recurring ? "Monthly" : "One-time"}</p>
      </div>
      <div className="pt-3 border-b border-foreground" />
    </div>
  );
}