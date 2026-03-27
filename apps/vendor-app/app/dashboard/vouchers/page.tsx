"use client";

import VoucherList from "../_components/VoucherList";
import { useVouchers } from "../../../hooks/useVouchers";

export default function VendorVouchersPage() {
  const { vouchers } = useVouchers();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Vouchers</h1>
      <VoucherList vouchers={vouchers} />
    </div>
  );
}