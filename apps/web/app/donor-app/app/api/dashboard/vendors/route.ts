import { prisma } from "@carerail/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const donorId = searchParams.get("donorId");

  if (!donorId) return NextResponse.json({ error: "Missing donorId" }, { status: 400 });

  const vendors = await prisma.transaction.findMany({
    where: { donorId, type: "VOUCHER_REDEEMED" },
    select: { vendor: true },
    distinct: ["vendorId"],
  });

  return NextResponse.json(vendors.map(v => v.vendor));
}