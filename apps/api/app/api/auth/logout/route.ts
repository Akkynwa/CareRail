import { NextResponse } from 'next/server';
import { clearSession } from '@carerail/auth';

export async function POST() {
  await clearSession();
  return NextResponse.json({ message: 'Logged out' });
}