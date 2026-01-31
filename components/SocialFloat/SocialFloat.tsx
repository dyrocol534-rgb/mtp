"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaShareNodes,
} from "react-icons/fa6";

/* ================= CONFIG ================= */

const ALLOWED_ROUTES = ["/", "/home"];

/* ================= DATA ================= */

const socialLinks = [
  {
    name: "Twitter",
    icon: FaXTwitter,
    url: "https://www.instagram.com/mlbbtopup.in/",
    color: "from-gray-700 to-black",
    hoverColor: "from-gray-800 to-black",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/mlbbtopup.in/",
    color: "from-pink-500 to-purple-600",
    hoverColor: "from-pink-600 to-purple-700",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.instagram.com/mlbbtopup.in/",
    color: "from-red-500 to-red-600",
    hoverColor: "from-red-600 to-red-700",
  },
];

/* ================= COMPONENT ================= */

export default function SocialFloat() {
  /* ---------- ROUTE GUARD ---------- */
  const pathname = usePathname();
  if (!ALLOWED_ROUTES.includes(pathname)) return null;

  /* ---------- STATE ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  /* ---------- REFS ---------- */
  const containerRef = useRef<HTMLDivElement>(null);

  /* ================= CLOSE ON OUTSIDE CLICK ================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  /* ================= SCROLL DIRECTION HANDLER ================= */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      // Hide on scroll down (only if menu closed)
      if (currentY > lastScrollY && currentY > 60 && !isOpen) {
        setIsVisible(false);
      }
      // Show on scroll up
      else {
        setIsVisible(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  /* ================= SHARE ================= */

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "topupmlbb.in",
          text: "Check out this awesome MLBB top-up site!",
          url: window.location.href,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  /* ================= UI ================= */

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {/* ================= FLOATING MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                    aria-label={social.name}
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                    />

                    {/* Button */}
                    <div
                      className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${social.color} shadow-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                    >
                      <Icon className="text-lg" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15 }}
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-2"
            />

            {/* Share Button */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={handleShare}
                className="group relative block"
                aria-label="Share"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Button */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <FaShareNodes className="text-lg" />
                </div>
              </button>
            </motion.div>

            {/* Support Button */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                href="https://ko-fi.com/zynxv1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label="Support"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Button */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaHeart className="text-lg" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TOGGLE BUTTON ================= */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative"
        aria-label="Toggle social menu"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-60"
        />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}
