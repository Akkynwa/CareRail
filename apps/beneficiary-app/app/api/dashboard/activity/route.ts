import { NextResponse } from "next/server";
import { authFromHeader } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json([], { status: 401 });

  const logs = await prisma.activity.findMany({
    where: { beneficiaryId: session.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(logs);
}