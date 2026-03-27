import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const exists = await prisma.vendor.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      return NextResponse.json({ error: "Vendor already exists" }, { status: 400 });
    }

    const vendor = await prisma.vendor.create({
      data: {
        email: data.email,
        password: data.password,
        shopName: data.shopName,
        phone: data.phone,
      },
    });

    return NextResponse.json({ success: true, vendor });
  } catch (err) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}