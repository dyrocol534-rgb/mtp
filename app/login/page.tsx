"use client";

import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShield,
  FiZap,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
  FiTerminal
} from "react-icons/fi";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function AuthContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("");
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleGoogleLogin = async (credential: string) => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Authentication Protocol Failed");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.user.name);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("userId", data.user.userId);
      sessionStorage.setItem("phone", data.user.phone || "");
      sessionStorage.setItem("avatar", data.user.avatar || "");

      setUserName(data.user.name);
      setSuccess("done");

      setTimeout(() => {
        window.location.replace(redirectPath);
      }, 1500);
    } catch {
      setError("Nexus Connection Interrupted");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-12 sm:pt-20 px-4 overflow-hidden bg-[var(--background)]">
      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--accent-rgb),0.15),transparent_70%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="w-full relative">




          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="px-6 pt-0 pb-4 sm:px-8 sm:pt-0 sm:pb-4"
          >
            {/* HEADER */}
            <div className="flex flex-col items-center text-center mb-6">
              <motion.div
                variants={itemVariants}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative mb-4"
              >
                <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-20 animate-pulse" />
                <Image
                  src="/logoBB.png"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="relative z-10"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground)]/60 drop-shadow-sm">
                  Access Account
                </h1>
                <p className="text-sm font-medium text-[var(--muted)]/80 tracking-wide mt-2">
                  Sign in to continue
                </p>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {/* STATUS MESSAGES */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3 text-center"
                >
                  <FiCheckCircle className="text-emerald-500" size={18} />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Login Successful</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-3 text-center"
                >
                  <FiAlertCircle className="text-red-500" size={18} />
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION AREA */}
            {!success && (
              <motion.div variants={containerVariants} className="space-y-6">
                <motion.div variants={itemVariants} className={`relative group ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-full opacity-20 blur transition duration-500 group-hover:opacity-40" />
                  <div className="relative flex justify-center transition-transform duration-200 active:scale-[0.98] scale-110 origin-center my-0">
                    <GoogleLogin
                      onSuccess={(res) => res.credential && handleGoogleLogin(res.credential)}
                      onError={() => setError("Connection Failed")}
                      theme="filled_black"
                      size="large"
                      shape="pill"
                      text="continue_with"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    <Feature icon={FiShield} label="Encrypted" />
                    <Feature icon={FiZap} label="Instant" />
                    <Feature icon={FiActivity} label="Dynamic" />
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
                      Authorized use only. By proceeding you sync with our <a href="/terms" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors underline decoration-dotted">Terms</a> • <a href="/privacy" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors underline decoration-dotted">Privacy</a>
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--foreground)]/[0.02] border border-[var(--border)]/50">
                      <FiLock size={10} className="text-emerald-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)]">
                        Hardware Secured <span className="text-emerald-500">•</span> <span className="text-emerald-500">Google OAuth 2.0</span>
                      </span>
                    </div>
                  </div>
                </motion.div>


              </motion.div>
            )}



          </motion.div>
        </div>


      </motion.div >
    </section >
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}

function Feature({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-[var(--foreground)]/[0.02] border border-[var(--border)] hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all duration-300">
      <div className="w-8 h-8 rounded-xl bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-all">
        <Icon size={16} />
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">{label}</span>
    </div>
  );
}
