import React from "react";
import Link from "next/link";
import clsx from "clsx";

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={clsx(
        "w-64 border-r h-full p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800",
        className
      )}
    >
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="font-medium hover:text-blue-600">
          Overview
        </Link>
        <Link href="/dashboard/transactions" className="hover:text-blue-600">
          Transactions
        </Link>
        <Link href="/dashboard/beneficiaries" className="hover:text-blue-600">
          Beneficiaries
        </Link>
        <Link href="/dashboard/vendors" className="hover:text-blue-600">
          Vendors
        </Link>
        <Link href="/dashboard/settings" className="hover:text-blue-600">
          Settings
        </Link>
      </nav>
    </aside>
  );
}