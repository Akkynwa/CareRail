"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type Donor = {
  id: string;
  name?: string;
  email: string;
};

type DonorContextType = {
  donor: Donor | null;
  setDonor: (donor: Donor | null) => void;
};

const DonorContext = createContext<DonorContextType | undefined>(undefined);

export function DonorProvider({ children }: { children: ReactNode }) {
  const [donor, setDonor] = useState<Donor | null>(null);

  // Optional: load donor from localStorage on page load
  useEffect(() => {
    const saved = localStorage.getItem("donor");
    if (saved) setDonor(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (donor) localStorage.setItem("donor", JSON.stringify(donor));
    else localStorage.removeItem("donor");
  }, [donor]);

  return <DonorContext.Provider value={{ donor, setDonor }}>{children}</DonorContext.Provider>;
}

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context) throw new Error("useDonor must be used within DonorProvider");
  return context;
}