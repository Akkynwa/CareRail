"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "@/hooks/useSession";

export default function DashboardPage() {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFundForm, setShowFundForm] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    purpose: "",
    beneficiaryPhone: "",
  });
  const [fundForm, setFundForm] = useState({
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [funding, setFunding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");

  // Handle payment callback messages
  useEffect(() => {
    const payment = searchParams.get('payment');
    const ref = searchParams.get('ref');
    const amount = searchParams.get('amount');
    const code = searchParams.get('code');

    if (payment === 'success') {
      setPaymentMessage(`✅ Payment successful! ₦${amount} has been added to your wallet. Reference: ${ref}`);
    } else if (payment === 'failed') {
      setPaymentMessage(`❌ Payment failed. Error code: ${code}. Reference: ${ref}`);
    }

    // Clear URL params after showing message
    if (payment) {
      setTimeout(() => {
        router.replace('/dashboard');
      }, 5000);
    }
  }, [searchParams, router]);

  async function handleCreateVoucher(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/vouchers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: parseInt(form.amount) * 100,
          purpose: form.purpose,
          beneficiaryPhone: form.beneficiaryPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create voucher");
        return;
      }

      // Generate QR code
      const qrDataUrl = await QRCode.toDataURL(data.voucher.qrCode, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      setGeneratedQR(qrDataUrl);
      setSuccess(
        `Voucher created! ₦${data.voucher.amount / 100} for ${
          data.voucher.beneficiary.name
        }`
      );
      setForm({ amount: "", purpose: "", beneficiaryPhone: "" });
    } catch (err) {
      setError("Error creating voucher");
    } finally {
      setLoading(false);
    }
  }

  async function handleFundWallet(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFunding(true);

    try {
      const res = await fetch("http://localhost:4000/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: parseFloat(fundForm.amount),
          description: fundForm.description || "Wallet funding",
          email: user?.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to initiate payment");
        return;
      }

      // Redirect to Interswitch payment page
      window.location.href = data.paymentUrl;

    } catch (err) {
      setError("Error initiating payment");
    } finally {
      setFunding(false);
    }
  }

  return (
    <ProtectedRoute requiredRole="donor">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-gray-600 text-sm">Create and distribute charitable donations</p>
              </div>
              <Link
                href="/signin"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Payment Status Message */}
        {paymentMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-semibold">{paymentMessage}</p>
          </div>
        )}

        {/* Wallet Funding Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Fund Your Wallet</h2>
              <p className="text-gray-600 text-sm">Add money to create more vouchers</p>
            </div>
            {!showFundForm && (
              <button
                onClick={() => setShowFundForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                + Add Funds
              </button>
            )}
          </div>

          {showFundForm && (
            <form onSubmit={handleFundWallet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={fundForm.amount}
                  onChange={(e) => setFundForm({ ...fundForm, amount: e.target.value })}
                  placeholder="1000.00"
                  step="0.01"
                  min="100"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={fundForm.description}
                  onChange={(e) => setFundForm({ ...fundForm, description: e.target.value })}
                  placeholder="e.g., Monthly donation budget"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={funding}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold transition"
                >
                  {funding ? "Processing..." : "Pay with Card"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFundForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Total Donations</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">₦120,000</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Redeemed Vouchers</p>
              <p className="text-4xl font-bold text-green-600 mt-2">₦75,000</p>
            </div>
          </div>

          {/* Create Voucher Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create Donation Voucher</h2>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  + New Voucher
                </button>
              )}
            </div>

            {showCreateForm && (
              <form onSubmit={handleCreateVoucher} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficiary Phone
                  </label>
                  <input
                    type="tel"
                    value={form.beneficiaryPhone}
                    onChange={(e) =>
                      setForm({ ...form, beneficiaryPhone: e.target.value })
                    }
                    placeholder="+234XXXXXXXXXX"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="50.00"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={form.purpose}
                    onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                    placeholder="e.g., Food Assistance"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 font-semibold">{success}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold transition"
                  >
                    {loading ? "Creating..." : "Create Voucher"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Generated QR Code Display */}
            {generatedQR && (
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-bold mb-4">Voucher QR Code</h3>
                <div className="flex flex-col items-center justify-center">
                  <img src={generatedQR} alt="Voucher QR Code" className="mb-4" />
                  <a
                    href={generatedQR}
                    download="voucher.png"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Download QR Code
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Impact Feed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-900">Voucher Redeemed</p>
                <p className="text-sm text-gray-600">
                  John Doe redeemed ₦50 at Quick Bites Restaurant
                </p>
                <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-900">Voucher Created</p>
                <p className="text-sm text-gray-600">
                  You created a ₦100 voucher for Jane Smith
                </p>
                <p className="text-xs text-gray-500 mt-2">5 hours ago</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}