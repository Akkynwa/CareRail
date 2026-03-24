// import { verifyBVN, createWallet } from "packages/core/interswitch";
// import { db } from "packages/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { bvn } = await req.json();
//   const result = await verifyBVN(bvn);

//   if (!result.verified) return NextResponse.json({ error: "Invalid BVN" });

//   const user = await db.user.create({
//     data: { email: bvn + "@test.com", role: "BENIFICIARY" }
//   });

//   const wallet = await createWallet(user.id);

//   await db.beneficiary.create({
//     data: { userId: user.id, bvn, walletId: wallet.walletId, verified: true }
//   });

//   return NextResponse.json({ success: true, wallet });
// }

import { NextResponse } from 'next/server';
import { db } from '@carerail/db'; // Your shared DB package
import { INTERSWITCH_CONFIG } from '@carerail/core'; // Your shared Core package

/**
 * POST /api/projects/create
 * Logic: Creates a new social impact project and initializes 
 * the Interswitch payment collection parameters.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, targetAmount, category, donorId } = body;

    // 1. Validation (Basic)
    if (!title || !targetAmount || !donorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Database Operation
    // We create the project record. In a real scenario, you'd also 
    // link this to an Interswitch "Merchant Reference" for tracking.
    const project = await db.project.create({
      data: {
        title,
        description,
        targetAmount,
        category, // e.g., "HEALTHCARE"
        donorId,
        status: 'OPEN',
      },
    });

    // 3. Interswitch Integration (Conceptual)
    // Here we would call the Interswitch API to get a 'Payment Link' 
    // or initialize a 'Web Checkout' session for this specific project.
    const paymentInitialization = {
      merchantId: INTERSWITCH_CONFIG.clientId,
      amount: targetAmount,
      transactionReference: `CR-${project.id}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`,
    };

    return NextResponse.json({
      message: 'Project created successfully',
      projectId: project.id,
      paymentData: paymentInitialization,
    }, { status: 201 });

  } catch (error) {
    console.error('PROJECT_CREATION_ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}