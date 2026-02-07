"use client";

import { motion } from "framer-motion";
import { FiUsers, FiGlobe, FiZap, FiArrowRight, FiMessageCircle } from "react-icons/fi";

const SERVICES = [
  {
    title: "Reseller Program",
    desc: "Scale your business with market-leading rates. Bulk solutions with instant delivery.",
    icon: FiUsers,
    badge: "LOWEST RATES",
  },
  {
    title: "Whitelabel Site",
    desc: "Launch your own branded empire. Fully hosted platform with integrated automation.",
    icon: FiGlobe,
    badge: "READY TO GO",
  },
  {
    title: "Enterprise Portals",
    desc: "Tailor-made top-up portals designed for specific large-scale business needs.",
    icon: FiZap,
    badge: "CUSTOM BUILD",
  },
];

export default function HomeServices() {
  const whatsappLink = "https://wa.me/919178521537";

  return (
    <section className="py-12 bg-[var(--background)] px-6 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER SECTION - COMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/10 mb-3">
            <span className="text-[var(--accent)] text-[8px] font-black uppercase tracking-widest italic">Expansion Pack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-[900] italic tracking-tighter uppercase leading-none mb-2">
            ELITE <span className="text-[var(--accent)]">SOLUTIONS</span>
          </h2>
          <p className="text-[var(--muted)] text-[9px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            Professional Tools for Professional Scale
          </p>
        </motion.div>

        {/* SERVICES GRID - COMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-[32px] bg-[var(--card)]/40 backdrop-blur-sm border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Icon Container - Smaller */}
              <div className="w-14 h-14 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]/60 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all shadow-md group-hover:scale-110 mb-5">
                <service.icon size={24} />
              </div>

              {/* Content */}
              <div className="space-y-2 mb-6">
                <span className="text-[7px] font-black px-2 py-0.5 rounded bg-[var(--accent)]/5 text-[var(--accent)]/60 border border-[var(--accent)]/10 tracking-widest uppercase italic">
                  {service.badge}
                </span>
                <h3 className="text-lg font-[900] uppercase tracking-tighter italic text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-none">
                  {service.title}
                </h3>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed opacity-60 italic max-w-[240px]">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <button
                onClick={() => window.open(whatsappLink, "_blank")}
                className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)]/60 group-hover:text-[var(--accent)] transition-all"
              >
                CONNECT NOW <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Accent Bar */}
              <div className="absolute inset-x-12 bottom-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA STRIP - COMPACT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => window.open(whatsappLink, "_blank")}
            className="px-6 py-3 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all flex items-center gap-2 mx-auto shadow-md group active:scale-95"
          >
            <FiMessageCircle size={14} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Discuss Custom Architecture</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
