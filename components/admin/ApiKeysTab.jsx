"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Key,
    User,
    Activity,
    RefreshCcw,
    Loader2,
    Shield,
    Mail,
    Calendar,
    Wifi,
    WifiOff,
    Clock
} from "lucide-react";

export default function ApiKeysTab() {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchKeys = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/api-keys", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setKeys(data.data || []);
            }
        } catch (err) {
            console.error("Fetch API keys failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    return (
        <div className="space-y-6 pb-10">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h2 className="text-xl font-black tracking-tight text-[var(--foreground)] uppercase bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground)]/60 bg-clip-text text-transparent">API Keys</h2>
                    <p className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest opacity-40 mt-1">
                        Developer monitoring dashboard.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center gap-3 shadow-sm">
                        <Key size={14} className="text-[var(--accent)]" />
                        <span className="text-sm font-black text-[var(--foreground)] tabular-nums">
                            {keys.length} <span className="text-[9px] text-[var(--muted)] uppercase tracking-tighter opacity-40 ml-1">Active</span>
                        </span>
                    </div>
                    <button
                        onClick={fetchKeys}
                        className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/30 active:scale-95 transition-all outline-none flex items-center justify-center"
                    >
                        <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-32 flex flex-col items-center justify-center space-y-4"
                    >
                        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
                        <p className="text-sm text-[var(--muted)] font-medium">Loading developer data...</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* DESKTOP TABLE */}
                        <div className="hidden lg:block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[var(--foreground)]/[0.03] border-b border-[var(--border)] text-[var(--muted)]">
                                    <tr className="text-xs font-semibold">
                                        <th className="px-6 py-4">Developer / User</th>
                                        <th className="px-6 py-4">API Key Info</th>
                                        <th className="px-6 py-4">Daily Usage (Today)</th>
                                        <th className="px-6 py-4">Activity (24h)</th>
                                        <th className="px-6 py-4">Last Used</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {keys.map((k, idx) => (
                                        <motion.tr
                                            key={k._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                            className="group hover:bg-[var(--foreground)]/[0.01] transition-colors"
                                        >
                                            {/* Developer Info */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-sm">
                                                        <User size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[var(--foreground)] font-bold">{k.userDetails?.name || "Unknown User"}</span>
                                                        <span className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
                                                            <Mail size={10} />
                                                            {k.userDetails?.email || "No email"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* API Key Info */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-[var(--foreground)]">{k.name}</span>
                                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${k.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                                            {k.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--muted)] bg-[var(--foreground)]/[0.03] w-fit px-2 py-1 rounded-md border border-[var(--border)]">
                                                        <Shield size={10} />
                                                        <span>•••• •••• •••• {k.lastFour}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Usage */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="w-full h-1.5 bg-[var(--foreground)]/[0.05] rounded-full overflow-hidden border border-[var(--border)]">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.min(((k.usedToday || 0) / (k.dailyLimit || 10000)) * 100, 100)}%` }}
                                                            className={`h-full ${(k.usedToday || 0) > (k.dailyLimit || 10000) * 0.8 ? 'bg-amber-500' : 'bg-[var(--accent)]'}`}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-[10px] font-bold text-[var(--foreground)]">₹{(k.usedToday || 0).toLocaleString()} used</span>
                                                        <span className="text-[10px] text-[var(--muted)]">Limit: ₹{(k.dailyLimit || 10000).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 24h Activity Status */}
                                            <td className="px-6 py-5">
                                                {k.hasRecentOrder ? (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                                        <Wifi size={12} className="animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--foreground)]/10 border border-[var(--border)] text-[var(--muted)]/60">
                                                        <WifiOff size={12} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Inactive</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Last Used */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2.5">
                                                    <Clock size={14} className="text-[var(--muted)]/40" />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-[var(--foreground)]">
                                                            {k.lastUsed ? new Date(k.lastUsed).toLocaleDateString() : "Never"}
                                                        </span>
                                                        <span className="text-[10px] text-[var(--muted)]">
                                                            {k.lastUsed ? new Date(k.lastUsed).toLocaleTimeString() : "--"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
 
                        {/* MOBILE LIST */}
                        <div className="lg:hidden space-y-4">
                            {keys.map((k, idx) => (
                                <motion.div
                                    key={k._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all overflow-hidden"
                                >
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--border)]/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--foreground)]/[0.05] border border-[var(--border)] flex items-center justify-center text-[var(--muted)]">
                                                <User size={18} />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-black text-[var(--foreground)] truncate uppercase leading-tight">{k.userDetails?.name || "Unknown User"}</span>
                                                <span className="text-[10px] text-[var(--muted)]/60 font-medium truncate lowercase">{k.userDetails?.email || "No email"}</span>
                                            </div>
                                        </div>
                                        {k.hasRecentOrder ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-black">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[8px] uppercase tracking-widest">Active</span>
                                            </div>
                                        ) : (
                                            <div className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)]/40 px-2">Offline</div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pb-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--muted)] opacity-30">Key Name</span>
                                            <span className="text-xs font-black text-[var(--foreground)] truncate uppercase">{k.name}</span>
                                            <span className="text-[10px] font-mono text-[var(--muted)] opacity-30 italic">•••• {k.lastFour}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-right">
                                            <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--muted)] opacity-30">Last Used</span>
                                            <span className="text-xs font-bold text-[var(--foreground)]">
                                                {k.lastUsed ? new Date(k.lastUsed).toLocaleDateString() : "Never"}
                                            </span>
                                            <span className="text-[9px] text-[var(--muted)] font-medium tabular-nums">
                                                {k.lastUsed ? new Date(k.lastUsed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "--"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-center text-[9px] mb-1.5">
                                            <span className="font-bold text-[var(--muted)] uppercase tracking-tighter opacity-40">Daily Usage</span>
                                            <span className="font-black text-[var(--foreground)] tabular-nums tracking-tighter shadow-sm">
                                                <span className="text-[var(--accent)] opacity-60">₹</span>{(k.usedToday || 0).toLocaleString()} <span className="opacity-10">/</span> ₹{(k.dailyLimit || 10000).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full h-1 bg-[var(--foreground)]/[0.05] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(((k.usedToday || 0) / (k.dailyLimit || 10000)) * 100, 100)}%` }}
                                                className={`h-full rounded-full transition-all duration-700 ease-out
                                                    ${(k.usedToday || 0) > (k.dailyLimit || 10000) * 0.8 
                                                        ? 'bg-amber-500' 
                                                        : 'bg-[var(--accent)]'}`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {!keys.length && (
                            <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-[2rem]">
                                <Key size={48} className="mx-auto text-[var(--muted)]/20 mb-4" />
                                <p className="text-sm font-medium text-[var(--muted)]">No active API keys found.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
