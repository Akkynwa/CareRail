"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useParams } from "next/navigation";

export default function VoucherDetailsPage() {
  const params = useParams();
  const [voucher, setVoucher] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await api.vouchers.get(params.voucherId as string);
      setVoucher(data);
    };
    load();
  }, [params.voucherId]);

  if (!voucher) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Voucher Details</h1>

      <div className="p-4 bg-white shadow rounded-xl space-y-2">
        <p className="font-semibold text-lg">{voucher.code}</p>
        <p className="text-gray-500">Status: {voucher.status}</p>
        <p className="text-gray-500">Created: {voucher.createdAt}</p>
        <p className="text-gray-500">Value: ₦{voucher.amount}</p>
      </div>

      {voucher.status === "UNREDEEMED" && (
        <button
          onClick={async () => {
            await api.vouchers.redeem({ id: voucher.id });
            alert("Voucher redeemed!");
            window.location.reload();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Redeem Voucher
        </button>
      )}
    </div>
  );
}