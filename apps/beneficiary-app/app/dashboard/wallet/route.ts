import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authFromHeader } from "@/lib/auth";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallet = await prisma.beneficiaryBalance.findUnique({
    where: { beneficiaryId: session.id }
  });

  return NextResponse.json(wallet || { amount: 0 });
}