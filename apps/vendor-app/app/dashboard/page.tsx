"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  QrCode, TrendingUp, History, LogOut, ShieldCheck, 
  Zap, ArrowUpRight, Maximize, AlertCircle, X, CheckCircle2 
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { QRScanner } from "@/components/QRScanner";
import { useVendorStats } from "@/hooks/useVendorStats";
import { useVouchers } from "@/hooks/useVouchers";
import { useTransactions } from "@/hooks/useTransactions";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(79,70,229,0.04)] ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const { stats, refreshStats } = useVendorStats();
  const { vouchers, refreshVouchers } = useVouchers();
  const { transactions, refreshTransactions } = useTransactions();
  
  const [scannerOpen, setScannerOpen] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [lastScan, setLastScan] = useState<{ success: boolean; message: string; code: string } | null>(null);

  async function handleQRScan(data: string) {
    setScannerOpen(false);
    setRedeemLoading(true);
    setLastScan(null);

    try {
      const res = await api.vendor.redeemVoucher({ qrCode: data });
      
      if (res.success) {
        setLastScan({ success: true, message: `Redeemed ₦${(res.amount / 100).toLocaleString()}`, code: data });
        toast.success("Voucher Redeemed!");
        // Refresh all data streams
        refreshStats();
        refreshVouchers();
        refreshTransactions();
      } else {
        setLastScan({ success: false, message: res.message || "Invalid Voucher", code: data });
      }
    } catch (err) {
      setLastScan({ success: false, message: "Network error during redemption", code: data });
    } finally {
      setRedeemLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#fcfdfe] relative overflow-hidden font-sans text-slate-900 pb-12">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-violet-50/50 rounded-full blur-[80px]" />

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">CareRail</h1>
                <p className="text-[9px] uppercase tracking-[0.2em] text-indigo-500 font-black">Merchant Terminal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/settings" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Settings</Link>
               <Link href="/signin" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all text-xs font-bold shadow-lg shadow-slate-200">
                <LogOut size={14} /> Logout
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Action: Scanner Trigger */}
            <GlassCard className="lg:col-span-2 p-10 flex flex-col justify-between relative overflow-hidden group border-indigo-50/50">
              <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12">
                <QrCode size={280} />
              </div>
              <div className="relative z-10">
                <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                  Ready to Process
                </span>
                <h2 className="text-4xl font-black mt-6 text-slate-900 tracking-tight">Redeem Voucher</h2>
                <p className="text-slate-500 mt-3 max-w-md font-medium leading-relaxed">
                  Scan a beneficiary's QR code to instantly verify and settle funds to your merchant account.
                </p>
              </div>
              
              <button
                onClick={() => setScannerOpen(true)}
                disabled={redeemLoading}
                className="mt-10 flex items-center justify-center gap-3 w-full md:w-max px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {redeemLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Maximize size={22} /> 
                    <span className="text-lg">Open Terminal Scanner</span>
                  </>
                )}
              </button>
            </GlassCard>

            {/* Revenue Highlights */}
            <GlassCard className="p-10 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md">
                  <TrendingUp size={28} className="text-indigo-400" />
                </div>
                <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                  <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Live</span>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Net Revenue</p>
              <h3 className="text-5xl font-black mt-2 tracking-tighter italic">
                ₦{(stats.totalRevenue / 100).toLocaleString()}
              </h3>
              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Payouts</p>
                  <p className="text-xl font-bold mt-1">{stats.totalTransactions}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Active Vouchers</p>
                  <p className="text-xl font-bold mt-1 text-indigo-400">{stats.activeVouchers}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Dynamic Feedback Section */}
          <AnimatePresence>
            {lastScan && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: -20, opacity: 0 }}
              >
                <GlassCard className={`p-8 border-2 ${lastScan.success ? 'border-emerald-100 bg-emerald-50/20' : 'border-red-100 bg-red-50/20'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${lastScan.success ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                        {lastScan.success ? <CheckCircle2 size={28}/> : <AlertCircle size={28}/>}
                      </div>
                      <div>
                        <p className={`text-xl font-black ${lastScan.success ? 'text-emerald-900' : 'text-red-900'}`}>
                          {lastScan.message}
                        </p>
                        <p className="text-xs font-mono font-bold text-slate-400 mt-1 uppercase tracking-widest">ID: {lastScan.code}</p>
                      </div>
                    </div>
                    <button onClick={() => setLastScan(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transactions Log */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <History size={24} className="text-indigo-500"/> 
                  Settlements
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing</span>
                </div>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {transactions.map((t: any) => (
                  <div key={t.id} className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{t.beneficiaryName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <p className="font-black text-indigo-600">
                      +₦{(t.amount / 100).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Recent Vouchers */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tight text-slate-900 italic">Voucher Queue</h3>
                <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {vouchers.map((v: any) => (
                  <div key={v.id} className="p-5 rounded-[1.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-sm font-black text-slate-900">{v.beneficiaryName}</p>
                        <p className="text-[10px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-widest">{v.qrCode.slice(0, 12)}...</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900 tracking-tighter">₦{(v.amount / 100).toLocaleString()}</p>
                        <div className="mt-1">
                          <span className={`text-[8px] px-2.5 py-1 rounded-full font-black uppercase tracking-[0.1em] ${
                            v.status === 'redeemed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {v.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </main>

        <QRScanner
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          onScan={handleQRScan}
        />
      </div>
    </ProtectedRoute>
  );
}