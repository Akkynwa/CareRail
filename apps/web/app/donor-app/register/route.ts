// apps/api/src/app/api/donor/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, name } = data;

  const donor = await prisma.donor.upsert({
    where: { email },
    update: {},
    create: { email, name },
  });

  return NextResponse.json(donor);
}