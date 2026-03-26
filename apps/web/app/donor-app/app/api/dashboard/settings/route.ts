import { prisma } from "@carerail/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const data = await req.json();
  const { donorId, email, name } = data;

  if (!donorId) return NextResponse.json({ error: "Missing donorId" }, { status: 400 });

  const updated = await prisma.donor.update({
    where: { id: donorId },
    data: { email, name },
  });

  return NextResponse.json(updated);
}