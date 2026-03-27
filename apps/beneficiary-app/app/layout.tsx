import "@carerail/ui/globals.css";
import "./globals.css"; // Ensure this file exists and contains @tailwind directives
import { SessionProvider } from "@carerail/ui";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}