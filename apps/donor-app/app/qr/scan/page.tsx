"use client";

import React, { useState } from "react";
import Scanner from "./Scanner";
import { Card } from "@carerail/ui/components";

export default function QRScanPage() {
  const [scanned, setScanned] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scan QR</h1>
      <Card>
        <Scanner onScan={(data) => setScanned(data)} />
      </Card>
      {scanned && <p className="mt-4 text-green-600">Scanned Data: {scanned}</p>}
    </div>
  );
}