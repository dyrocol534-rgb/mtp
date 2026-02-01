"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ValentinePopup() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });

  useEffect(() => {
    const seen = sessionStorage.getItem("valentine_popup_seen");
    if (!seen) {
      const timerId = setTimeout(() => setShow(true), 1500); // Delay for better UX
      return () => clearTimeout(timerId);
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 1, 14); // Feb 14

    if (now > targetDate) {
      targetDate = new Date(now.getFullYear() + 1, 1, 14);
    }

    const timer = setInterval(() => {
      const current = new Date().getTime();
      const distance = targetDate.getTime() - current;

      if (distance <= 0) {
        setTimeLeft((prev) => ({ ...prev, message: "It's Valentine's Day! 💖" }));
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        message: "",
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("valentine_popup_seen", "true");
  };

  const handleRedirect = () => {
    setShow(false);
    sessionStorage.setItem("valentine_popup_seen", "true");
    router.push("/special-leaderboard");
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[var(--card)] border border-rose-500/20 rounded-[40px] p-8 md:p-12 text-center shadow-[0_40px_100px_rgba(244,63,94,0.3)] overflow-hidden transition-colors"
          >
            {/* Interior Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-500/10 rounded-full blur-[60px]" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center justify-center z-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10">
              {/* Floating Heart Icon */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-7xl mb-6 inline-block drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]"
              >
                💝
              </motion.div>

              {/* Title Section */}
              <h2 className="text-4xl md:text-5xl font-[900] italic tracking-tighter uppercase leading-none mb-3 text-[var(--foreground)] transition-colors">
                VALENTINE <span className="text-rose-500">SPECIAL</span>
              </h2>
              <p className="text-[var(--muted)] text-[10px] font-black uppercase tracking-[0.3em] mb-8 italic opacity-60 transition-colors">
                SPREAD THE LOVE & WIN REWARDS
              </p>

              {/* Countdown Grid */}
              <div className="grid grid-cols-4 gap-3 mb-10">
                {timeLeft.message ? (
                  <div className="col-span-4 py-4 text-rose-500 font-black italic uppercase tracking-widest text-lg">
                    {timeLeft.message}
                  </div>
                ) : (
                  Object.entries(timeLeft).filter(([key]) => key !== 'message').map(([unit, value]) => (
                    <div key={unit} className="bg-[var(--background)] border border-[var(--border)] rounded-2xl py-3 px-1 transition-colors">
                      <div className="text-xl md:text-2xl font-black text-[var(--foreground)] italic tracking-tighter leading-none transition-colors">
                        {value}
                      </div>
                      <div className="text-[9px] font-black text-[var(--muted)] uppercase tracking-tighter mt-1 opacity-40 transition-colors">
                        {unit}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Reward Badge */}
              <div className="mb-10 px-6 py-2 rounded-full border border-rose-500/10 bg-rose-500/5 backdrop-blur-sm inline-block">
                <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest leading-none">
                  🎁 Prizes for Top 10 Participants
                </span>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleRedirect}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-[24px] bg-rose-500 text-white font-[900] uppercase tracking-widest text-sm italic shadow-[0_15px_30px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.5)] transition-all"
              >
                Enter the Special Arena 🏆
              </motion.button>
            </div>
          </motion.div>

          {/* Surprise Particle Burst (Decorative) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.5, 1.2, 0.8],
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute left-1/2 top-1/2 text-rose-500/20 text-4xl"
              >
                ❤️
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
