"use client";

import VoucherItem from "./VoucherItem";
import Link from "next/link";

export default function VoucherList({ vouchers }: { vouchers: any[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Your Vouchers</h2>

      <div className="space-y-3">
        {vouchers.length === 0 && (
          <p className="text-gray-500">No vouchers available.</p>
        )}

        {vouchers.map((voucher) => (
          <Link
            key={voucher.id}
            href={`/dashboard/vouchers/${voucher.id}`}
          >
            <VoucherItem voucher={voucher} />
          </Link>
        ))}
      </div>
    </div>
  );
}