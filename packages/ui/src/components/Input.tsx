import React from "react";
import clsx from "clsx";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
}