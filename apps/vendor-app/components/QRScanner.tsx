"use client";

import { useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";

interface QRScannerProps {
  onScan: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function QRScanner({ onScan, isOpen, onClose }: QRScannerProps) {
  const [error, setError] = useState<string>("");

  const handleScan = useCallback(
    (result: any) => {
      if (result?.text) {
        onScan(result.text);
        onClose();
      }
    },
    [onScan, onClose]
  );

  const handleError = (err: any) => {
    setError(err?.message || "Error scanning QR code");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Scan Voucher QR Code</h2>

        <div className="mb-4">
          <QrReader
            onResult={handleScan}
            onError={handleError}
            constraints={{ facingMode: "environment" }}
            videoStyle={{ width: "100%" }}
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={onClose}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}