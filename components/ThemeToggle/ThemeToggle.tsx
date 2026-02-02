"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, ChevronDown, Check } from "lucide-react";

interface ThemeItem {
  id: string;
  icon: string;
  label: string;
}

const themes: ThemeItem[] = [
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },
  { id: "sakura", icon: "🌸", label: "Sakura" },
  { id: "ocean", icon: "🌊", label: "Ocean" },
  { id: "forest", icon: "🍃", label: "Forest" },
  { id: "tropical", icon: "🌺", label: "Tropical" },
  { id: "ice", icon: "❄️", label: "Ice" },
  { id: "steel", icon: "🔩", label: "Steel" },
  { id: "gunmetal", icon: "🛠️", label: "Gunmetal" },
  { id: "midnightblack", icon: "🖤", label: "Midnight" },
  { id: "royalblue", icon: "👑", label: "Royal" },
  { id: "bloodiron", icon: "🩸", label: "Blood" },
  { id: "warzone", icon: "⚔️", label: "Warzone" },
  { id: "carbon", icon: "🏴", label: "Carbon" },
  { id: "rose", icon: "🌹", label: "Rose" },
  { id: "lavender", icon: "💜", label: "Lavender" },
  { id: "peach", icon: "🍑", label: "Peach" },
  { id: "cotton", icon: "🍬", label: "Cotton" },
  { id: "bubblegum", icon: "🎀", label: "Bubblegum" },
  { id: "cherry", icon: "🍒", label: "Cherry" },
  { id: "vanilla", icon: "🍦", label: "Vanilla" },
  { id: "violet", icon: "💜", label: "Violet" },
  { id: "midnight", icon: "🌪️", label: "Midnight" },
  { id: "galaxy", icon: "🌌", label: "Galaxy" },
  { id: "plasma", icon: "🧬", label: "Plasma" },
  { id: "crimson", icon: "🩸", label: "Crimson" },
  { id: "ember", icon: "🔥", label: "Ember" },
  { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "solar", icon: "🟡", label: "Solar" },
  { id: "cyber", icon: "💠", label: "Cyber" },
  { id: "neon-night", icon: "🟣", label: "Neon" },
  { id: "retro", icon: "👾", label: "Retro" },
  { id: "arctic", icon: "🧊", label: "Arctic" },
  { id: "monochrome", icon: "🎭", label: "Classic" },
  { id: "aurora", icon: "🔵", label: "Aurora" },
  { id: "coffee", icon: "☕", label: "Coffee" },
  { id: "obsidian", icon: "🖤", label: "Obsidian" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Change theme handler
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const currentTheme = themes.find((t) => t.id === theme) || themes[1]; // Fallback to Dark

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "var(--card-hover)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all duration-200 shadow-sm"
      >
        <span className="text-base leading-none">{currentTheme.icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">
          {currentTheme.label}
        </span>
        <ChevronDown
          size={12}
          className={`opacity-40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "circOut" }}
            className="absolute right-0 mt-3 w-72 bg-[var(--card)]/98 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-[var(--border)] overflow-hidden z-[100] origin-top-right ring-1 ring-white/5"
          >
            <div className="max-h-[360px] overflow-y-auto custom-scrollbar p-1.5">
              <div className="grid grid-cols-2 gap-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all duration-200 group ${theme === t.id
                        ? "bg-[var(--accent)] text-white font-bold shadow-lg shadow-[var(--accent)]/30"
                        : "hover:bg-[var(--accent)]/10 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                      }`}
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{t.icon}</span>
                    <span className="flex-1 truncate tracking-tight">{t.label}</span>
                    {theme === t.id && <Check size={12} strokeWidth={4} className="flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}
