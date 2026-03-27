// apps/beneficiary-app/providers/SessionProvider.tsx
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { fetchSession } from "../lib/auth";

interface Session {
  id: string;
  email: string;
  name: string;
}

export const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function load() {
      const s = await fetchSession();
      setSession(s);
    }
    load();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}