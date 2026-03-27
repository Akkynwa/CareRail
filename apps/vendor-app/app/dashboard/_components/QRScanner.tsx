"use client";

import { useState } from "react";
import { api } from "../../../lib/api";

export default function QRScanner() {
  const [result, setResult] = useState("");

  const handleScan = async () => {
    const code = prompt("Enter QR code value for simulation:");
    if (!code) return;

    const res = await api.vouchers.validate({ code });
    setResult(res.message);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-sm">
      <button
        onClick={handleScan}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Start Scan
      </button>

      {result && <p className="font-semibold">{result}</p>}
    </div>
  );
}