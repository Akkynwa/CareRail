"use client";

import { createContext, ReactNode } from "react";

export const SSEContext = createContext<null | { connect: () => void }>(null);

export function SSEProvider({ children }: { children: ReactNode }) {
  return (
    <SSEContext.Provider value={null}>
      {children}
    </SSEContext.Provider>
  );
}