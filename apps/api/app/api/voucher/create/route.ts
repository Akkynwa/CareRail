// apps/api/src/app/api/voucher/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { generateQR } from "@carerail/qr";

export async function POST(req: Request) {
  const data = await req.json();
  const { walletId, amount, purpose, donorId } = data;

  const qrCodeValue = crypto.randomUUID();
  const qr = await generateQR(qrCodeValue);

  const voucher = await prisma.voucher.create({
    data: {
      walletId,
      amount,
      purpose,
      qrCodeValue,
    },
  });

  await prisma.transaction.create({
    data: {
      donorId,
      voucherId: voucher.id,
      amount,
      type: "VOUCHER_ISSUED",
    },
  });

  return NextResponse.json({
    voucher,
    qr,
  });
}