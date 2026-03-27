import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'vendor' && session.role !== 'beneficiary') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { qrCode, vendorId } = await request.json();

    if (!qrCode) {
      return NextResponse.json({ error: 'QR Code is required' }, { status: 400 });
    }

    // Find voucher
    const voucher = await prisma.voucher.findUnique({
      where: { qrCodeValue: qrCode },
      include: { wallet: true, beneficiary: true },
    });

    if (!voucher) {
      return NextResponse.json({ error: 'Voucher not found' }, { status: 404 });
    }

    // Check if already redeemed
    if (voucher.isRedeemed) {
      return NextResponse.json({ error: 'Voucher already redeemed' }, { status: 400 });
    }

    // Check expiration
    if (voucher.expiresAt && new Date() > voucher.expiresAt) {
      return NextResponse.json({ error: 'Voucher expired' }, { status: 400 });
    }

    // Check beneficiary authorization
    if (session.role === 'beneficiary' && session.userId !== voucher.beneficiaryId) {
      return NextResponse.json({ error: 'Unauthorized to redeem this voucher' }, { status: 403 });
    }

    // For vendor redemptions, initiate disbursement to vendor
    if (session.role === 'vendor') {
      if (!vendorId) {
        return NextResponse.json({ error: 'Vendor ID required for vendor redemption' }, { status: 400 });
      }

      // Call disbursement API to pay vendor
      const disbursementResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/payment/disburse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '', // Pass session cookies
        },
        body: JSON.stringify({
          voucherId: voucher.id,
          vendorId: vendorId
        })
      });

      if (!disbursementResponse.ok) {
        const errorData = await disbursementResponse.json();
        return NextResponse.json(
          { error: `Disbursement failed: ${errorData.error || 'Unknown error'}` },
          { status: disbursementResponse.status }
        );
      }

      const disbursementData = await disbursementResponse.json();

      return NextResponse.json({
        message: 'Voucher redeemed and disbursement initiated',
        voucher: {
          id: voucher.id,
          amount: voucher.amount,
          beneficiary: {
            id: voucher.beneficiary.id,
            name: voucher.beneficiary.fullName,
          },
        },
        disbursement: {
          reference: disbursementData.reference,
          status: disbursementData.status,
          vendor: disbursementData.vendor
        }
      });
    }

    // For beneficiary self-redemption (direct wallet update)
    // Update voucher as redeemed
    const updatedVoucher = await prisma.voucher.update({
      where: { id: voucher.id },
      data: { isRedeemed: true },
    });

    // Create redemption transaction
    await prisma.transaction.create({
      data: {
        beneficiaryId: voucher.beneficiaryId,
        voucherId: voucher.id,
        amount: voucher.amount,
        type: 'VOUCHER_REDEEMED',
      },
    });

    // Add to beneficiary wallet (for beneficiary self-redemption)
    await prisma.wallet.update({
      where: { id: voucher.walletId },
      data: { balance: voucher.wallet.balance + voucher.amount },
    });

    return NextResponse.json({
      message: 'Voucher redeemed successfully',
      voucher: {
        id: updatedVoucher.id,
        amount: updatedVoucher.amount,
        beneficiary: {
          id: voucher.beneficiary.id,
          name: voucher.beneficiary.fullName,
        },
      },
    });
  } catch (error) {
    console.error('Voucher redemption error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}