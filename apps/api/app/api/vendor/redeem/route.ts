// apps/api/src/app/api/vendor/redeem/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  const { voucherCode, merchantCode } = await req.json();

  const vendor = await prisma.vendor.findUnique({
    where: { merchantCode },
    include: { category: true },
  });

  if (!vendor)
    return NextResponse.json({ error: "Invalid merchant" }, { status: 400 });

  const voucher = await prisma.voucher.findUnique({
    where: { qrCodeValue: voucherCode },
    include: { wallet: { include: { beneficiary: true } } },
  });

  if (!voucher)
    return NextResponse.json({ error: "Invalid voucher" }, { status: 404 });

  if (voucher.isRedeemed)
    return NextResponse.json({ error: "Already redeemed" }, { status: 400 });

  // redeem
  await prisma.voucher.update({
    where: { id: voucher.id },
    data: { isRedeemed: true },
  });

  await prisma.transaction.create({
    data: {
      vendorId: vendor.id,
      beneficiaryId: voucher.wallet.beneficiaryId,
      voucherId: voucher.id,
      amount: voucher.amount,
      type: "VOUCHER_REDEEMED",
    },
  });

  return NextResponse.json({
    success: true,
    vendor,
    voucher,
  });
}