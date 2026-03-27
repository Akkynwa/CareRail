"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Zap, ShieldAlert, X, Circle } from "lucide-react";

interface Notification {
  id: string;
  type: "settlement" | "security" | "system";
  title: string;
  time: string;
  read: boolean;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "settlement", title: "₦25,000 Payout Confirmed", time: "2m ago", read: false },
    { id: "2", type: "security", title: "New login from Lagos, NG", time: "45m ago", read: false },
    { id: "3", type: "system", title: "Mainnet Sync Complete", time: "1h ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative font-sans">
      {/* Bell Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all active:scale-95 group"
      >
        <Bell size={20} className={unreadCount > 0 ? "animate-[ring_2s_ease-in-out_infinite]" : ""} />
        
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-600 border-2 border-white rounded-full">
            <span className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-75" />
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible Backdrop for closing */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 md:w-96 backdrop-blur-2xl bg-white/90 border border-white/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 tracking-tight">Activity Log</h3>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-md tracking-widest">
                    {unreadCount} New
                  </span>
                </div>
                <button 
                  onClick={markAllRead}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <p className="text-xs font-bold uppercase tracking-widest">All caught up</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((n, i) => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-4 rounded-2xl flex items-start gap-4 transition-all hover:bg-white group cursor-pointer ${!n.read ? 'bg-indigo-50/30' : ''}`}
                      >
                        <div className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          n.type === 'settlement' ? 'bg-emerald-100 text-emerald-600' : 
                          n.type === 'security' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {n.type === 'settlement' && <CheckCircle2 size={16} />}
                          {n.type === 'security' && <ShieldAlert size={16} />}
                          {n.type === 'system' && <Zap size={16} />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm tracking-tight leading-tight ${!n.read ? 'font-black text-slate-900' : 'font-medium text-slate-500'}`}>
                            {n.title}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                            {n.time}
                          </p>
                        </div>

                        {!n.read && (
                          <Circle size={6} className="mt-2 fill-indigo-600 text-indigo-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline">
                  View Full Audit Trail
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          5% { transform: rotate(10deg); }
          10% { transform: rotate(-10deg); }
          15% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          25% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
      `}</style>
    </div>
  );
}