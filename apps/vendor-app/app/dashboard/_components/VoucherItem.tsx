import Link from "next/link";

export default function VoucherItem({ voucher }: any) {
  return (
    <Link
      href={`/dashboard/vouchers/${voucher.id}`}
      className="block p-3 border rounded-lg hover:bg-gray-100"
    >
      <p className="font-semibold">{voucher.code}</p>
      <p className="text-sm text-gray-500">{voucher.status}</p>
    </Link>
  );
}