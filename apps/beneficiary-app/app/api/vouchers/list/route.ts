import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json([], { status: 401 });

  const vouchers = await prisma.voucher.findMany({
    where: { beneficiaryId: session.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vouchers);
}