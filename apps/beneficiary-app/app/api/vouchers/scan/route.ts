import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { qrCode } = await req.json();

  const voucher = await prisma.voucher.findUnique({
    where: { qrCode },
  });

  if (!voucher)
    return NextResponse.json({ error: "Invalid QR code" }, { status: 404 });

  return NextResponse.json(voucher);
}