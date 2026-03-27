"use client";

import { MoveRight, Zap, ShieldCheck, Gem, Layers3, Heart, Activity } from "lucide-react";
import { Button } from "@carerail/ui";

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.08)] transition-all duration-500 ${className}`}>
    {children}
  </div>
);

export default function RootLandingPage() {
  
  const handleRedirect = (app: 'donor' | 'beneficiary' | 'vendor') => {
    const urls = {
      donor: "http://localhost:3004",
      beneficiary: "http://localhost:3003",
      vendor: "http://localhost:3002",
    };
    window.location.href = urls[app];
  };

  const coreFeatures = [
    { icon: Zap, title: "Instant Vouchers", desc: "Donors fund, beneficiaries receive digital aid instantly.", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: ShieldCheck, title: "Secured Payouts", desc: "Nigerian-grade security for every Naira transaction.", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Gem, title: "Immutable Ledger", desc: "Every donation is immutable and tracked on the blockchain.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Layers3, title: "Offline Ready", desc: "QR-based vouchers work even without active internet.", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden relative font-sans">
      
      {/* Background Decor - Soft Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Activity size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 italic">CareRail</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Documentation</button>
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-900 hover:bg-slate-50 font-bold px-6">Support</Button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
        
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center mb-24">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-indigo-600 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Polygon Mainnet & Interswitch Live
          </div>
          <h1 className="text-5xl md:text-8xl font-[1000] tracking-[calc(-0.05em)] leading-[0.95] mb-8 text-slate-900 italic">
            Transparent Aid.<br />
            <span className="text-indigo-600">Instant Impact.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed mb-12">
            The humanitarian operating system for Africa. Secure digital vouchers ensuring aid reaches those who need it most, instantly and transparently.
          </p>
        </section>

        {/* Portal Selection */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <GlassCard className="group border-b-8 border-b-blue-500">
            <div className="mb-12">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Donor Portal</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Fund specific healthcare interventions and track every Naira in real-time.</p>
            </div>
            <Button onClick={() => handleRedirect('donor')} className="w-full bg-slate-900 hover:bg-blue-600 text-white h-16 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3">
              Enter Portal <MoveRight size={20} />
            </Button>
          </GlassCard>

          <GlassCard className="group border-b-8 border-b-emerald-500">
            <div className="mb-12">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Beneficiary</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Access your digital aid wallet and generate offline-ready QR vouchers.</p>
            </div>
            <Button onClick={() => handleRedirect('beneficiary')} className="w-full bg-white border-2 border-slate-100 text-slate-900 hover:bg-emerald-50 hover:border-emerald-200 h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3">
              Access Aid <MoveRight size={20} />
            </Button>
          </GlassCard>

          <GlassCard className="group border-b-8 border-b-indigo-500">
            <div className="mb-12">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Vendor Terminal</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Authorized partners: Scan vouchers and receive instant bank settlements.</p>
            </div>
            <Button onClick={() => handleRedirect('vendor')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-16 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3">
              Partner Login <MoveRight size={20} />
            </Button>
          </GlassCard>
        </section>

        {/* Features Section */}
        <section className="py-24 border-t border-slate-100">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 italic">
                The Infrastructure <br /> of Generosity
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {coreFeatures.map((feat, i) => (
                  <div key={i} className="group p-6 bg-white border border-slate-50 rounded-[2rem] hover:border-indigo-100 transition-colors shadow-sm">
                    <div className={`w-12 h-12 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feat.icon size={24} />
                    </div>
                    <h4 className="font-black text-slate-900 text-lg mb-2 tracking-tight">{feat.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/5 rounded-[3rem] rotate-3 -z-10" />
              <GlassCard className="aspect-video flex flex-col items-center justify-center border-none">
                 <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                   <Layers3 size={40} />
                 </div>
                 <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Ecosystem Visualizer v1.0</p>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-bold text-white uppercase">C</div>
            <span className="text-sm font-black tracking-tighter text-slate-900 uppercase">CareRail</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            &copy; 2026 CareRail Technologies • Secure Humanitarian SaaS
          </p>
          <div className="flex gap-6 text-xs font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}