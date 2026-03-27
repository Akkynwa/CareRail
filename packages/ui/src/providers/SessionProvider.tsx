"use client";

import { createContext, useContext, ReactNode } from "react";

export interface Session {
  id: string;
  email: string;
  name: string;
}

export const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  // For now, this is null. Later you will fetch the real session here.
  const session: Session | null = null; 

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

// ADD THIS EXPORT: This is what ProtectedRoute.tsx is looking for
export const useSession = () => {
  const context = useContext(SessionContext);
  return context;
};