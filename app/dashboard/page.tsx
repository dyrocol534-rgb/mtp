"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import WalletTab from "../../components/Dashboard/WalletTab";
import AccountTab from "../../components/Dashboard/AccountTab";
import QueryTab from "../../components/Dashboard/QueryTab";
import OrdersTab from "../../components/Dashboard/OrdersTab";
import { FiLayout, FiInbox, FiUser, FiHelpCircle, FiZap } from "react-icons/fi";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        setUserDetails({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });

        setWalletBalance(data.user.wallet || 0);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const tabCards = [
    { key: "orders", label: "Operations", value: "Orders", icon: FiInbox },
    { key: "query", label: "Protocol", value: "Support", icon: FiHelpCircle },
    // { key: "wallet", label: "Credits", value: `₹${walletBalance}`, icon: FiZap },
    // { key: "account", label: "Identity", value: "Profile", icon: FiUser },
  ];

  return (
    <AuthGuard>
      <section className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 bg-[var(--background)]">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* COMPACT TACTICAL HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                <FiZap className="text-[var(--accent)] animate-pulse" size={10} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)] italic">
                  Systems Online
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                COMMAND <span className="text-[var(--accent)]">CENTER</span>
              </h1>

              <p className="text-[var(--muted)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-40 italic">
                Operative: {userDetails.name || "UNIDENTIFIED"} • Data Sync Active
              </p>
            </div>

            {/* QUICK STATS - COMPACT */}
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)]/40 mb-0.5">Wallet Assets</p>
                <p className="text-sm font-black italic text-[var(--accent)] leading-none">₹{walletBalance}</p>
              </div>
            </div>
          </motion.div>

          {/* TACTICAL NAVIGATION */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {tabCards.map((tab, index) => (
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <DashboardCard
                  tab={tab}
                  activeTab={activeTab}
                  onClick={() => setActiveTab(tab.key)}
                />
              </motion.div>
            ))}
          </div>

          {/* MISSION CONTROL AREA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-[var(--card)]/40 backdrop-blur-2xl border border-[var(--border)] rounded-[2rem] p-5 sm:p-8 shadow-2xl min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "orders" && <OrdersTab />}
                  {activeTab === "wallet" && (
                    <WalletTab
                      walletBalance={walletBalance}
                      setWalletBalance={setWalletBalance}
                    />
                  )}
                  {activeTab === "account" && <AccountTab userDetails={userDetails} />}
                  {activeTab === "query" && <QueryTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </AuthGuard>
  );
}
