export function useVouchers() {
  return {
    vouchers: [
      {
        id: "1",
        amount: 5000,
        purpose: "Food Assistance",
        qrCodeValue: "CRVCHR-123456",
        isRedeemed: false,
        createdAt: new Date("2024-03-20"),
        expiresAt: new Date("2024-03-27"),
      },
      {
        id: "2",
        amount: 10000,
        purpose: "Medical Support",
        qrCodeValue: "CRVCHR-789012",
        isRedeemed: true,
        createdAt: new Date("2024-03-15"),
        expiresAt: new Date("2024-03-22"),
      },
    ],
  };
}