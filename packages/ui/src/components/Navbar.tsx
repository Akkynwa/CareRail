"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";

export function Navbar() {
  return (
    <nav className="h-14 border-b flex items-center px-6 justify-between bg-white dark:bg-gray-900 dark:border-gray-800">
      <Link href="/" className="text-xl font-bold">
        CareRail
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="primary">Dashboard</Button>
        </Link>
        <Link href="/logout">
          <Button variant="outline">Logout</Button>
        </Link>
      </div>
    </nav>
  );
}