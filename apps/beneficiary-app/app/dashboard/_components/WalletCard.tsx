"use client";

export default function WalletCard({ balance }: { balance: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">Wallet Balance</p>
      <p className="text-3xl font-bold mt-1">₦{balance.toLocaleString()}</p>
    </div>
  );
}