"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Mail, Lock, UserPlus, ShieldCheck, ArrowRight } from "lucide-react";
import { Input, Button, ErrorText } from "@carerail/ui";
import { api } from "../../../lib/api";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const f = new FormData(e.currentTarget);
    const name = f.get("name") as string;
    const email = f.get("email") as string;
    const password = f.get("password") as string;

    try {
      const res = await api.auth.signup({
        name,
        email,
        password,
        role: "vendor", // Explicitly setting the role for the vendor app
      });

      if (!res.success) {
        setError(res.message);
        toast.error(res.message || "Registration failed");
        return;
      }

      toast.success("Vendor account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbff] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Indigo Ambient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-50/60 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100 mb-4">
            <Store size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Onboarding</h1>
          <p className="text-slate-500 font-medium mt-1">Register your facility to start accepting vouchers</p>
        </div>

        {/* Glassmorphic Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
              >
                <ErrorText className="bg-red-50/50 p-3 rounded-xl border border-red-100 text-center">
                  {error}
                </ErrorText>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Facility Name</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Store size={18} />
                </div>
                <Input
                  name="name"
                  placeholder="e.g. City General Hospital"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Contact Email</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@facility.com"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Secure Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group mt-4"
            >
              {loading ? "Registering..." : "Create Account"}
              {!loading && <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already registered? 
              <a href="/signin" className="text-indigo-600 font-bold ml-2 hover:underline underline-offset-4 transition-all">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Compliance Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-300">
          <ShieldCheck size={14} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Merchant Data Protection Active
          </p>
        </div>
      </motion.div>
    </div>
  );
}