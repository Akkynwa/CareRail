"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "@/hooks/useSession";
import { useBalance } from "@/hooks/useBalance";
import { useVouchers } from "@/hooks/useVouchers";

export default function DashboardPage() {
  const { user } = useSession();
  const { balance } = useBalance();
  const { vouchers } = useVouchers();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-gray-600 text-sm">Manage your wallet and vouchers</p>
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Wallet Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <p className="text-5xl font-bold">₦{(balance / 100).toLocaleString()}</p>
            <p className="text-sm opacity-75 mt-4">Your digital wallet balance</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Available Vouchers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {vouchers.filter((v: any) => !v.isRedeemed).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Redeemed Vouchers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {vouchers.filter((v: any) => v.isRedeemed).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">Total Received</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₦{(
                  vouchers.reduce((sum: number, v: any) => sum + v.amount, 0) / 100
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Vouchers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Your Vouchers</h2>
            {vouchers.length === 0 ? (
              <p className="text-gray-600">No vouchers yet. When donors send you vouchers, they'll appear here.</p>
            ) : (
              <div className="space-y-4">
                {vouchers.map((v: any) => (
                  <div
                    key={v.id}
                    className={`p-4 border rounded-lg flex justify-between items-center ${
                      v.isRedeemed
                        ? "bg-gray-50 border-gray-300"
                        : "bg-green-50 border-green-300"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{v.purpose}</p>
                      <p className="text-sm text-gray-600">{v.qrCodeValue}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Expires: {new Date(v.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₦{(v.amount / 100).toLocaleString()}
                      </p>
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-2 ${
                          v.isRedeemed
                            ? "bg-gray-300 text-gray-800"
                            : "bg-green-300 text-green-800"
                        }`}
                      >
                        {v.isRedeemed ? "Redeemed" : "Available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}