"use client";

import Link from "next/link";
import {
  Globe,
  Gamepad2,
  Layers,
  BookOpen,
  Trophy,
  Image as ImageIcon,
  BadgePercent,
} from "lucide-react";

/* ===================== CONFIG ===================== */

const topRow = [
  { title: "Region", href: "/region", icon: Globe },
  { title: "Games", href: "/games", icon: Gamepad2 },
  { title: "Services", href: "/services", icon: Layers },
  { title: "Blogs", href: "/blog", icon: BookOpen },
  { title: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

const bottomRow = [
  {
    title: "Image Grid",
    icon: ImageIcon,
    comingSoon: true,
  },
  {
    title: "Membership",
    icon: Trophy,
    href: "/games/membership/silver-membership",
  },
  {
    title: "Reseller",
    icon: Layers,
    href: "/games/membership/reseller-membership",
  },
  {
    title: "IDs on Sell",
    icon: BadgePercent,
    comingSoon: true,
  },
];

/* ===================== COMPONENT ===================== */

export default function HomeQuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6 space-y-6">
      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-5 gap-4">
        {topRow.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="
                group flex flex-col items-center justify-center gap-2 py-2
                transition-transform active:scale-95
              "
            >
              <Icon
                size={22}
                className="text-indigo-400 transition-transform group-hover:scale-110"
              />

              <span className="text-[12px] font-medium text-gray-300 text-center">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ================= BOTTOM ROW ================= */}
      <div className="grid grid-cols-4 gap-4">
        {bottomRow.map((item) => {
          const Icon = item.icon;

          const Content = (
            <div
              className={`
                flex flex-col items-center justify-center gap-2 py-2 text-center
                ${
                  item.comingSoon
                    ? "opacity-40"
                    : "transition-transform active:scale-95"
                }
              `}
            >
              <Icon size={22} className="text-indigo-400" />

              <span className="text-[12px] font-medium text-gray-300">
                {item.title}
              </span>

              {item.comingSoon && (
                <span className="text-[10px] text-gray-400">
                  Coming soon
                </span>
              )}
            </div>
          );

          return item.href ? (
            <Link key={item.title} href={item.href}>
              {Content}
            </Link>
          ) : (
            <div key={item.title}>{Content}</div>
          );
        })}
      </div>
    </section>
  );
}
