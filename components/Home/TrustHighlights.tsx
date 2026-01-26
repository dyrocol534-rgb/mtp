"use client";

import { memo } from "react";
import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

/* ================= DATA ================= */

const HIGHLIGHTS = [
  {
    title: "24/7",
    subtitle: "Instant Delivery",
    icon: FaBolt,
    accent: "from-yellow-400/20 to-orange-400/20",
    text: "text-yellow-400",
  },
  {
    title: "100%",
    subtitle: "Safe & Legitimate",
    icon: FaShieldAlt,
    accent: "from-green-400/20 to-emerald-400/20",
    text: "text-green-400",
  },
  {
    title: "Easy",
    subtitle: "Secure Payments",
    icon: FaCreditCard,
    accent: "from-blue-400/20 to-cyan-400/20",
    text: "text-blue-400",
  },
  {
    title: "24/7",
    subtitle: "Instant Support",
    icon: FaHeadset,
    accent: "from-purple-400/20 to-pink-400/20",
    text: "text-purple-400",
  },
  {
    title: "Trusted",
    subtitle: "By Thousands",
    icon: FaUsers,
    accent: "from-yellow-300/20 to-amber-400/20",
    text: "text-yellow-300",
  },
  {
    title: "Fast",
    subtitle: "Automated Topups",
    icon: FaRobot,
    accent: "from-cyan-400/20 to-sky-400/20",
    text: "text-cyan-400",
  },
];

/* ================= CARD ================= */

const HighlightCard = memo(function HighlightCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  text,
}: {
  title: string;
  subtitle: string;
  icon: any;
  accent: string;
  text: string;
}) {
  return (
    <div
      className="
        group relative rounded-xl
        px-3 py-4 sm:px-4 sm:py-5
        text-center
        bg-[var(--card)]
        border border-[var(--border)]
        transition-all duration-200 ease-out
        hover:border-[var(--accent)]
        hover:bg-[var(--card)]/90
      "
    >
      {/* Soft glow */}
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-xl
          opacity-0 group-hover:opacity-100
          bg-gradient-to-br ${accent}
          transition-opacity duration-300
        `}
      />

      <div className="relative z-10 flex flex-col items-center gap-1.5">
        {/* Icon */}
        <div
          className={`
            flex items-center justify-center
            w-9 h-9 sm:w-10 sm:h-10
            rounded-full
            bg-black/30 border border-white/10
            ${text}
          `}
        >
          <Icon className="text-sm sm:text-base" aria-hidden />
        </div>

        {/* Title */}
        <p className={`text-base sm:text-lg font-bold leading-none ${text}`}>
          {title}
        </p>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs text-[var(--muted)]">
          {subtitle}
        </p>
      </div>
    </div>
  );
});

/* ================= SECTION ================= */

export default function TrustHighlights() {
  return (
    <section
      className="
        py-8 sm:py-10 px-4
        bg-[var(--background)]
        text-[var(--foreground)]
      "
      aria-label="Trust highlights"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="
            grid gap-3 sm:gap-4
            grid-cols-3
            md:grid-cols-3
            lg:grid-cols-6
          "
        >
          {HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.subtitle} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
