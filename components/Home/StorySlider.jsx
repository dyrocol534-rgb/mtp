"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiTrendingUp, FiZap, FiStar } from "react-icons/fi";

const storyData = [
  {
    id: 1,
    title: "Weekly Bundle",
    badge: "Hot",
    icon: <FiZap size={8} />,
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1769872025/WhatsApp_Image_2026-01-31_at_20.33.31_nzn2ll.jpg",
    link: "/games/weeklymonthly-bundle931",
  },
  {
    id: 2,
    title: "MLBB India",
    badge: "Live",
    icon: <FiTrendingUp size={8} />,
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1769533093/WhatsApp_Image_2026-01-27_at_17.19.53_gfrfdn.jpg",
    link: "/games/mobile-legends988",
  },
  {
    id: 3,
    title: "MLBB Double",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1769515824/WhatsApp_Image_2026-01-27_at_17.39.55_w4gtnf.jpg",
    link: "/games/mlbb-double332",
  },
  {
    id: 4,
    title: "MLBB Small",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1769515220/WhatsApp_Image_2026-01-27_at_17.25.55_torxmi.jpg",
    link: "/games/mlbb-smallphp980",
  },
  {
    id: 5,
    title: "PUBG Mobile",
    badge: "Sale",
    icon: <FiStar size={8} />,
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768502877/WhatsApp_Image_2026-01-16_at_00.15.15_sbkqaz.jpg",
    link: "/games/pubg-mobile138",
  },
  {
    id: 6,
    title: "Membership",
    image:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1767096434/rs_klee62.png",
    link: "/games/membership/silver-membership",
  },
];

export default function StorySlider() {
  return (
    <section className="relative mt-2 mb-2 overflow-hidden px-2">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-[var(--accent)]/10 blur-[60px] rounded-full pointer-events-none" />

      <div
        className="
          flex gap-5 py-4
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          overscroll-x-contain
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          relative z-10
        "
      >
        {storyData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, x: 50, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.08
            }}
          >
            <Link
              href={item.link}
              className="
                group relative flex flex-col items-center
                min-w-[85px]
                snap-start
                transition-all duration-300
              "
            >
              {/* CYBER RING */}
              <div className="relative">
                <motion.div
                  className="
                    rounded-full p-[2px]
                    transition-all duration-500
                    group-hover:rotate-180
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-hover), #4f46e5, var(--accent))",
                    boxShadow: "0 0 15px var(--accent)/20"
                  }}
                >
                  <div className="rounded-full bg-[var(--background)] p-[2.5px]">
                    <div
                      className="
                        relative w-[72px] h-[72px]
                        rounded-full overflow-hidden
                        ring-4 ring-black/50
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="72px"
                        priority={item.id <= 3}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Inner Overlay Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>

                {/* Pulsating Badge */}
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="
                      absolute -top-1 -right-1
                      px-2 py-0.5
                      rounded-full
                      bg-[var(--accent)]
                      text-[7px] font-black uppercase tracking-tighter italic text-black
                      flex items-center gap-1
                      shadow-[0_4px_10px_rgba(var(--accent-rgb),0.4)]
                      z-20
                      border border-black/20
                    "
                  >
                    {item.icon}
                    {item.badge}
                  </motion.div>
                )}
              </div>

              {/* TITLE */}
              <div className="mt-3 relative">
                <span
                  className="
                    text-[9px] font-black uppercase tracking-[0.15em] italic
                    text-[var(--muted)] group-hover:text-[var(--accent)]
                    transition-colors duration-300
                    text-center block
                    leading-tight
                    max-w-[85px]
                  "
                >
                  {item.title}
                </span>

                {/* Active Indicator Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="h-[1px] w-full bg-[var(--accent)] mt-1 origin-center"
                />
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-2 bg-[var(--accent)]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
