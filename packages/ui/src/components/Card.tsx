import React from "react";
import clsx from "clsx";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-gray-200 bg-white shadow-sm p-4 dark:bg-gray-900 dark:border-gray-700",
        className
      )}
    >
      {children}
    </div>
  );
}