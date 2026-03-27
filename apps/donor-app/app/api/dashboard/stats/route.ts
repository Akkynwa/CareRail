import { prisma } from "@carerail/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const donorId = searchParams.get("donorId");

  if (!donorId) return NextResponse.json({ error: "Missing donorId" }, { status: 400 });

  const totalDonations = await prisma.donation.aggregate({
    where: { donorId },
    _sum: { amount: true },
  });

  const totalRedeemed = await prisma.transaction.aggregate({
    where: { donorId, type: "VOUCHER_REDEEMED" },
    _sum: { amount: true },
  });

  const totalPending = await prisma.transaction.aggregate({
    where: { donorId, type: "VOUCHER_ISSUED" },
    _sum: { amount: true },
  });

  return NextResponse.json({
    totalDonations: totalDonations._sum.amount || 0,
    totalRedeemed: totalRedeemed._sum.amount || 0,
    totalPending: (totalPending._sum.amount || 0) - (totalRedeemed._sum.amount || 0),
  });
}