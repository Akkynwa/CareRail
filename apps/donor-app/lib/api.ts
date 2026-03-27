export async function fetchDonorSummary(donorId: string) {
  const res = await fetch(`/api/donor/summary?donorId=${donorId}`);
  return res.json();
}

export async function createVoucher(walletId: string, amount: number, purpose: string) {
  const res = await fetch("/api/voucher/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletId, amount, purpose }),
  });
  return res.json();
}