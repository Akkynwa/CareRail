"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@carerail/ui";
import { motion } from "framer-motion";
import { Store, Lock, LogIn, ShieldCheck, Tag, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, role: "vendor" }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed. Check merchant credentials.");
        return;
      }

      toast.success("Merchant session authorized");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbff] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Indigo Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-50/60 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Merchant Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100 mb-4 hover:rotate-12 transition-transform">
            <Store size={30} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Terminal</h1>
          <p className="text-slate-500 font-medium mt-1">Authorized health provider access</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Merchant ID or Email</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Tag size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="e.g. VEND001"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Merchant Password</label>
                <button type="button" className="text-[10px] uppercase font-bold text-indigo-600 hover:underline transition-all">Support</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? "Authenticating..." : "Authorize Terminal"}
              {!loading && <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          {/* Test Credentials Badge */}
          <div className="mt-8 flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <Info size={16} className="text-indigo-600 shrink-0" />
            <p className="text-[11px] text-indigo-800 font-medium leading-tight">
              Dev Mode: Use <span className="font-bold">VEND001</span> / <span className="font-bold">vendor123</span> for testing.
            </p>
          </div>
        </div>

        {/* Compliance Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-300">
          <ShieldCheck size={14} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Merchant Security Protocol Active
          </p>
        </div>
      </motion.div>
    </div>
  );
}