"use client";

import { useState } from "react";
import { useTransactions } from "../../../hooks/useTransactions";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Search, 
  Filter, 
  Download, 
  History, 
  Calendar,
  MoreVertical,
  Inbox
} from "lucide-react";

export default function TransactionsPage() {
  const { transactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((tx: any) => 
    tx.voucherCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <History size={20} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Settlements</h1>
          </div>
          <p className="text-slate-500 font-medium">Detailed audit log of all redeemed vouchers</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search voucher ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Ledger Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Voucher Ref</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Settled Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timestamp</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((tx: any, index: number) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <ArrowUpRight size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Success</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900 tracking-tight italic uppercase">{tx.voucherCode}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {tx.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-lg font-black text-indigo-600 tracking-tighter">
                      +₦{(tx.amount / 100).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} className="opacity-40" />
                      <p className="text-xs font-bold uppercase tracking-tighter">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-4 shadow-inner">
              <Inbox size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-900">No transactions found</h3>
            <p className="text-sm text-slate-400 font-medium mt-1 max-w-xs px-4">
              We couldn't find any settlement records matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-2 py-6 border-t border-slate-100">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
          Secure Blockchain-Backed Ledger v2.4
        </p>
      </div>
    </div>
  );
}