"use client";

import Link from "next/link";
import { Card, Button, ProtectedRoute, useSession } from "@carerail/ui";
import { motion } from "framer-motion";
import { PlusCircle, BarChart3, QrCode, Heart, ArrowRight, Zap } from "lucide-react";

// Light-mode Glassmorphic Wrapper
const GlassWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,82,255,0.05)] ${className}`}>
    {children}
  </div>
);

export default function HomePage() {
  const { user } = useSession() || {};

  return (
    <ProtectedRoute requiredRole="donor">
      <div className="min-h-screen bg-[#fcfdfe] relative overflow-hidden font-sans text-slate-900">
        {/* Ambient Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-indigo-50/50 rounded-full blur-[80px]" />

        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  Verified Donor
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                Welcome back, <span className="text-blue-600">{user?.name?.split(' ')[0] || "Donor"}</span>
              </h1>
              <p className="text-slate-500 mt-2 text-lg font-medium">
                Your contributions have reached <span className="text-slate-900 font-bold">1,240</span> people this month.
              </p>
            </motion.div>

            <div className="flex items-center gap-3">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +8
                  </div>
               </div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Active Projects</p>
            </div>
          </header>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Action 1: New Donation */}
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassWrapper className="p-8 h-full flex flex-col justify-between group hover:bg-white/60 transition-all border-blue-100/30">
                <div>
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                    <PlusCircle size={28} />
                  </div>
                  <h2 className="font-black text-2xl mb-3 text-slate-800">Issue Vouchers</h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Instantly mint and distribute digital aid vouchers to your selected community groups.
                  </p>
                </div>
                <Link href="/donations/new" className="mt-8">
                  <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold transition-all flex items-center justify-center gap-2">
                    Create Voucher <ArrowRight size={18} />
                  </Button>
                </Link>
              </GlassWrapper>
            </motion.div>

            {/* Action 2: Impact Dashboard */}
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
              <GlassWrapper className="p-8 h-full flex flex-col justify-between group hover:bg-white/60 transition-all">
                <div>
                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                    <BarChart3 size={28} />
                  </div>
                  <h2 className="font-black text-2xl mb-3 text-slate-800">Impact Stats</h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Real-time analytics on fund utilization, redemption rates, and geographic impact.
                  </p>
                </div>
                <Link href="/dashboard" className="mt-8">
                  <Button className="w-full h-14 rounded-2xl bg-white border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700 font-bold transition-all">
                    View Analytics
                  </Button>
                </Link>
              </GlassWrapper>
            </motion.div>

            {/* Action 3: Offline Support */}
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }}>
              <GlassWrapper className="p-8 h-full flex flex-col justify-between group hover:bg-white/60 transition-all">
                <div>
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    <QrCode size={28} />
                  </div>
                  <h2 className="font-black text-2xl mb-3 text-slate-800">Offline Kits</h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Generate printable QR code batches for distribution in areas with limited connectivity.
                  </p>
                </div>
                <Link href="/qr/generate" className="mt-8">
                  <Button className="w-full h-14 rounded-2xl bg-white border-2 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 font-bold transition-all">
                    Generate Batch
                  </Button>
                </Link>
              </GlassWrapper>
            </motion.div>
          </div>

          {/* Featured Summary Section */}
          <GlassWrapper className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 border-none shadow-2xl shadow-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Zap size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Live Network Status</h3>
                  <p className="text-blue-100 opacity-80 text-sm">Polygon Mainnet is running optimally. Vouchers minting in ~2s.</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-center flex-1">
                  <p className="text-[10px] uppercase font-bold opacity-60">Avg. Gas</p>
                  <p className="font-mono font-bold">0.002 MATIC</p>
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-center flex-1">
                  <p className="text-[10px] uppercase font-bold opacity-60">Success Rate</p>
                  <p className="font-mono font-bold">100%</p>
                </div>
              </div>
            </div>
          </GlassWrapper>
        </div>
      </div>
    </ProtectedRoute>
  );
}