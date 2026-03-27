import Link from "next/link";
import { Card, Button } from "@carerail/ui";

export default function HomePage() {
  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-3xl font-bold">Welcome to CareRail Donor Portal</h1>
      <p>Select an action:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h2 className="font-semibold text-lg">New Donation</h2>
          <p>Issue a new voucher to beneficiaries</p>
          <Link href="/donations/new">
            <Button className="mt-2">Create</Button>
          </Link>
        </Card>

        <Card>
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <p>See live impact and redeemed vouchers</p>
          <Link href="/dashboard">
            <Button className="mt-2">View</Button>
          </Link>
        </Card>

        <Card>
          <h2 className="font-semibold text-lg">Generate QR</h2>
          <p>Create a QR code for offline beneficiaries</p>
          <Link href="/qr/generate">
            <Button className="mt-2">Generate</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}