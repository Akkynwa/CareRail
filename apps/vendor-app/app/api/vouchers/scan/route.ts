import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  try {
    const { qrData } = await req.json();

    const voucher = await prisma.voucher.findUnique({
      where: { code: qrData },
    });

    if (!voucher) {
      return NextResponse.json({ valid: false }, { status: 404 });
    }

    return NextResponse.json({ valid: true, voucher });
  } catch (err) {
    return NextResponse.json({ error: "Invalid scan" }, { status: 500 });
  }
}