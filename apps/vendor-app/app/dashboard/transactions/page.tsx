"use client";

import { useTransactions } from "../../../hooks/useTransactions";

export default function TransactionsPage() {
  const { transactions } = useTransactions();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Voucher</th>
              <th className="py-2">Amount</th</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx.id} className="border-b">
                <td className="py-2">{tx.voucherCode}</td>
                <td className="py-2">₦{tx.amount}</td>
                <td className="py-2">{tx.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <p className="py-4 text-gray-500">No transactions yet</p>
        )}
      </div>
    </div>
  );
}