import { Card, Button } from "@carerail/ui/components";

export default function DonationCard({ amount, purpose, qr }: { amount: number; purpose: string; qr: string }) {
  return (
    <Card className="flex justify-between items-center p-4">
      <div>
        <p className="font-medium">{purpose}</p>
        <p className="text-sm text-gray-500">₦{amount}</p>
      </div>
      <img src={qr} alt="QR" className="w-16 h-16"/>
    </Card>
  );
}