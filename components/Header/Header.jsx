"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus, FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "Blue Buff",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Region Check", href: "/region" },
    { label: "Services", href: "/services" },
  ],

  userMenu: {
    common: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Customer Support", href: "/dashboard" },
      { label: "Account Settings", href: "/dashboard" },
      { label: "My Wallet", href: "/dashboard" },
      { label: "My Orders", href: "/dashboard" },
      { label: "Membership", href: "/admin-panal" },
    ],
    roles: {
      owner: { label: "Admin Panel", href: "/owner-panal" },
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("/");

  const dropdownRef = useRef(null);
  const logoRef = useRef(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.user);
        else sessionStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (logoRef.current) {
        logoRef.current.style.transform = `rotate(${y * 0.15}deg)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "backdrop-blur-2xl bg-[var(--background)]/80 shadow-lg border-b border-[var(--border)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ================= LOGO ================= */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image
              ref={logoRef}
              src={HEADER_CONFIG.logo.src}
              alt={HEADER_CONFIG.logo.alt}
              width={HEADER_CONFIG.logo.width}
              height={HEADER_CONFIG.logo.height}
              priority
              className="h-9 w-auto transition-all duration-300 hover:scale-105"
            />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {HEADER_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className="relative px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)] transform origin-left transition-transform duration-300 ${activeNav === item.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
            <ThemeToggle />

            {/* USER BUTTON */}
            <button
              onClick={() => setUserMenuOpen((p) => !p)}
              className="relative flex items-center gap-2 h-9 px-3 rounded-full bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-[var(--accent)]/20 transition-all">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaUser className="text-white text-xs" />
                )}
              </div>
              {user && (
                <span className="hidden sm:block text-sm font-medium pr-1 max-w-[80px] truncate">
                  {user.name}
                </span>
              )}
            </button>

            {/* USER DROPDOWN */}
            <AnimatePresence>
              {userMenuOpen && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-72 max-h-[80vh] overflow-y-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl"
                >
                  {!user ? (
                    <>
                      {/* Navigation for non-logged users on mobile */}
                      <div className="md:hidden p-2 border-b border-[var(--border)]">
                        <p className="px-3 py-2 text-xs font-semibold text-[var(--muted)] uppercase">Navigation</p>
                        {HEADER_CONFIG.nav.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setUserMenuOpen(false);
                              setActiveNav(item.href);
                            }}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${activeNav === item.href
                              ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                              : "hover:bg-[var(--accent)]/5 text-[var(--muted)]"
                              }`}
                          >
                            <span className="text-sm">{item.label}</span>
                            <FiChevronRight className={activeNav === item.href ? "text-[var(--accent)]" : ""} />
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block p-6 text-center font-semibold hover:bg-[var(--accent)]/5 transition-colors"
                      >
                        Login / Register
                      </Link>
                    </>
                  ) : (
                    <>

                      {/* User Info Header with Logout */}
                      <div className="p-4 bg-gradient-to-br from-[var(--accent)]/10 to-purple-600/10 border-b border-[var(--border)]">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {user?.avatar ? (
                              <Image
                                src={user.avatar}
                                alt="Avatar"
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <FaUser className="text-white text-lg" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{user.name}</p>
                            <p className="text-xs text-[var(--muted)] truncate">
                              {user.email}
                            </p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-medium transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      </div>


                      {/* Navigation Items (Mobile Only) */}
                      <div className="md:hidden p-2 border-b border-[var(--border)]">
                        <p className="px-3 py-2 text-xs font-semibold text-[var(--muted)] uppercase">Navigation</p>
                        {HEADER_CONFIG.nav.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setUserMenuOpen(false);
                              setActiveNav(item.href);
                            }}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${activeNav === item.href
                              ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                              : "hover:bg-[var(--accent)]/5"
                              }`}
                          >
                            <span className="text-sm">{item.label}</span>
                            <FiChevronRight className={activeNav === item.href ? "text-[var(--accent)]" : "text-[var(--muted)]"} />
                          </Link>
                        ))}
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {HEADER_CONFIG.userMenu.common.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--accent)]/5 transition-colors group"
                          >
                            <span className="text-sm">{item.label}</span>
                            <FiChevronRight className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}

                        {user?.userType &&
                          HEADER_CONFIG.userMenu.roles[user.userType] && (
                            <Link
                              href={
                                HEADER_CONFIG.userMenu.roles[user.userType].href
                              }
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--accent)]/5 transition-colors group"
                            >
                              <span className="text-sm font-medium">
                                {
                                  HEADER_CONFIG.userMenu.roles[user.userType]
                                    .label
                                }
                              </span>
                              <FiChevronRight className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                            </Link>
                          )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </header>
  );
}
