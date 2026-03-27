import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './jwt';

export async function authMiddleware(request: NextRequest, allowedRoles?: string[]) {
  const token = request.cookies.get('care_session')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Add user to request headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-user-id', payload.userId);
  response.headers.set('x-user-role', payload.role);
  response.headers.set('x-user-email', payload.email);

  return response;
}