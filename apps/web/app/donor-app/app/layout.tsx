import "../globals.css";
import { ReactNode } from "react";
import { DashboardShell } from "@carerail/ui/components/DashboardShell";
import { DonorProvider } from "../context/DonorContext";

export const metadata = {
  title: "CareRail Donor Dashboard",
  description: "Donor dashboard for CareRail",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DonorProvider>
          <DashboardShell>{children}</DashboardShell>
        </DonorProvider>
      </body>
    </html>
  );
}