import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { signJwt } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const exists = await prisma.beneficiary.findUnique({ where: { email } });
  if (exists)
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });

  const hashed = await hash(password, 10);

  const user = await prisma.beneficiary.create({
    data: { name, email, password: hashed },
  });

  const token = signJwt({ id: user.id });

  return NextResponse.json({ token, user });
}