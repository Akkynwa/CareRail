  "use client";
import React, { useState } from "react";
import QRCodeDisplay from "@carerail/components/QRCodeDisplay";
import { Input, Button } from "@carerail/ui/components";
import { useDonor } from "../../context/DonorContext";
import toast from "react-hot-toast";

export default function GenerateQRPage() {
  const { donor } = useDonor();
  const [purpose, setPurpose] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = async () => {
    if (!donor) return toast.error("Sign in first");
    try {
      const res = await fetch("/api/voucher/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletId: donor.id, amount: 0, purpose }), // amount can be dynamic
      });
      const data = await res.json();
      setQrValue(data.qrCodeValue);
      toast.success("QR Voucher generated!");
    } catch {
      toast.error("Failed to generate QR");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Generate QR Voucher</h1>
      <Input
        placeholder="Enter purpose or wallet ID"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
      <Button onClick={handleGenerate}>Generate QR</Button>
      {qrValue && <QRCodeDisplay value={qrValue} />}
    </div>
  );
}