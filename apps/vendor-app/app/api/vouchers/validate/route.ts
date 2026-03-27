import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const voucher = await prisma.voucher.findUnique({
      where: { code },
    });

    if (!voucher)
      return NextResponse.json({ valid: false });

    return NextResponse.json({ valid: true, voucher });
  } catch {
    return NextResponse.json({ valid: false });
  }
}