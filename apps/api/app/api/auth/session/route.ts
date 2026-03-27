import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    
    if (!session) {
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}