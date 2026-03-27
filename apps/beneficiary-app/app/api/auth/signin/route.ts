import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash, compare } from "bcryptjs";
import { signJwt } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.beneficiary.findUnique({
    where: { email },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await compare(password, user.password);
  if (!isValid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({ id: user.id, role: "beneficiary" });

  return NextResponse.json({ token, user });
}