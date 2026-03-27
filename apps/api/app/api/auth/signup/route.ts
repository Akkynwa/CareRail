import { NextRequest, NextResponse } from 'next/server';
import { setSession, hashPassword } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, phone, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    let user = null;

    switch (role) {
      case 'donor':
        // Check if donor already exists
        const existingDonor = await prisma.donor.findUnique({ where: { email } });
        if (existingDonor) {
          return NextResponse.json({ error: 'Donor already exists' }, { status: 409 });
        }

        user = await prisma.donor.create({
          data: {
            email,
            name: fullName,
            password: hashedPassword,
          },
        });
        break;

      case 'beneficiary':
        if (!phone) {
          return NextResponse.json({ error: 'Phone is required for beneficiaries' }, { status: 400 });
        }

        const existingBeneficiary = await prisma.beneficiary.findUnique({ where: { phone } });
        if (existingBeneficiary) {
          return NextResponse.json({ error: 'Beneficiary already exists' }, { status: 409 });
        }

        user = await prisma.beneficiary.create({
          data: {
            fullName: fullName || 'User',
            phone,
            password: hashedPassword,
            wallet: {
              create: {
                balance: 0,
              },
            },
          },
        });
        break;

      case 'vendor':
        // Vendor signup - admin approval needed
        return NextResponse.json(
          { error: 'Vendor signup requires admin approval' },
          { status: 403 }
        );

      default:
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }

    // Create session
    await setSession({
      userId: user.id,
      email: user.email || email,
      role: role as any,
    });

    return NextResponse.json({ message: 'Signup successful', user }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}