"use client";

export default function VoucherItem({
  voucher,
}: {
  voucher: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  };
}) {
  return (
    <div className="border p-3 rounded-lg hover:bg-gray-50 flex justify-between">
      <div>
        <p className="text-sm font-medium">
          Voucher #{voucher.id.substring(0, 6)}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(voucher.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold">₦{voucher.amount}</p>
        <span
          className={`text-xs ${
            voucher.status === "active"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {voucher.status}
        </span>
      </div>
    </div>
  );
}