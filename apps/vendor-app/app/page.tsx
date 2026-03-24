'use client';
import { useState } from "react";

export default function Page() {
  const [voucher, setVoucher] = useState("");

  async function redeem() {
    const res = await fetch("/api/redeem", {
      method: "POST",
      body: JSON.stringify({ voucher })
    });
    alert(await res.text());
  }

  return (
    <div>
      <h1>Vendor App</h1>
      <input value={voucher} onChange={e => setVoucher(e.target.value)} />
      <button onClick={redeem}>Redeem</button>
    </div>
  );
}