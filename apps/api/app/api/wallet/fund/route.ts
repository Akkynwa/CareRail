import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

/**
 * Fund wallet - add money to beneficiary wallet
 * Typically called after successful payment
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, method, reference } = await request.json();

    if (!amount || !method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (session.role !== 'beneficiary') {
      return NextResponse.json({ error: 'Only beneficiaries can fund wallets' }, { status: 403 });
    }

    // Get wallet
    const wallet = await prisma.wallet.findUnique({
      where: { beneficiaryId: session.userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: wallet.balance + amount },
    });

    // Create transaction record
    await prisma.transaction.create({
      data: {
        beneficiaryId: session.userId,
        amount,
        type: 'WALLET_FUNDED',
      },
    });

    return NextResponse.json(
      {
        message: 'Wallet funded successfully',
        wallet: {
          id: updatedWallet.id,
          balance: updatedWallet.balance,
          beneficiaryId: updatedWallet.beneficiaryId,
        },
        amountAdded: amount,
        method,
        reference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fund wallet error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}