"use client";

import { ReactNode } from "react";
import { SessionProvider } from "./SessionProvider";
import { SSEProvider } from "./SSEProvider";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SSEProvider>
        {children}
      </SSEProvider>
    </SessionProvider>
  );
}