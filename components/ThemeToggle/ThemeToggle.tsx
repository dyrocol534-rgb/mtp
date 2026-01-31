"use client";

import { useEffect, useState } from "react";

const themes = [
  // 🌞 Core
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },

  // 🌸 Soft / Aesthetic
  { id: "sakura", icon: "🌸", label: "Sakura" },
  { id: "ocean", icon: "🌊", label: "Ocean" },
  { id: "forest", icon: "🍃", label: "Forest" },
  { id: "tropical", icon: "🌺", label: "Tropical" },
  { id: "ice", icon: "❄️", label: "Ice" },

  // 🧔 Manly / Strong
  { id: "steel", icon: "🔩", label: "Steel Gray" },
  { id: "gunmetal", icon: "🛠️", label: "Gunmetal" },
  { id: "midnightblack", icon: "🖤", label: "Midnight Black" },
  { id: "royalblue", icon: "👑", label: "Royal Blue" },
  { id: "bloodiron", icon: "🩸", label: "Blood Iron" },
  { id: "warzone", icon: "⚔️", label: "War Zone" },
  { id: "carbon", icon: "🏴", label: "Carbon Fiber" },

  // 💖 Girly / Cute
  { id: "rose", icon: "🌹", label: "Rose Blush" },
  { id: "lavender", icon: "💜", label: "Lavender Dream" },
  { id: "peach", icon: "🍑", label: "Peach Glow" },
  { id: "cotton", icon: "🍬", label: "Cotton Candy" },
  { id: "bubblegum", icon: "🎀", label: "Bubblegum Pop" },
  { id: "cherry", icon: "🍒", label: "Cherry Kiss" },
  { id: "vanilla", icon: "🍦", label: "Vanilla Cream" },

  // 💜 Fantasy / Anime
  { id: "violet", icon: "💜", label: "Violet" },
  { id: "midnight", icon: "🌪️", label: "Midnight" },
  { id: "galaxy", icon: "🌌", label: "Galaxy" },
  { id: "plasma", icon: "🧬", label: "Plasma" },
  { id: "crimson", icon: "🩸", label: "Crimson" },

  // 🔥 Energy / Action
  { id: "ember", icon: "🔥", label: "Ember" },
  { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "solar", icon: "🟡", label: "Solar Gold" },

  // 👾 Tech / Retro
  { id: "cyber", icon: "💠", label: "Cyber" },
  { id: "neon-night", icon: "🟣", label: "Neon Night" },
  { id: "retro", icon: "👾", label: "Retro" },
  { id: "arctic", icon: "🧊", label: "Arctic" },

  // 🎭 Minimal / Premium
  { id: "monochrome", icon: "🎭", label: "Monochrome" },
  { id: "aurora", icon: "🔵", label: "Aurora" },
  { id: "coffee", icon: "☕", label: "Coffee" },
  { id: "obsidian", icon: "🖤", label: "Obsidian" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

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
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className="relative inline-block text-left theme-toggle-container">
      {/* Current Theme Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-xs font-medium transition-colors"
        aria-label="Select Theme"
      >
        <span className="text-base">{currentTheme?.icon || "🎨"}</span>
        <span className="hidden sm:inline">{currentTheme?.label || "Theme"}</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto border border-[var(--border)]">
          <div className="p-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${theme === t.id
                  ? "bg-[var(--accent)] text-white font-semibold"
                  : "hover:bg-[var(--accent)]/10 text-[var(--foreground)]"
                  }`}
              >
                <span className="text-base">{t.icon}</span>
                <span className="flex-1">{t.label}</span>
                {theme === t.id && <span className="text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
