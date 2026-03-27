import React from "react";
import clsx from "clsx";

interface ErrorTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ErrorText({ children, className }: ErrorTextProps) {
  return (
    <p className={clsx("text-sm text-red-600", className)}>
      {children}
    </p>
  );
}