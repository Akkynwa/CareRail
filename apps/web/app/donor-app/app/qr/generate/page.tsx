"use client";

import React, { useState } from "react";
import { QRModal } from "@carerail/ui/components/QRModal";
import { Input, Button } from "@carerail/ui/components";

export default function GenerateQRPage() {
  const [value, setValue] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    setQrValue(value || "default-qr-value");
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Generate QR</h1>
      <Input placeholder="Enter purpose or wallet ID" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleGenerate}>Generate QR</Button>
      {qrValue && <QRModal qr={qrValue} />}
    </div>
  );
}