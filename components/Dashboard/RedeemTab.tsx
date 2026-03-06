"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGift, FiLoader, FiZap } from "react-icons/fi";

interface RedeemTabProps {
    setWalletBalance: (balance: number) => void;
}

export default function RedeemTab({ setWalletBalance }: RedeemTabProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/redeem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ code: code.trim() })
            });
            const data = await res.json();

            if (data.success) {
                alert(data.message);
                setCode("");
                setWalletBalance(data.newBalance);
                // Dispatch event for other components (like WalletTab or Header)
                window.dispatchEvent(new Event("walletUpdated"));
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Redemption failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            {/* TACTICAL HEADER */}
            <div className="text-center mb-10 space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]">
                    <FiGift className="text-blue-500" size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--foreground)]">Redeem <span className="text-blue-400">Gift Code</span></h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--muted)] opacity-60 mt-1 italic">Input code to claim instant wallet credits</p>
                </div>
            </div>

            {/* INPUT FORM */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group h-full"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />

                <form onSubmit={handleRedeem} className="relative p-8 sm:p-10 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] flex items-center gap-2">
                            <FiZap className="text-blue-400" /> Secure Code Input
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="TK-XXXX-XXXX"
                                className="w-full p-6 pb-2 rounded-2xl border-b-2 border-[var(--border)] bg-white/5 focus:bg-white/[0.08] focus:border-blue-500/50 text-3xl font-black italic tracking-[0.1em] text-[var(--foreground)] placeholder:text-[var(--muted)]/20 outline-none transition-all uppercase text-center"
                                autoFocus
                            />
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[9px] text-center font-bold text-[var(--muted)] uppercase tracking-widest opacity-40">Ensure you enter the full code with prefix if applicable</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !code.trim()}
                        className="w-full p-5 rounded-2xl bg-blue-500 text-white font-black uppercase tracking-[0.2em] italic text-sm shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] hover:bg-blue-600 hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-3"
                    >
                        {loading ? <FiLoader className="animate-spin" size={20} /> : "Validate & Redeem"}
                    </button>
                </form>
            </motion.div>

            {/* FOOTER NOTICE */}
            <div className="mt-10 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                    <FiZap size={14} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-yellow-500 tracking-wider">Operational Protocol</p>
                    <p className="text-[10px] font-medium text-[var(--muted)] leading-relaxed">
                        Gift codes are single-use assets. Once successfully validated, credits will be added to your account instantly.
                        If you encounter any issues with a legitimate code, please contact tactical support.
                    </p>
                </div>
            </div>
        </div>
    );
}
