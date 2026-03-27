import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { validateVendorSession } from "@/app/lib/auth";

export async function GET(req: Request) {
  const auth = await validateVendorSession(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vouchers = await prisma.voucher.findMany({
    where: { vendorId: auth.vendor.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vouchers);
}