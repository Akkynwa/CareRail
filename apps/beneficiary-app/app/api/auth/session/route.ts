import { NextResponse } from "next/server";
import { authFromHeader } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = authFromHeader(req);
  if (!session) return NextResponse.json({ user: null });

  const user = await prisma.beneficiary.findUnique({
    where: { id: session.id },
  });

  return NextResponse.json({ user });
}