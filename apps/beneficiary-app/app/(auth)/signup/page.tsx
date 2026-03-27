"use client";

import { useState } from "react";
import { Input, Button } from "@carerail/ui";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "beneficiary" }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-50/60 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join CareRail</h1>
          <p className="text-slate-500 font-medium mt-1">Start receiving your digital health vouchers</p>
        </div>

        {/* Glass Card Container */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Full Identity</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <User size={18} />
                </div>
                <Input
                  placeholder="Enter your full name"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-emerald-600 transition-all outline-none"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
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
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Secure Password</label>
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
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group mt-4"
            >
              {loading ? "Creating Profile..." : "Create Account"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account? 
              <a href="/signin" className="text-emerald-600 font-bold ml-2 hover:underline underline-offset-4 transition-all">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Security Info */}
        <p className="mt-8 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Secured by CareRail Encryption
        </p>
      </motion.div>
    </div>
  );
}