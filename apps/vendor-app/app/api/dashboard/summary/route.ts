import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { validateVendorSession } from "@/app/lib/auth";

export async function GET(req: Request) {
  const auth = await validateVendorSession(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const totalVouchers = await prisma.voucher.count({
    where: { vendorId: auth.vendor.id },
  });

  const redeemed = await prisma.voucher.count({
    where: { vendorId: auth.vendor.id, status: "REDEEMED" },
  });

  const revenue = await prisma.vendorTransaction.aggregate({
    where: { vendorId: auth.vendor.id },
    _sum: { amount: true },
  });

  return NextResponse.json({
    totalVouchers,
    redeemed,
    revenue: revenue._sum.amount || 0,
  });
}