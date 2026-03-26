// apps/api/src/app/api/beneficiary/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  const data = await req.json();
  const { fullName, bvn, nin, phone } = data;

  const beneficiary = await prisma.beneficiary.create({
    data: {
      fullName,
      bvn,
      nin,
      phone,
      wallet: { create: {} },
    },
    include: {
      wallet: true,
    },
  });

  return NextResponse.json(beneficiary);
}