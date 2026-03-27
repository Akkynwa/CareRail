import type { Metadata } from "next";
import "./globals.css"; // Ensure this file exists and contains @tailwind directives

export const metadata: Metadata = {
  title: "CareRail - Transparent Charitable Giving",
  description: "Connect donors with beneficiaries through secure, transparent digital vouchers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}