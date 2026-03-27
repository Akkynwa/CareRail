import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [balance, vouchers, redeemed] = await Promise.all([
    prisma.beneficiaryBalance.findUnique({ where: { beneficiaryId: session.id } }),
    prisma.voucher.count({
      where: { beneficiaryId: session.id, status: "active" }
    }),
    prisma.voucher.count({
      where: { beneficiaryId: session.id, status: "redeemed" }
    })
  ]);

  return NextResponse.json({
    balance: balance?.amount || 0,
    activeVouchers: vouchers,
    redeemedVouchers: redeemed
  });
}