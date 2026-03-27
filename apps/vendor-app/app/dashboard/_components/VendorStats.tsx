export default function VendorStats({ stats }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="p-4 bg-white shadow-sm rounded-xl">
        <p className="text-gray-500">Total Vouchers</p>
        <h2 className="text-2xl font-bold">{stats.totalVouchers}</h2>
      </div>

      <div className="p-4 bg-white shadow-sm rounded-xl">
        <p className="text-gray-500">Redeemed</p>
        <h2 className="text-2xl font-bold">{stats.redeemed}</h2>
      </div>

      <div className="p-4 bg-white shadow-sm rounded-xl">
        <p className="text-gray-500">Earnings</p>
        <h2 className="text-2xl font-bold">₦{stats.earnings}</h2>
      </div>
    </div>
  );
}