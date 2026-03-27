export default function RecentTransactions({ transactions }: any) {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No recent transactions</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((t: any) => (
            <li key={t.id} className="border p-3 rounded-md">
              <p className="font-medium">Voucher: {t.voucherCode}</p>
              <p className="text-sm text-gray-500">₦{t.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}