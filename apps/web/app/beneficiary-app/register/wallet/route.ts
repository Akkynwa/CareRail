// apps/api/src/app/api/beneficiary/wallet/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const wallet = await prisma.wallet.findUnique({
    where: { beneficiaryId: id || "" },
    include: {
      vouchers: {
        where: { isRedeemed: false },
      },
    },
  });

  return NextResponse.json(wallet);
}