"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Search, Filter, RefreshCw, Inbox } from "lucide-react";
import VoucherItem from "./VoucherItem";

interface Voucher {
  id: string;
  code: string;
  status: 'active' | 'redeemed' | 'expired';
  amount?: number;
}

export default function VoucherList({ vouchers }: { vouchers: Voucher[] }) {
  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Ledger Header */}
      <div className="p-8 border-b border-slate-100 bg-white/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
                Voucher Ledger
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Synced with Mainnet
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Placeholder */}
          <div className="flex items-center gap-2">
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
              <Search size={18} />
            </button>
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="p-6 md:p-8">
        <div className="space-y-3">
          {vouchers?.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200"
            >
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-200 shadow-inner mb-4">
                <Inbox size={32} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
                No Vouchers Recorded
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Scan a QR code to begin settlement
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {vouchers.map((v, index) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <VoucherItem voucher={v} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      {vouchers?.length > 0 && (
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Showing {vouchers.length} Total Entries
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-white px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-indigo-100">
            <RefreshCw size={12} />
            Force Sync
          </button>
        </div>
      )}
    </div>
  );
}