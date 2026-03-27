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
      return NextResponse.json({ error: 'Only beneficiaries can access wallet history' }, { status: 403 });
    }

    const limit = request.nextUrl.searchParams.get('limit') || '10';
    const skip = request.nextUrl.searchParams.get('skip') || '0';

    const transactions = await prisma.transaction.findMany({
      where: { beneficiaryId: session.userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(skip as string),
    });

    const total = await prisma.transaction.count({
      where: { beneficiaryId: session.userId },
    });

    return NextResponse.json({
      transactions: transactions.map((t) => ({
        id: t.id,
        amount: t.amount,
        type: t.type,
        createdAt: t.createdAt,
      })),
      total,
      limit: parseInt(limit as string),
      skip: parseInt(skip as string),
    });
  } catch (error) {
    console.error('Wallet history error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}