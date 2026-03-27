import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

function generateQRCode(): string {
  const prefix = process.env.QR_VOUCHER_PREFIX || 'CRVCHR';
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `${prefix}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'donor') {
      return NextResponse.json({ error: 'Only donors can create vouchers' }, { status: 403 });
    }

    const { amount, purpose, beneficiaryPhone } = await request.json();

    if (!amount || !purpose || !beneficiaryPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find beneficiary
    const beneficiary = await prisma.beneficiary.findUnique({
      where: { phone: beneficiaryPhone },
      include: { wallet: true },
    });

    if (!beneficiary) {
      return NextResponse.json({ error: 'Beneficiary not found' }, { status: 404 });
    }

    if (!beneficiary.wallet) {
      return NextResponse.json({ error: 'Beneficiary wallet not found' }, { status: 404 });
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        donorId: session.userId,
        amount,
        purpose,
      },
    });

    // Create voucher
    const qrCode = generateQRCode();
    const expiryMinutes = parseInt(process.env.QR_CODE_EXPIRY_MINUTES || '30');

    const voucher = await prisma.voucher.create({
      data: {
        walletId: beneficiary.wallet.id,
        beneficiaryId: beneficiary.id,
        amount,
        purpose,
        qrCodeValue: qrCode,
        expiresAt: new Date(Date.now() + expiryMinutes * 60 * 1000),
      },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        donorId: session.userId,
        beneficiaryId: beneficiary.id,
        voucherId: voucher.id,
        amount,
        type: 'VOUCHER_ISSUED',
      },
    });

    return NextResponse.json(
      {
        message: 'Voucher created successfully',
        voucher: {
          id: voucher.id,
          qrCode: voucher.qrCodeValue,
          amount: voucher.amount,
          purpose: voucher.purpose,
          expiresAt: voucher.expiresAt,
          beneficiary: {
            id: beneficiary.id,
            name: beneficiary.fullName,
            phone: beneficiary.phone,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Voucher creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}