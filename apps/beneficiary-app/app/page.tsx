'use client';
import { useState } from "react";

export default function Page() {
  const [bvn, setBvn] = useState("");

  async function verify() {
    const res = await fetch("/api/kyc/verify", {
      method: "POST",
      body: JSON.stringify({ bvn })
    });
    alert(await res.text());
  }

  return (
    <div>
      <h1>Beneficiary KYC</h1>
      <input value={bvn} onChange={e => setBvn(e.target.value)} />
      <button onClick={verify}>Verify</button>
    </div>
  );
}