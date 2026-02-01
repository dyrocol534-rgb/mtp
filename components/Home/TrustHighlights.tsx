"use client";

import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiCreditCard,
  FiPhone,
  FiUsers,
  FiCpu
} from "react-icons/fi";

const HIGHLIGHTS = [
  {
    label: "VELOCITY",
    value: "24/7",
    subtitle: "Instant Delivery",
    icon: FiZap,
    color: "#56CCF2",
  },
  {
    label: "FORTRESS",
    value: "100%",
    subtitle: "Safe & Legal",
    icon: FiShield,
    color: "#56CCF2",
  },
  {
    label: "GATEWAY",
    value: "PURE",
    subtitle: "Secure Payments",
    icon: FiCreditCard,
    color: "#56CCF2",
  },
  {
    label: "SUPPORT",
    value: "ELITE",
    subtitle: "Instant Assist",
    icon: FiPhone,
    color: "#56CCF2",
  },
  {
    label: "COMMUNITY",
    value: "10K+",
    subtitle: "Trusted Players",
    icon: FiUsers,
    color: "#56CCF2",
  },
  {
    label: "ENGINE",
    value: "AUTO",
    subtitle: "Automated Flow",
    icon: FiCpu,
    color: "#56CCF2",
  },
];

export default function TrustHighlights() {
  return (
    <section className="py-12 bg-[var(--background)] px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="group relative p-5 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[#56CCF2]/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* ICON TAG */}
                <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[#56CCF2]/60 group-hover:text-[#56CCF2] group-hover:bg-[#56CCF2]/10 transition-all shadow-sm">
                  <item.icon size={18} />
                </div>

                {/* LABEL */}
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted)] opacity-30 italic leading-none">
                  {item.label}
                </div>

                {/* VALUE & SUBTITLE */}
                <div className="space-y-0.5">
                  <h3 className="text-xl font-[1000] italic uppercase tracking-tighter text-[var(--foreground)] group-hover:text-[#56CCF2] transition-colors leading-none">
                    {item.value}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50 italic">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* SIDE GLOW ON HOVER */}
              <div className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#56CCF2]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
