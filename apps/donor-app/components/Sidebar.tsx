"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800 p-4 flex flex-col gap-3">
      <Link href="/dashboard" className="hover:text-blue-600 font-medium">Overview</Link>
      <Link href="/dashboard/transactions" className="hover:text-blue-600">Transactions</Link>
      <Link href="/dashboard/beneficiaries" className="hover:text-blue-600">Beneficiaries</Link>
      <Link href="/dashboard/vendors" className="hover:text-blue-600">Vendors</Link>
      <Link href="/dashboard/settings" className="hover:text-blue-600">Settings</Link>
    </aside>
  );
}