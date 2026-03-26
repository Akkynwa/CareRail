import { StatsCard } from "@carerail/ui/components/StatsCard";
import { LiveFeedCard } from "@carerail/ui/components/LiveFeedCard";

export default async function DashboardPage() {
  // Placeholder values; later fetch from /api/donor/summary
  const totalDonations = 120000;
  const totalRedeemed = 75000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard label="Total Donations" value={`₦${totalDonations}`} />
      <StatsCard label="Redeemed Vouchers" value={`₦${totalRedeemed}`} />
      <LiveFeedCard />
    </div>
  );
}