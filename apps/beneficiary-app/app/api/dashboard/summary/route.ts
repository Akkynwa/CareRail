import { NextResponse } from "next/server";
import { authFromHeader } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json({}, { status: 401 });

  const balance = await prisma.beneficiaryBalance.findUnique({
    where: { beneficiaryId: session.id },
  });

  const vouchers = await prisma.voucher.count({
    where: { beneficiaryId: session.id, status: "active" },
  });

  return NextResponse.json({
    balance: balance?.amount || 0,
    activeVouchers: vouchers,
  });
}