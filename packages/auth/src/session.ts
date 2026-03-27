import { cookies } from 'next/headers';
import { verifyJWT, JWTPayload } from './jwt';

export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('care_session')?.value;

    if (!token) return null;

    return verifyJWT(token);
  } catch (error) {
    return null;
  }
}

export async function getSessionFromRequest(request: Request): Promise<JWTPayload | null> {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').reduce((acc: any, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});

    const token = cookies.care_session;
    if (!token) return null;

    return verifyJWT(token);
  } catch (error) {
    return null;
  }
}

export async function setSession(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<void> {
  const { signJWT } = await import('./jwt');
  const token = await signJWT(payload);

  const cookieStore = await cookies();
  cookieStore.set('care_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('care_session');
}