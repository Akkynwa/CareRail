"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { QRScanner } from "@/components/QRScanner";
import { useVendorStats } from "@/hooks/useVendorStats";
import { useVouchers } from "@/hooks/useVouchers";
import { useTransactions } from "@/hooks/useTransactions";

export default function DashboardPage() {
  const { stats } = useVendorStats();
  const { vouchers } = useVouchers();
  const { transactions } = useTransactions();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemError, setRedeemError] = useState("");
  const [redeemSuccess, setRedeemSuccess] = useState("");

  async function handleQRScan(data: string) {
    setScannedCode(data);
    setRedeemLoading(true);
    setRedeemError("");
    setRedeemSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/vouchers/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ qrCode: data }),
      });

      const result = await res.json();
      if (!res.ok) {
        setRedeemError(result.error || "Failed to redeem voucher");
        return;
      }

      setRedeemSuccess(`Voucher redeemed! ₦${result.voucher.amount / 100}`);
      setTimeout(() => setRedeemSuccess(""), 5000);
    } catch (err) {
      setRedeemError("Error redeeming voucher");
    } finally {
      setRedeemLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
              <Link
                href="/signin"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* QR Scanner Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
            <h2 className="text-2xl font-bold mb-4">Scan Voucher</h2>
            <p className="text-gray-600 mb-6">
              Scan customer vouchers using your device camera to process redemptions instantly.
            </p>
            <button
              onClick={() => setScannerOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              📱 Open Scanner
            </button>
          </div>

          {/* Scanned Code Display */}
          {scannedCode && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Latest Scan</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono">
                {scannedCode}
              </div>

              {redeemError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-600">{redeemError}</p>
                </div>
              )}

              {redeemSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 font-semibold">{redeemSuccess}</p>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₦{(stats.totalRevenue / 100).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTransactions}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Active Vouchers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeVouchers}</p>
            </div>
          </div>

          {/* Recent Vouchers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Vouchers</h2>
            <div className="space-y-3">
              {vouchers.map((v: any) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{v.beneficiaryName}</p>
                    <p className="text-sm text-gray-600">{v.qrCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₦{(v.amount / 100).toLocaleString()}</p>
                    <p className="text-sm text-gray-600 capitalize">{v.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((t: any) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{t.beneficiaryName}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+₦{(t.amount / 100).toLocaleString()}</p>
                    <p className="text-sm text-gray-600 capitalize">{t.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* QR Scanner Modal */}
        <QRScanner
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onScan={handleQRScan}
        />
      </div>
    </ProtectedRoute>
  );
}