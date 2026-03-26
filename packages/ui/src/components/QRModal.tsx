"use client";

import React from "react";
import { Button } from "./Button";

export function QRModal({
  qr,
  onScan,
}: {
  qr?: string;
  onScan?: (data: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show QR</Button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {qr && (
              <img
                src={qr}
                alt="QR Code"
                className="w-full h-auto mx-auto"
              />
            )}

            {onScan && (
              <Button className="mt-4 w-full" onClick={() => onScan("sample")}>
                Scan QR
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}