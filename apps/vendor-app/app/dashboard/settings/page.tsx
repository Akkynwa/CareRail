"use client";

import { useState } from "react";
import { api } from "../../../lib/api";
import { Input, Button } from "@carerail/ui";
import { motion } from "framer-motion";
import { Store, Phone, Save, Settings, ShieldCheck, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SettingsPage() {
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    setLoading(true);
    try {
      await api.vendor.updateProfile({ shopName, phone });
      toast.success("Merchant profile updated successfully");
    } catch (err) {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto font-sans">
      {/* Breadcrumb / Back Navigation */}
      <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors mb-6 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-wider">Back to Terminal</span>
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium">Manage your facility's public profile</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm"
      >
        <div className="space-y-8">
          {/* Shop Name Field */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black tracking-[0.15em] text-slate-400 ml-1">
              Registered Shop Name
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                <Store size={20} />
              </div>
              <Input
                placeholder="e.g. Apex Pharmacy"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black tracking-[0.15em] text-slate-400 ml-1">
              Contact Phone Number
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                <Phone size={20} />
              </div>
              <Input
                type="tel"
                placeholder="+234..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 py-6 focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={saveSettings}
              disabled={loading}
              className="w-full md:w-auto min-w-[200px] bg-slate-900 hover:bg-indigo-600 text-white py-6 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-100"
            >
              {loading ? "Updating..." : "Save Changes"}
              {!loading && <Save size={20} className="group-hover:scale-110 transition-transform" />}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Security Info Card */}
      <div className="mt-6 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900">Profile Verification</h4>
          <p className="text-xs text-indigo-700/80 leading-relaxed mt-1">
            Updating your shop name may require a brief re-verification by the CareRail admin team to ensure donor compliance.
          </p>
        </div>
      </div>
    </div>
  );
}