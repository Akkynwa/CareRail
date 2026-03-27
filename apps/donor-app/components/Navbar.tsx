"use client";
import Link from "next/link";
import { Button } from "@carerail/ui";

export default function Navbar() {
  return (
    <nav className="h-14 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <Link href="/" className="font-bold text-xl">CareRail</Link>
      <div className="flex gap-4">
        <Link href="/dashboard"><Button variant="primary">Dashboard</Button></Link>
        <Link href="/donations/new"><Button variant="secondary">New Donation</Button></Link>
        <Link href="/qr/generate"><Button variant="outline">QR</Button></Link>
      </div>
    </nav>
  );
}