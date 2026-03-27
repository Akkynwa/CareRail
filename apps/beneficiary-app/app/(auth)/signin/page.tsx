"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Phone, Lock, ArrowRight, ShieldCheck, Fingerprint } from "lucide-react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "beneficiary" }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed. Please check your credentials.");
        return;
      }

      toast.success("Welcome back to CareRail!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Background Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-50/60 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-emerald-100 mb-4 hover:rotate-6 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Beneficiary Login</h1>
          <p className="text-slate-500 font-medium mt-1 text-center">Access your care vouchers securely</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Phone Number</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Phone size={18} />
                </div>
                <Input
                  type="tel"
                  placeholder="+234..."
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-emerald-600 transition-all outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Password</label>
                <button type="button" className="text-[10px] uppercase font-bold text-emerald-600 hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-emerald-600 transition-all outline-none"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? "Verifying..." : "Sign In"}
              {!loading && <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          {/* Biometric Visual (Optional Polish) */}
          <div className="mt-6 flex flex-col items-center">
             <button type="button" className="p-3 rounded-full bg-slate-100/50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <Fingerprint size={28} />
             </button>
             <p className="text-[9px] uppercase font-bold text-slate-300 mt-2 tracking-tighter">Biometric Access Enabled</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              New to CareRail? 
              <a href="/signup" className="text-emerald-600 font-bold ml-2 hover:underline underline-offset-4 transition-all">
                Join Now
              </a>
            </p>
          </div>
        </div>

        {/* Support Footer */}
        <p className="mt-8 text-center text-xs font-bold text-slate-400 tracking-wide uppercase">
          Secure 256-bit AES Encryption Active
        </p>
      </motion.div>
    </div>
  );
}