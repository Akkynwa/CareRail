"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  HandHeart, 
  Store, 
  Activity, 
  ArrowUpRight, 
  TrendingUp,
  ShieldCheck,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";

// Helper for Glass Effect
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

export default function AdminDashboard() {
  const [isLive, setIsLive] = useState(true);

  // Mock live update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
      setTimeout(() => setIsLive(true), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "Total Donors", value: "25", icon: HandHeart, color: "text-blue-400", trend: "+12%" },
    { title: "Total Beneficiaries", value: "150", icon: Users, color: "text-green-400", trend: "+5.4%" },
    { title: "Total Vendors", value: "12", icon: Store, color: "text-purple-400", trend: "+2" },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />

      <main className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Admin Command
              </h1>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                <span className={`w-2 h-2 rounded-full bg-green-500 ${isLive ? 'animate-pulse' : ''}`} />
                Live Feed
              </div>
            </div>
            <p className="text-gray-400 text-lg font-light">Monitoring the CareRail Ecosystem</p>
          </div>
          
          <div className="flex gap-3">
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Bell size={20} className="text-gray-400" />
            </button>
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
              Export Audit
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="hover:border-white/20 transition-all cursor-default group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                    <TrendingUp size={14} /> {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-400 font-medium mb-1">{stat.title}</h3>
                <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Live Activity & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Table */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity size={20} className="text-blue-400" /> Recent Transactions
              </h3>
              <button className="text-sm text-blue-400 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                      TX
                    </div>
                    <div>
                      <p className="font-semibold">Voucher Redeemed</p>
                      <p className="text-xs text-gray-500 text-light">Vendor: Lagos Central Mart</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-green-400">+ ₦15,000</p>
                    <p className="text-[10px] text-gray-500 uppercase">2 mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* System Health / Additional Features */}
          <div className="flex flex-col gap-6">
            <GlassCard className="bg-gradient-to-br from-blue-600/20 to-transparent">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-400" /> System Security
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Smart Contract</span>
                  <span className="text-green-400 font-mono">Active</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[98%]" />
                </div>
                <p className="text-[10px] text-gray-500 italic">Last audit: 14 mins ago via Polygon Scan</p>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 text-xs bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex flex-col items-center gap-2">
                  <ArrowUpRight size={16} /> Mint Vouchers
                </button>
                <button className="p-3 text-xs bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex flex-col items-center gap-2">
                  <Users size={16} /> Audit Users
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}