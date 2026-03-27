import { NextResponse } from "next/server";
import { prisma } from "@carerail/db";
import { createVendorSession } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const vendor = await prisma.vendor.findUnique({
      where: { email },
    });

    if (!vendor || vendor.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await createVendorSession(vendor.id);

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        shopName: vendor.shopName,
        email: vendor.email,
      },
      token: session.token,
    });
  } catch (err) {
    return NextResponse.json({ error: "Signin failed" }, { status: 500 });
  }
}