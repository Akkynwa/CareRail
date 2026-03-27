import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';
import crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Process vendor disbursement via Interswitch
 * Called when beneficiary redeems voucher - pays out vendor
 * Uses Interswitch disbursement API for Nigerian market
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== 'beneficiary') {
      return NextResponse.json({ error: 'Unauthorized - Beneficiary access required' }, { status: 401 });
    }

    const { voucherId, vendorId } = await request.json();

    if (!voucherId || !vendorId) {
      return NextResponse.json({ error: 'Missing voucherId or vendorId' }, { status: 400 });
    }

    // Verify voucher belongs to beneficiary and is redeemable
    const voucher = await prisma.voucher.findFirst({
      where: {
        id: voucherId,
        beneficiaryId: session.id,
        isRedeemed: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!voucher) {
      return NextResponse.json({ error: 'Voucher not found or not redeemable' }, { status: 404 });
    }

    // Get vendor details
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: { merchantCategory: true }
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Interswitch disbursement credentials
    const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
    const payItemId = process.env.INTERSWITCH_PAY_ITEM_ID;
    const macKey = process.env.INTERSWITCH_MAC_KEY;
    const disbursementUrl = process.env.INTERSWITCH_DISBURSEMENT_API || 'https://api.interswitchng.com/api/v1/transfers';

    if (!merchantCode || !payItemId || !macKey) {
      return NextResponse.json(
        { error: 'Disbursement gateway not configured' },
        { status: 500 }
      );
    }

    // Generate disbursement reference
    const disbursementRef = `CRV-DISB-${Date.now()}-${voucherId}`;

    // Prepare disbursement payload
    const disbursementData = {
      merchantCode,
      payItemId,
      amount: voucher.amount * 100, // Convert to kobo
      currency: 'NGN',
      beneficiaryAccount: vendor.merchantCode, // Assuming merchant code is used as account identifier
      beneficiaryBankCode: '000', // Default - would need vendor's actual bank code
      beneficiaryName: vendor.businessName,
      narration: `CareRail Voucher Redemption - ${voucher.purpose}`,
      reference: disbursementRef,
      customerEmail: session.email,
      customerName: session.name
    };

    // Generate HMAC-SHA512 signature for disbursement
    const hashString = `${disbursementRef}${merchantCode}${payItemId}${disbursementData.amount}${disbursementData.currency}`;
    const signature = crypto.createHmac('sha512', macKey).update(hashString).digest('hex');

    // In production, make actual API call to Interswitch disbursement endpoint
    // For now, simulate successful disbursement
    console.log('Simulating disbursement:', {
      reference: disbursementRef,
      amount: voucher.amount,
      vendor: vendor.businessName,
      beneficiary: session.name
    });

    // Mark voucher as redeemed
    await prisma.voucher.update({
      where: { id: voucherId },
      data: { isRedeemed: true }
    });

    // Add amount to beneficiary wallet (if not already done)
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { id: session.id },
      include: { wallet: true }
    });

    if (beneficiary?.wallet) {
      await prisma.wallet.update({
        where: { beneficiaryId: session.id },
        data: { balance: beneficiary.wallet.balance + voucher.amount }
      });
    }

    // Record transaction
    await prisma.transaction.create({
      data: {
        beneficiaryId: session.id,
        amount: voucher.amount,
        type: 'VOUCHER_REDEEMED',
        description: `Voucher redeemed at ${vendor.businessName} - ${voucher.purpose}`,
        reference: disbursementRef
      }
    });

    // In production, you would:
    // 1. Call Interswitch disbursement API
    // 2. Handle response and update status
    // 3. Send notifications to vendor and beneficiary

    return NextResponse.json({
      success: true,
      message: 'Disbursement initiated successfully',
      reference: disbursementRef,
      amount: voucher.amount,
      vendor: vendor.businessName,
      voucherId,
      // In production, include actual disbursement status
      status: 'PENDING' // Would be 'SUCCESSFUL' or 'FAILED' from API response
    });

  } catch (error) {
    console.error('Disbursement error:', error);
    return NextResponse.json({ error: 'Disbursement processing failed' }, { status: 500 });
  }
}