"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, TrendingUp, Zap, ArrowUpRight } from "lucide-react";

interface Stats {
  totalVouchers: number;
  redeemed: number;
  earnings: number;
}

export default function VendorStats({ stats }: { stats: Stats }) {
  const cards = [
    {
      label: "Total Vouchers",
      value: stats.totalVouchers,
      icon: <CreditCard size={20} />,
      color: "bg-blue-50 text-blue-600",
      trend: "+12%",
    },
    {
      label: "Redeemed",
      value: stats.redeemed,
      icon: <CheckCircle2 size={20} />,
      color: "bg-emerald-50 text-emerald-600",
      trend: "88% rate",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* Secondary Metrics */}
      {cards.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="backdrop-blur-xl bg-white/60 border border-white/80 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shadow-sm`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
              {item.trend}
            </span>
          </div>
          
          <div className="mt-6">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.15em] mb-1">
              {item.label}
            </p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              {item.value.toLocaleString()}
            </h2>
          </div>
        </motion.div>
      ))}

      {/* Primary Earnings Metric */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 relative overflow-hidden group"
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors" />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10">
              <TrendingUp size={24} />
            </div>
            <div className="flex items-center gap-1 bg-indigo-500/20 px-2 py-1 rounded-full border border-indigo-500/30">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[9px] font-black text-white uppercase tracking-tighter">Instant</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">
              Total Earnings
            </p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black text-white tracking-tighter italic">
                ₦{(stats.earnings / 100).toLocaleString()}
              </h2>
              <ArrowUpRight size={20} className="text-emerald-400 mb-1" />
            </div>
            <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">
              Available for Payout
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}