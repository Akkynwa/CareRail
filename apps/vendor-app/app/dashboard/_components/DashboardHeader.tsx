"use client";

import { ShieldCheck, Circle } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-100 pb-8 mb-8">
      <div className="flex items-center gap-4">
        {/* Brand Icon */}
        <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100 shrink-0">
          <ShieldCheck size={28} />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
              Vendor Terminal
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <Circle size={6} className="fill-emerald-500 text-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Live</span>
            </div>
          </div>
          <p className="text-slate-500 font-medium text-sm">
            Real-time voucher management & secure redemptions
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1">
          Authorized Access
        </span>
        <p className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100/50">
          Voucher Settlement Node v2.1
        </p>
      </div>
    </div>
  );
}