"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "@/hooks/useSession";
import { useBalance } from "@/hooks/useBalance";
import { useVouchers } from "@/hooks/useVouchers";
import { Wallet, Ticket, CheckCircle, LogOut, ArrowUpRight } from "lucide-react";

// Light-mode Glassmorphic Card
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const { user } = useSession();
  const { balance } = useBalance();
  const { vouchers } = useVouchers();

  return (
    <ProtectedRoute>
      {/* Soft color orbs for background depth */}
      <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-900">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]" />

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <Wallet size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">CareRail</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Beneficiary Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm font-medium text-slate-600">Hi, {user?.name}</span>
              <Link
                href="/signin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-bold"
              >
                <LogOut size={16} /> Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8">
          
          {/* Main Wallet Display */}
          <GlassCard className="p-8 bg-gradient-to-br from-green-500/90 to-green-600 shadow-xl shadow-green-200/50 text-white border-none">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Available Balance</p>
                <h2 className="text-5xl font-black tracking-tighter">
                  ₦{(balance / 100).toLocaleString()}
                </h2>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <ArrowUpRight size={24} />
              </div>
            </div>
            <p className="mt-6 text-sm font-medium bg-white/10 inline-block px-3 py-1 rounded-lg">
              Secure Digital Wallet
            </p>
          </GlassCard>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 flex items-center gap-4 hover:translate-y-[-4px] transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                <Ticket size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Available</p>
                <p className="text-2xl font-black text-slate-800">
                   {vouchers.filter((v: any) => !v.isRedeemed).length}
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex items-center gap-4 hover:translate-y-[-4px] transition-transform">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Redeemed</p>
                <p className="text-2xl font-black text-slate-800">
                   {vouchers.filter((v: any) => v.isRedeemed).length}
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex items-center gap-4 hover:translate-y-[-4px] transition-transform">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                <span className="font-bold text-lg">₦</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Lifetime Aid</p>
                <p className="text-2xl font-black text-slate-800">
                  ₦{(vouchers.reduce((sum: number, v: any) => sum + v.amount, 0) / 100).toLocaleString()}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Vouchers List */}
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight text-slate-800">Your Aid Vouchers</h2>
              <button className="text-sm font-bold text-green-600 hover:text-green-700">Refresh Feed</button>
            </div>

            {vouchers.length === 0 ? (
              <div className="text-center py-12">
                <Ticket size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">No vouchers found yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {vouchers.map((v: any) => (
                  <div
                    key={v.id}
                    className={`group p-5 rounded-2xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                      v.isRedeemed
                        ? "bg-slate-50/50 border-slate-100 grayscale opacity-70"
                        : "bg-white border-green-100 hover:shadow-lg hover:shadow-green-500/5 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                         v.isRedeemed ? "bg-slate-200 text-slate-500" : "bg-green-100 text-green-600"
                       }`}>
                         {v.purpose.charAt(0)}
                       </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{v.purpose}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 tracking-tighter">
                            {v.qrCodeValue}
                          </span>
                          <span className="text-xs text-slate-400">
                            • Expires {new Date(v.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900 leading-none mb-1">
                          ₦{(v.amount / 100).toLocaleString()}
                        </p>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                            v.isRedeemed ? "text-slate-400" : "text-green-600 bg-green-50"
                        }`}>
                          {v.isRedeemed ? "Redeemed" : "Ready to Use"}
                        </span>
                      </div>
                      {!v.isRedeemed && (
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors">
                           <ArrowUpRight size={18} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </main>
      </div>
    </ProtectedRoute>
  );
}