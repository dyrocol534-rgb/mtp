"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiSearch, FiGrid, FiList, FiTrendingUp, FiZap, FiPackage } from "react-icons/fi";

import GameGrid from "@/components/Games/GameGrid";
import GameList from "@/components/Games/GameList";
import FilterModal from "@/components/Games/FilterModal";
import ServiceGridSection from "@/components/Games/ServiceGridSection";

export default function GamesPage() {
  /* ================= STATE ================= */
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  const [featuredGames, setFeaturedGames] = useState([]);
  const [mlbbVeriant, setMlbbVeriant] = useState([]);

  const [otts, setOtts] = useState(null);
  const [memberships, setMemberships] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= CONFIG ================= */
  const WEEKLY_PASS_SLUG = "mobile-legends988";

  const outOfStockGames = [
    "mobile-legends-backup826"
  ];

  const outOfStockSet = useMemo(() => new Set(outOfStockGames), []);

  const isOutOfStock = useCallback(
    (name) => outOfStockSet.has(name),
    [outOfStockSet]
  );

  /* ================= FETCH ================= */
  useEffect(() => {
    let mounted = true;

    const loadGames = async () => {
      try {
        const res = await fetch("/api/games");
        const json = await res.json();
        if (!mounted) return;

        let fetchedGames = json?.data?.games || [];
        let fetchedFeatured = json?.data?.featuredGames || [];
        let fetchedMlbbVariant = json?.data?.mlbbVariants || [];

        // Duplicate Weekly Pass (same slug)
        const weeklyPassSource = fetchedGames.find(
          (g) => g.gameSlug === WEEKLY_PASS_SLUG
        );

        if (weeklyPassSource) {
          const alreadyExists = fetchedGames.some(
            (g) =>
              g.gameSlug === WEEKLY_PASS_SLUG &&
              g.gameName === "Weekly Pass",
          );

          if (!alreadyExists) {
            fetchedGames.push({
              ...weeklyPassSource,
              gameName: "Weekly Pass",
              _variant: "weekly-pass",
              gameImageId: {
                image:
                  "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768536006/WhatsApp_Image_2026-01-16_at_08.50.36_tviv2b.jpg",
              },
            });
          }
        }

        setCategory(json?.data?.category || []);
        setGames(fetchedGames);
        setFeaturedGames(fetchedFeatured);
        setMlbbVeriant(fetchedMlbbVariant);

        setOtts(json?.data?.otts || null);
        setMemberships(json?.data?.memberships || null);
      } catch (err) {
        console.error("Failed to load games:", err);
      }
    };

    loadGames();
    return () => (mounted = false);
  }, []);

  /* ================= FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  /* ================= PROCESSING ================= */
  const processList = useCallback((list) => {
    let result = [...list];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((g) => g.gameName.toLowerCase().includes(q));
    }
    if (hideOOS) {
      result = result.filter((g) => !isOutOfStock(g.gameName));
    }
    if (sort === "az") {
      result.sort((a, b) => a.gameName.localeCompare(b.gameName));
    } else if (sort === "za") {
      result.sort((a, b) => b.gameName.localeCompare(a.gameName));
    }
    return result;
  }, [searchQuery, hideOOS, sort, isOutOfStock]);

  const processedGames = useMemo(() => processList(games), [games, processList]);
  const processedFeaturedGames = useMemo(() => processList(featuredGames), [featuredGames, processList]);
  const processedMlbbGames = useMemo(() => processList(mlbbVeriant), [mlbbVeriant, processList]);

  const isEmpty = processedGames.length === 0 && processedFeaturedGames.length === 0 && processedMlbbGames.length === 0;

  /* ================= HANDLERS ================= */
  const clearFilters = () => {
    setSort("az");
    setHideOOS(false);
    setSearchQuery("");
  };

  /* ================= RENDER COMPONENTS ================= */
  const SectionHeader = ({ title, icon: Icon, count, gradient }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter italic">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 bg-[var(--accent)] rounded-full" />
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.2em]">
            {count} Items Found
          </span>
        </div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= TOP SEARCH & CONTROLS ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)]/40 backdrop-blur-xl border border-[var(--border)] rounded-[2rem] p-4 sm:p-6 mb-12 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* SEARCH */}
            <div className="relative w-full flex-1">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--accent)] text-lg transition-transform group-focus-within:scale-110" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your favorite games..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)] hover:border-[var(--accent)]/30 focus:border-[var(--accent)] outline-none text-sm font-bold tracking-wide transition-all placeholder:text-[var(--muted)]/50"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                  >
                    <FiX size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* VIEW TOGGLE */}
              <div className="flex p-1.5 rounded-2xl bg-[var(--background)]/50 border border-[var(--border)]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-[var(--accent)] text-black shadow-lg" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-[var(--accent)] text-black shadow-lg" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                >
                  <FiList size={18} />
                </button>
              </div>

              {/* FILTER BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilter(true)}
                className={`flex-1 md:flex-none relative flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] italic border transition-all ${activeFilterCount > 0 ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]" : "border-[var(--border)] bg-[var(--background)]/50 text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"}`}
              >
                <FiFilter size={14} />
                Filter
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center bg-[var(--accent)] text-black rounded-full text-[9px] shadow-lg">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ================= GAME CONTENT ================= */}
        <div className="space-y-20">
          <AnimatePresence mode="wait">
            {isEmpty ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="w-24 h-24 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiX size={40} className="text-[var(--muted)]/30" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">No Games Found</h3>
                <p className="text-[var(--muted)] text-sm mb-8">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 rounded-2xl bg-[var(--accent)] text-black font-black uppercase tracking-widest text-xs italic hover:scale-105 transition-transform"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* 1. FEATURED */}
                {processedFeaturedGames.length > 0 && (
                  <div className="mb-20">
                    <SectionHeader
                      title="Elite Picks"
                      icon={FiTrendingUp}
                      count={processedFeaturedGames.length}
                      gradient="from-yellow-400 to-orange-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedFeaturedGames} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedFeaturedGames} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )}

                {/* 2. MLBB VARIANT */}
                {processedMlbbGames.length > 0 && (
                  <div className="mb-20">
                    <SectionHeader
                      title="MLBB Special"
                      icon={FiZap}
                      count={processedMlbbGames.length}
                      gradient="from-blue-500 to-indigo-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedMlbbGames} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedMlbbGames} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )}

                {/* 3. ALL GAMES */}
                {processedGames.length > 0 && (
                  <div className="mb-20">
                    <SectionHeader
                      title="Full Armory"
                      icon={FiPackage}
                      count={processedGames.length}
                      gradient="from-[var(--accent)] to-purple-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedGames} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedGames} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )}

                {/* 4. OTT SECTION */}
                {otts?.items?.length > 0 && !searchQuery && (
                  <div className="mb-10 border-t border-[var(--border)] pt-10">
                    <ServiceGridSection
                      title={otts.title}
                      total={otts.total}
                      items={otts.items}
                      hrefPrefix="/games/ott"
                    />
                  </div>
                )}

                {/* 5. MEMBERSHIP SECTION */}
                {memberships?.items?.length > 0 && !searchQuery && (
                  <div className="mb-10 border-t border-[var(--border)] pt-10">
                    <ServiceGridSection
                      title={memberships.title}
                      total={memberships.total}
                      items={memberships.items}
                      hrefPrefix="/games/membership"
                      showCategory={false}
                      ctaText="Join the Elite →"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FILTER MODAL */}
      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        sort={sort}
        setSort={setSort}
        hideOOS={hideOOS}
        setHideOOS={setHideOOS}
      />
    </main>
  );
}
