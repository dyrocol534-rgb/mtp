"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiGrid,
  FiCreditCard,
  FiHash,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

/* ================= TYPES ================= */

export type OrderType = {
  orderId: string;
  gameSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  topupStatus?: string;
  createdAt: string;
};

/* ================= HELPERS ================= */

const getGameName = (slug: string) => {
  const s = slug.toLowerCase();
  const mlbbSlugs = ["mobile-legends", "mlbb", "diamond"];
  if (mlbbSlugs.some((k) => s.includes(k))) return "Mobile Legends";
  if (s.includes("pubg") || s.includes("bgmi")) return "BGMI";
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

/* ================= MAIN ITEM COMPONENT ================= */

export default function OrderItem({ order }: { order: OrderType }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawStatus = (order.topupStatus || order.status || "").toLowerCase();

  const getStatusConfig = (s: string) => {
    if (s.includes("success") || s.includes("completed") || s.includes("deployed")) {
      return { color: "#10b981", icon: FiCheckCircle, label: "SUCCESS" };
    }
    if (s.includes("failed") || s.includes("cancelled") || s.includes("error")) {
      return { color: "#ef4444", icon: FiAlertCircle, label: "FAILED" };
    }
    return { color: "#f59e0b", icon: FiLoader, label: "PENDING" };
  };

  const config = getStatusConfig(rawStatus);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[var(--card)]/40 backdrop-blur-xl transition-all duration-300">

      {/* TOP STATUS BAR */}
      <div
        className="px-4 py-1.5 flex items-center justify-between border-b border-white/5"
        style={{ backgroundColor: `${config.color}05` }}
      >
        <div className="flex items-center gap-2" style={{ color: config.color }}>
          <config.icon size={10} className={config.label === 'PENDING' ? 'animate-spin' : ''} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
          <div className="flex flex-col items-end min-w-0">
            <div className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Order Identity</div>
            <div className="text-[9px] font-black italic text-white/60 font-mono break-all text-right leading-tight">
              {order.orderId.toUpperCase()}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all border ${copied
              ? "bg-green-500/10 border-green-500/20 text-green-500"
              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-4 sm:p-5 cursor-pointer select-none" onClick={() => setOpen(!open)}>
        <div className="flex items-center justify-between gap-4">

          {/* GAME & ITEM */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none mb-1">
              {getGameName(order.gameSlug)}
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-[9px] font-bold text-[var(--muted)]/40 uppercase tracking-[0.2em] italic">
                {order.itemName}
              </p>
              <div className="flex items-center gap-1.5 py-1 px-2 rounded-lg bg-white/5 border border-white/5 w-fit">
                <FiUser className="text-[var(--accent)]/40" size={10} />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60 font-mono break-all leading-none">
                  {order.playerId}
                </span>
              </div>
            </div>
          </div>

          {/* PRICE & TOGGLE */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="text-xl font-black italic tracking-tighter text-white leading-none">
                ₹{order.price}
              </div>
              <div className="text-[8px] font-bold text-[var(--muted)]/30 uppercase mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              className="p-1 text-[var(--muted)]/20"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* EXPANDED DATA */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 overflow-hidden"
          >
            <div className="border-t border-white/5 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoNode label="Player ID" value={order.playerId} icon={FiUser} mono />
              <InfoNode label="Zone ID" value={order.zoneId} icon={FiGrid} mono />
              <InfoNode label="Payment" value={order.paymentMethod.toUpperCase()} icon={FiCreditCard} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoNode({ label, value, icon: Icon, mono }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
      <div className="flex items-center gap-2 text-[var(--muted)] font-black uppercase text-[8px] tracking-widest opacity-30">
        <Icon size={12} />
        {label}
      </div>
      <div className={`text-white uppercase font-black text-[10px] ${mono ? 'font-mono' : ''}`}>
        {value || 'N/A'}
      </div>
    </div>
  );
}
