"use client";

import QRScanner from "../_components/QRScanner";

export default function ScanPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Voucher</h1>
      <QRScanner />
    </div>
  );
}