import { NextRequest, NextResponse } from 'next/server';
import { setSession, verifyPassword } from '@carerail/auth';
import { PrismaClient } from '@carerail/db';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let user = null;

    switch (role) {
      case 'donor':
        user = await prisma.donor.findUnique({ where: { email } });
        if (user && user.password) {
          const isValid = await verifyPassword(password, user.password);
          if (!isValid) user = null;
        }
        break;
      case 'beneficiary':
        user = await prisma.beneficiary.findUnique({ where: { phone: email } });
        if (user && user.password) {
          const isValid = await verifyPassword(password, user.password);
          if (!isValid) user = null;
        }
        break;
      case 'vendor':
        user = await prisma.vendor.findUnique({ where: { merchantCode: email } });
        if (user && user.password) {
          const isValid = await verifyPassword(password, user.password);
          if (!isValid) user = null;
        }
        break;
      case 'admin':
        if (email === 'admin@carerail.com' && password === 'admin123') {
          user = { id: 'admin-1', email: 'admin@carerail.com', name: 'Admin' };
        }
        break;
      default:
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await setSession({
      userId: user.id,
      email: user.email || email,
      role: role as any,
    });

    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}