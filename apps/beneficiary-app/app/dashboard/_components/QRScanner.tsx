"use client";

import { useState } from "react";

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");

  const startScanner = () => {
    setScanning(true);
    setResult("Scanning started… (connect real scanner here)");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
      <h2 className="text-lg font-semibold">Scan Voucher</h2>

      {!scanning && (
        <button
          onClick={startScanner}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Start Scanner
        </button>
      )}

      {scanning && (
        <div className="text-sm text-gray-700">{result}</div>
      )}
    </div>
  );
}