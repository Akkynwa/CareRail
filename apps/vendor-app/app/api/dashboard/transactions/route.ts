import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { validateVendorSession } from "@/app/lib/auth";

export async function GET(req: Request) {
  const auth = await validateVendorSession(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transactions = await prisma.vendorTransaction.findMany({
    where: { vendorId: auth.vendor.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(transactions);
}