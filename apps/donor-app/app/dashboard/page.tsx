"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  Plus, 
  Ticket, 
  ArrowUpRight, 
  History, 
  Download, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  CreditCard
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "@/hooks/useSession";

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFundForm, setShowFundForm] = useState(false);
  const [form, setForm] = useState({ amount: "", purpose: "", beneficiaryPhone: "" });
  const [fundForm, setFundForm] = useState({ amount: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [funding, setFunding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");

  useEffect(() => {
    const payment = searchParams.get('payment');
    const ref = searchParams.get('ref');
    const amount = searchParams.get('amount');
    const code = searchParams.get('code');

    if (payment === 'success') {
      setPaymentMessage(`✅ Success! ₦${amount} added. Ref: ${ref}`);
    } else if (payment === 'failed') {
      setPaymentMessage(`❌ Failed. Error: ${code}`);
    }

    if (payment) setTimeout(() => router.replace('/dashboard'), 5000);
  }, [searchParams, router]);

  // ... (Keep handleCreateVoucher and handleFundWallet logic exactly as you had it)

  return (
    <ProtectedRoute requiredRole="donor">
      <div className="min-h-screen bg-[#fcfdfe] relative overflow-hidden font-sans text-slate-900 pb-20">
        {/* Background Decor */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-50/50 rounded-full blur-[80px]" />

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Heart size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">CareRail</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Donor Command</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm font-semibold text-slate-600">Hi, {user?.name?.split(' ')[0]}</span>
              <Link href="/signin" className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 pt-10 relative z-10 space-y-8">
          
          {/* Notification Toast */}
          <AnimatePresence>
            {paymentMessage && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-xl shadow-blue-200 font-medium flex items-center gap-3">
                <CheckCircle2 size={20} /> {paymentMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats & Wallet Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl shadow-blue-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Impact Wallet</p>
                  <h2 className="text-4xl font-black">₦120,000</h2>
                </div>
                <button 
                  onClick={() => { setShowFundForm(!showFundForm); setShowCreateForm(false); }}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all"
                >
                  <CreditCard size={24} />
                </button>
              </div>
              <div className="flex gap-4">
                 <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold opacity-60">Success Rate</p>
                    <p className="text-lg font-bold">100%</p>
                 </div>
                 <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold opacity-60">Redeemed</p>
                    <p className="text-lg font-bold">₦75,000</p>
                 </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 flex flex-col justify-center items-center text-center group hover:bg-white/80 transition-all cursor-pointer border-dashed border-2 border-blue-200/50" 
              onClick={() => { setShowCreateForm(!showCreateForm); setShowFundForm(false); }}>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Plus size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">New Donation</h3>
              <p className="text-sm text-slate-500 max-w-[200px] mt-1">Issue a digital voucher to a beneficiary instantly</p>
            </GlassCard>
          </div>

          {/* Forms Section */}
          <AnimatePresence mode="wait">
            {showFundForm && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <GlassCard className="p-8 border-blue-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Wallet size={20} className="text-blue-600"/> Fund Wallet</h3>
                  <form onSubmit={handleFundWallet} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">Amount (₦)</label>
                      <input type="number" required value={fundForm.amount} onChange={(e) => setFundForm({ ...fundForm, amount: e.target.value })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none font-bold" placeholder="5,000"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-2">Description</label>
                      <input type="text" value={fundForm.description} onChange={(e) => setFundForm({ ...fundForm, description: e.target.value })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Monthly Aid Budget"/>
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                      <button type="submit" disabled={funding} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50">{funding ? "Connecting..." : "Initiate Payment"}</button>
                      <button type="button" onClick={() => setShowFundForm(false)} className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200">Cancel</button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {showCreateForm && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <GlassCard className="p-8 border-indigo-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Ticket size={20} className="text-indigo-600"/> Create Voucher</h3>
                  <form onSubmit={handleCreateVoucher} className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2">Beneficiary Phone</label>
                        <input type="tel" required value={form.beneficiaryPhone} onChange={(e) => setForm({ ...form, beneficiaryPhone: e.target.value })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none font-mono" placeholder="+234..."/>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2">Amount (₦)</label>
                        <input type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none font-bold" placeholder="500"/>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2">Purpose</label>
                        <input type="text" required value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="Healthcare Support"/>
                      </div>
                    </div>
                    {error && <div className="flex items-center gap-2 text-red-500 text-sm font-medium"><AlertCircle size={16}/> {error}</div>}
                    <div className="flex gap-4">
                      <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-black disabled:opacity-50">{loading ? "Minting..." : "Generate Voucher"}</button>
                      <button type="button" onClick={() => setShowCreateForm(false)} className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200">Cancel</button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Result */}
          {generatedQR && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <GlassCard className="p-8 text-center border-green-200">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Voucher Ready!</h3>
                <p className="text-slate-500 mb-6">Successfully sent to {form.beneficiaryPhone}</p>
                <div className="bg-white p-4 rounded-3xl inline-block shadow-inner mb-6">
                  <img src={generatedQR} alt="QR Code" className="w-48 h-48" />
                </div>
                <div>
                  <a href={generatedQR} download="voucher.png" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                    <Download size={18}/> Save QR Code
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Activity Feed */}
          <GlassCard className="p-8">
            <h3 className="text-xl font-black mb-8 flex items-center gap-2"><History size={20} className="text-slate-400"/> Recent Activity</h3>
            <div className="space-y-4">
              {[
                { title: "Voucher Redeemed", desc: "John Doe at Quick Bites", amount: "-₦5,000", time: "2h ago", icon: ArrowUpRight, color: "text-red-500" },
                { title: "Voucher Created", desc: "For Jane Smith (Healthcare)", amount: "-₦10,000", time: "5h ago", icon: Ticket, color: "text-blue-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-white shadow-sm ${item.color}`}><item.icon size={20}/></div>
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 leading-none">{item.amount}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-300 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </main>
      </div>
    </ProtectedRoute>
  );
}