import VoucherItem from "./VoucherItem";

export default function VoucherList({ vouchers }: any) {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Vouchers</h2>

      {vouchers?.length === 0 ? (
        <p className="text-gray-500">No vouchers available</p>
      ) : (
        vouchers.map((v: any) => <VoucherItem key={v.id} voucher={v} />)
      )}
    </div>
  );
}