import { NextResponse } from "next/server";
import { validateVendorSession } from "@/app/lib/auth";

export async function GET(req: Request) {
  try {
    const auth = await validateVendorSession(req);

    if (!auth) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      vendor: auth.vendor,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}