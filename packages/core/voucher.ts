import { randomUUID } from "crypto";

export function generateVoucher(amount: number) {
  const id = randomUUID();
  return { id, qrCode: "QR_" + id, amount };
}