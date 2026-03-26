// apps/api/src/app/api/vendor/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const merchantCode = searchParams.get("merchantCode");

  const vendor = await prisma.vendor.findUnique({
    where: { merchantCode: merchantCode || "" },
    include: { category: true },
  });

  if (!vendor)
    return NextResponse.json({ valid: false }, { status: 404 });

  return NextResponse.json({
    valid: true,
    vendor,
  });
}