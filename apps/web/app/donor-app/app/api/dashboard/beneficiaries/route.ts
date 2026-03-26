import { prisma } from "@carerail/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const donorId = searchParams.get("donorId");

  if (!donorId) return NextResponse.json({ error: "Missing donorId" }, { status: 400 });

  const beneficiaries = await prisma.transaction.findMany({
    where: { donorId, type: "VOUCHER_ISSUED" },
    select: { beneficiary: true },
    distinct: ["beneficiaryId"],
  });

  return NextResponse.json(beneficiaries.map(b => b.beneficiary));
}