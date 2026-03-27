import "@carerail/ui/globals.css";
import "./globals.css"; // Ensure this file exists and contains @tailwind directives
import { SessionProvider } from "@carerail/ui";
import { SSEProvider } from "@carerail/ui";

export const metadata = {
  title: "Vendor Dashboard – Carerail",
  description: "Vendor voucher redemption dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          <SSEProvider>{children}</SSEProvider>
        </SessionProvider>
      </body>
    </html>
  );
}