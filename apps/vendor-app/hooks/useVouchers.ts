export function useVouchers() {
  return {
    vouchers: [
      {
        id: "v1",
        amount: 5000,
        beneficiaryName: "John Doe",
        qrCode: "CRVCHR-123456",
        status: "pending",
      },
      {
        id: "v2",
        amount: 10000,
        beneficiaryName: "Jane Smith",
        qrCode: "CRVCHR-789012",
        status: "redeemed",
      },
    ],
  };
}