"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Gamepad2,
  Layers,
  BookOpen,
  Trophy,
  Image as ImageIcon,
  BadgePercent,
  Zap,
  Crown,
  LayoutGrid,
  Flower2
} from "lucide-react";

/* ===================== CONFIG ===================== */

const topRow = [
  { title: "Scanner", href: "/region", icon: Globe },
  { title: "Games", href: "/games", icon: Gamepad2 },
  { title: "Services", href: "/services", icon: Layers },
  { title: "Blogs", href: "/blog", icon: BookOpen },
  { title: "Leader", href: "/leaderboard", icon: Trophy },
];

const bottomRow = [
  { title: "Silver", href: "/games/membership/silver-membership", icon: Crown },
  { title: "Reseller", href: "/games/membership/reseller-membership", icon: Zap },
  {
    title: "Valentine",
    icon: Flower2,
    href: "/special-leaderboard",
    isColorful: true,
    accent: "from-rose-400 to-pink-600"
  },
  { title: "Skins Grid", icon: LayoutGrid, comingSoon: true },
  { title: "Market", icon: BadgePercent, comingSoon: true },
];

/* ===================== COMPONENT ===================== */

export default function HomeQuickActions() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 mt-8 pb-4 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[var(--accent)]/5 via-transparent to-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-2">
        {/* ================= TOP ROW ================= */}
        <div className="grid grid-cols-5 gap-2">
          {topRow.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className="
                  group flex flex-col items-center justify-center py-2 px-1
                  transition-all duration-300
                  active:scale-95
                "
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/5 flex items-center justify-center transition-all group-hover:bg-[var(--accent)]/15 group-hover:scale-110 group-hover:-rotate-3">
                  <item.icon
                    size={20}
                    className="text-[var(--accent)] transition-all group-hover:drop-shadow-[0_0_8px_var(--accent)]"
                  />
                </div>

                <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="grid grid-cols-5 gap-2">
          {bottomRow.map((item, index) => {
            const isColorful = item.isColorful;

            const Content = (
              <div
                className={`
                  group flex flex-col items-center justify-center py-2 px-1
                  transition-all duration-300
                  ${item.comingSoon ? "opacity-30 grayscale cursor-not-allowed" : "active:scale-95"}
                `}
              >
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                  ${item.comingSoon
                    ? "bg-[var(--muted)]/5 text-[var(--muted)]"
                    : isColorful
                      ? `bg-gradient-to-br ${item.accent} text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 group-hover:rotate-6`
                      : "bg-[var(--accent)]/5 text-[var(--accent)] group-hover:bg-[var(--accent)]/15 group-hover:scale-110 group-hover:-rotate-3"
                  }
                `}>
                  <item.icon size={20} className={isColorful ? "drop-shadow-sm" : ""} />
                </div>

                <span className={`
                  mt-2 text-[10px] font-black uppercase tracking-widest transition-colors
                  ${isColorful ? "text-rose-500" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"}
                `}>
                  {item.title}
                </span>
                {item.comingSoon && (
                  <span className="text-[7px] font-bold text-[var(--muted)] uppercase tracking-tighter mt-0.5">Soon</span>
                )}
              </div>
            );

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                {item.href ? (
                  <Link href={item.href} className="block group">
                    {Content}
                  </Link>
                ) : (
                  <div>{Content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
