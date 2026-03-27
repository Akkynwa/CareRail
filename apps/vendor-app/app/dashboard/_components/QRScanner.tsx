"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X, Zap, ShieldCheck, Maximize, Loader2 } from "lucide-react";
import { Button, Input } from "@carerail/ui";
import { api } from "../../../lib/api";
import toast from "react-hot-toast";

export default function QRScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const handleSimulatedScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!manualCode) return;

    setLoading(true);
    try {
      const res = await api.vouchers.validate({ code: manualCode });
      
      if (res.success) {
        toast.success(res.message || "Voucher Validated");
        setIsOpen(false);
        setManualCode("");
      } else {
        toast.error(res.message || "Invalid Voucher");
      }
    } catch (err) {
      toast.error("Validation failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto bg-slate-900 hover:bg-indigo-600 text-white py-6 px-8 rounded-[1.5rem] font-bold shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group"
      >
        <Maximize size={20} className="group-hover:scale-110 transition-transform" />
        Launch Scanner
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Scanner UI */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <QrCode size={18} />
                  </div>
                  <span className="font-black text-sm uppercase tracking-widest text-slate-900">
                    Terminal Scan
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Viewfinder Area */}
              <div className="p-10 flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50">
                <div className="relative w-64 h-64 border-2 border-indigo-100 rounded-3xl flex items-center justify-center bg-white shadow-inner overflow-hidden">
                  {/* Scanning Animation */}
                  <motion.div 
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-4 right-4 h-[2px] bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] z-10"
                  />
                  
                  <div className="flex flex-col items-center text-slate-300 gap-2">
                    <QrCode size={80} strokeWidth={1} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Code</p>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-indigo-600 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-indigo-600 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-indigo-600 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-indigo-600 rounded-br-lg" />
                </div>

                <div className="mt-8 text-center space-y-2">
                  <h3 className="text-xl font-black text-slate-900 italic">Voucher Validation</h3>
                  <p className="text-sm text-slate-500 font-medium">Position the QR code within the frame above</p>
                </div>
              </div>

              {/* Manual Entry Footer */}
              <div className="p-8 bg-white border-t border-slate-100">
                <form onSubmit={handleSimulatedScan} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Zap size={18} />
                    </div>
                    <Input
                      placeholder="Enter code manually (e.g. VCH-992)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading || !manualCode}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Validate & Redeem"}
                    {!loading && <ShieldCheck size={20} />}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}