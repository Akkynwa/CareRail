"use client";
import { ReactNode } from "react";
import clsx from "clsx";

export default function GlassContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 rounded-xl p-4",
        className
      )}
    >
      {children}
    </div>
  );
}