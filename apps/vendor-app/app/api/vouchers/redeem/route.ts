import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { validateVendorSession } from "@/app/lib/auth";
import { triggerVoucherSSE } from "@/app/lib/sse";

export async function POST(req: Request) {
  const auth = await validateVendorSession(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();

    const voucher = await prisma.voucher.update({
      where: { id },
      data: { status: "REDEEMED" },
    });

    await prisma.vendorTransaction.create({
      data: {
        vendorId: auth.vendor.id,
        amount: voucher.amount,
        voucherCode: voucher.code,
      },
    });

    // SSE update
    triggerVoucherSSE(auth.vendor.id, {
      type: "voucher_redeemed",
      voucherId: voucher.id,
    });

    return NextResponse.json({ success: true, voucher });
  } catch (err) {
    return NextResponse.json({ error: "Redeem failed" }, { status: 500 });
  }
}