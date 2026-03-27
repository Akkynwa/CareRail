// apps/beneficiary-app/lib/auth.ts
import { cookies } from "next/headers";

export async function getSession() {
  const cookie = (await cookies()).get("care_session");
  if (!cookie) return null;

  try {
    return JSON.parse(atob(cookie.value));
  } catch {
    return null;
  }
}

export async function fetchSession() {
  // Mock session for example
  return {
    id: "beneficiary-1",
    email: "john.doe@example.com",
    name: "John Doe",
  };
}