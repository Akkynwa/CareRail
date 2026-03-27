"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@carerail/ui";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) return toast.error("Please enter email and password");
    
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "donor" }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome back, Donor!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Sign in failed");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] relative flex items-center justify-center px-4 overflow-hidden font-sans">
      {/* Royal Blue Ambient Background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-50/60 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-100 mb-4 hover:scale-105 transition-transform">
            <Heart size={30} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Donor Portal</h1>
          <p className="text-slate-500 font-medium mt-1">Empowering healthcare through your generosity</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Official Email</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <Input
                  type="email"
                  placeholder="name@organization.com"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Password</label>
                <button type="button" className="text-[10px] uppercase font-bold text-blue-600 hover:underline">Reset</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? "Authorizing..." : "Sign In"}
              {!loading && <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              New to the ecosystem? 
              <a href="/signup" className="text-blue-600 font-bold ml-2 hover:underline underline-offset-4 transition-all">
                Register as Donor
              </a>
            </p>
          </div>
        </div>

        {/* Security Tagline */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-300">
          <ShieldCheck size={14} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Verified Donor Access Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}