"use client";

import { motion } from "framer-motion";
import { FiZap, FiShield, FiCpu, FiStar } from "react-icons/fi";

const messages = [
  { text: "Welcome to", highlight: "BlueBuff Elite Store", icon: FiStar },
  { text: "Experience", highlight: "Instant & Secure", icon: FiZap },
  { text: "Reliable", highlight: "24×7 Automated", icon: FiCpu },
  { text: "The Ultimate", highlight: "Reseller Hub", icon: FiShield },
];

export default function ScrollingNoticeBand() {
  const content = (
    <div className="flex items-center gap-12 pr-12">
      {messages.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
            <item.icon size={14} />
          </div>
          <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] italic text-[var(--muted)]">
            {item.text}{" "}
            <span className="text-[var(--foreground)] drop-shadow-[0_0_8px_var(--accent)]/20">
              {item.highlight}
            </span>
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 mx-2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[var(--card)]/40 backdrop-blur-md border-y border-[var(--border)] py-3 mt-4">
      {/* Decorative Glows / Fades */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex w-fit"
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}
