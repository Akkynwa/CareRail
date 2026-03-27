"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, ShieldQuestion, Send } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Neutral Ambient Background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-100/50 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-50/40 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-xl mb-4">
            <ShieldQuestion size={30} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
          <p className="text-slate-500 font-medium mt-1 px-6">
            Enter your email and we'll send you instructions to reset your account.
          </p>
        </div>

        {/* Glassmorphic Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Email Address</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                      <Mail size={18} />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4 text-emerald-500">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Check your inbox</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  We've sent a recovery link to your email address. Please follow the instructions to secure your account.
                </p>
                <button 
                  onClick={() => setSent(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors"
                >
                  Didn't get it? Resend
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link 
              href="/signin" 
              className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Footer Security */}
        <p className="mt-8 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Secure Password Recovery Protocol
        </p>
      </motion.div>
    </div>
  );
}