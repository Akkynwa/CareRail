"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, CreditCard, Tag, CheckCircle2, Clock } from "lucide-react";

interface Voucher {
  id: string;
  code: string;
  status: 'active' | 'redeemed' | 'expired';
  amount?: number;
  beneficiaryName?: string;
}

export default function VoucherItem({ voucher }: { voucher: Voucher }) {
  const isRedeemed = voucher.status === 'redeemed';
  const isActive = voucher.status === 'active';

  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
      className="group"
    >
      <Link
        href={`/dashboard/vouchers/${voucher.id}`}
        className="block p-5 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-[1.5rem] hover:border-indigo-200 hover:bg-white hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.1)] transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Asset Icon */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
              isRedeemed ? 'bg-slate-50 text-slate-400' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <CreditCard size={20} strokeWidth={2.5} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-black text-slate-900 tracking-tight italic uppercase">
                  {voucher.code}
                </p>
                {isRedeemed ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                  isRedeemed 
                    ? 'bg-slate-100 border-slate-200 text-slate-500' 
                    : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  {voucher.status}
                </span>
                {voucher.amount && (
                  <p className="text-[10px] font-bold text-slate-400">
                    • ₦{(voucher.amount / 100).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                Click to Inspect
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}