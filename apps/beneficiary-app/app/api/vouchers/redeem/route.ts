import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function POST(req: Request) {
  const session = authFromHeader(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { voucherId } = await req.json();

  const voucher = await prisma.voucher.findUnique({ where: { id: voucherId } });

  if (!voucher)
    return NextResponse.json({ error: "Voucher not found" }, { status: 404 });

  if (voucher.status === "redeemed")
    return NextResponse.json({ error: "Already redeemed" }, { status: 400 });

  const updated = await prisma.voucher.update({
    where: { id: voucherId },
    data: { status: "redeemed" },
  });

  await prisma.activity.create({
    data: {
      beneficiaryId: session.id,
      message: `Voucher ${voucher.id} redeemed`,
    },
  });

  return NextResponse.json(updated);
}