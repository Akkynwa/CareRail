import { prisma } from "@carerail/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const donorId = searchParams.get("donorId");

  if (!donorId) return NextResponse.json({ error: "Missing donorId" }, { status: 400 });

  const transactions = await prisma.transaction.findMany({
    where: { donorId },
    include: { beneficiary: true, vendor: true, voucher: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(transactions);
}