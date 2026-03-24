// import { db } from "packages/db";
// import { transferFunds } from "packages/core/interswitch";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { voucher } = await req.json();
//   const v = await db.voucher.findUnique({ where: { id: voucher } });

//   if (!v) return NextResponse.json({ error: "Invalid voucher" });

//   const payment = await transferFunds(v.amount);

//   await db.transaction.create({
//     data: { voucherId: v.id, vendorId: "vendor1", amount: v.amount }
//   });

//   return NextResponse.json({ success: true, payment });
// }

import { NextResponse } from 'next/server';
import { db } from '@carerail/db'; // Shared DB
import { getInterswitchAuthToken } from '@carerail/core'; // Shared Auth Helper

/**
 * POST /api/redeem
 * Logic: Validates the QR code voucher and triggers the Interswitch transfer.
 */
export async function POST(request: Request) {
  const { voucherId, vendorId, amount } = await request.json();

  // 1. Transactional check
  // We use a transaction to ensure we don't double-spend the voucher
  const result = await db.$transaction(async (tx) => {
    const voucher = await tx.voucher.findUnique({
      where: { id: voucherId },
    });

    if (!voucher || voucher.isRedeemed) {
      throw new Error('Voucher invalid or already redeemed');
    }

    // 2. Mark as redeemed immediately
    await tx.voucher.update({
      where: { id: voucherId },
      data: { isRedeemed: true },
    });

    return voucher;
  });

  // 3. Trigger Interswitch Payout
  // This is the "Senior" step: moving funds from the escrow to the Vendor
  const token = await getInterswitchAuthToken();
  
  // Hypothetical call to Interswitch Transfer API
  const transferResponse = await fetch('https://sandbox.interswitchng.com/api/v2/transfer', {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amount,
      destinationAccount: vendorId, // The vendor's bank account
      narration: `CareRail Redemption for Voucher ${voucherId}`
    }),
  });

  if (!transferResponse.ok) {
    throw new Error('Interswitch Transfer failed');
  }

  return NextResponse.json({ message: 'Redemption successful', status: 'PAID' });
}