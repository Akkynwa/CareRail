"use client";

import React, { useState } from "react";
import { Input, Button } from "@carerail/ui/components";
import { toast } from "react-hot-toast";

export default function NewDonationPage() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/voucher/create", {
        method: "POST",
        body: JSON.stringify({ walletId: "sample-wallet", amount: Number(amount), purpose }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      toast.success("Voucher created!");
      console.log(data);
    } catch (err) {
      toast.error("Failed to create voucher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Donation / Voucher</h1>
      <div className="flex flex-col gap-3">
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Purpose (e.g., Fertilizer, Healthcare)"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Voucher"}
        </Button>
      </div>
    </div>
  );
}