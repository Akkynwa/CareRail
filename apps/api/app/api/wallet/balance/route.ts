import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'beneficiary') {
      return NextResponse.json({ error: 'Only beneficiaries can access wallet' }, { status: 403 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { beneficiaryId: session.userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    return NextResponse.json({
      beneficiaryId: wallet.beneficiaryId,
      balance: wallet.balance,
      createdAt: wallet.createdAt,
    });
  } catch (error) {
    console.error('Wallet balance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}