import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vouchers = await prisma.voucher.findMany({
    where: { beneficiaryId: session.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return NextResponse.json(vouchers);
}