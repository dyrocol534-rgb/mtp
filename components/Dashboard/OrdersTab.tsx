"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiTerminal,
  FiActivity,
  FiLayers,
} from "react-icons/fi";
import OrderItem, { OrderType } from "./OrderItem";

export default function OrdersTab() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalCount / limit);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  /* ================= LOAD ORDERS ================= */
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch("/api/order/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit, search }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        setOrders(data.orders || []);
        setTotalCount(data.totalCount || 0);
      })
      .finally(() => setLoading(false));
  }, [token, page, search, limit]);

  /* ================= RESET PAGE ON SEARCH ================= */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= PAGE RANGE ================= */
  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* TACTICAL HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
            <FiTerminal size={18} />
          </div>
          <div>
            <h3 className="text-xl font-[900] uppercase italic tracking-tighter">Mission Log</h3>
            <p className="text-[9px] font-black text-[var(--muted)]/40 uppercase tracking-[0.2em]">
              {loading ? "Syncing Deployment Data..." : `Showing ${totalCount} Active Records`}
            </p>
          </div>
        </div>

        {/* SEARCH CONSOLE */}
        <div className="relative w-full sm:w-64 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="FILTER DEPLOYMENTS..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/5 focus:border-[var(--accent)]/40 text-[10px] uppercase font-black tracking-widest outline-none transition-all placeholder:text-white/5"
          />
        </div>
      </div>

      {/* MISSION LIST */}
      <div className="min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative w-12 h-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-2 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)]"
              >
                <FiActivity size={16} />
              </motion.div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted)]/40 animate-pulse">Syncing Database</span>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-[2.5rem]"
          >
            <FiLayers size={32} className="text-white/5 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]/40 italic">No Active Deployments Found</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {orders.map((order, idx) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.03, type: "spring", stiffness: 300, damping: 30 }}
                >
                  <OrderItem order={order} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* TACTICAL PAGINATION */}
      {totalPages > 1 && (
        <div className="pt-8 border-t border-white/5 flex justify-center items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-3 rounded-xl bg-white/5 border border-white/5 disabled:opacity-20 hover:bg-white/10 transition-all group"
          >
            <FiChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {getPageNumbers().map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-[40px] px-3 py-2 rounded-xl text-[10px] font-black transition-all
                  ${p === page
                    ? "bg-[var(--accent)] text-black shadow-[0_10px_20px_-5px_rgba(var(--accent-rgb),0.3)]"
                    : "bg-white/5 text-[var(--muted)] hover:bg-white/10 border border-white/5"
                  }`}
              >
                {p < 10 ? `0${p}` : p}
              </button>
            ))}
          </div>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-3 rounded-xl bg-white/5 border border-white/5 disabled:opacity-20 hover:bg-white/10 transition-all group"
          >
            <FiChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
