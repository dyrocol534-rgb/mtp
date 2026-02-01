"use client";

import { FiGrid, FiList } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PackageSelector({
  items,
  activeItem,
  setActiveItem,
  viewMode,
  setViewMode,
  sliderRef,
  buyPanelRef,
  calculateDiscount,
  scrollToItem,
}) {
  return (
    <>
      {/* ================= HEADER & VIEW TOGGLE ================= */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-[900] uppercase tracking-tight text-[var(--foreground)]">
            Select <span className="text-[var(--accent)]">Package</span>
          </h2>
          <p className="text-sm font-medium text-[var(--muted)] mt-1">
            Build your ideal loadout from {items.length} options
          </p>
        </div>

        {/* Custom Toggle Switch */}
        <div className="bg-[var(--card)] p-1 rounded-xl border border-[var(--border)] flex relative w-max">
          <motion.div
            className="absolute top-1 bottom-1 bg-[var(--accent)] rounded-lg z-0"
            initial={false}
            animate={{
              x: viewMode === "grid" ? 0 : "100%",
              width: "50%"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <button
            onClick={() => setViewMode("grid")}
            className={`relative z-10 px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${viewMode === "grid" ? "text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <FiGrid size={14} /> Grid
          </button>

          <button
            onClick={() => setViewMode("slider")}
            className={`relative z-10 px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${viewMode === "slider" ? "text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
          >
            <FiList size={14} /> Slider
          </button>
        </div>
      </div>

      {/* ================= GRID VIEW ================= */}
      {viewMode === "grid" && (
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => {
            const discount = calculateDiscount(
              item.sellingPrice,
              item.dummyPrice
            );
            const isActive = activeItem.itemSlug === item.itemSlug;

            return (
              <motion.div
                key={item.itemSlug}
                onClick={() => {
                  setActiveItem(item);
                  buyPanelRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group rounded-2xl p-4 cursor-pointer overflow-hidden border transition-all duration-300
                ${isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_8px_30px_-8px_var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/50 hover:bg-[var(--card)]"
                  }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--accent)]/10 rounded-bl-[100%] z-0" />
                )}

                {/* DISCOUNT BADGE */}
                {discount > 0 && (
                  <span className="absolute top-0 left-0 bg-rose-500 text-white
                                   text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-br-lg z-10">
                    -{discount}%
                  </span>
                )}

                <div className="relative z-10 pt-2">
                  <p className={`text-sm font-bold mb-1 truncate ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"}`}>
                    💎 {item.itemName}
                  </p>

                  <div className="flex items-baseline gap-2">
                    <p className={`text-xl font-[900] tracking-tight ${isActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                      ₹{item.sellingPrice}
                    </p>
                    {item.dummyPrice && (
                      <p className="text-xs font-bold text-[var(--muted)] line-through opacity-50">
                        ₹{item.dummyPrice}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ================= SLIDER VIEW ================= */}
      {viewMode === "slider" && (
        <div className="max-w-6xl mx-auto mb-6 mt-5 pt-3">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 px-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--border)]"
          >
            {items.map((item) => {
              const discount = calculateDiscount(
                item.sellingPrice,
                item.dummyPrice
              );
              const isActive = activeItem.itemSlug === item.itemSlug;

              return (
                <div
                  key={item.itemSlug}
                  onClick={() => scrollToItem(item)}
                  className={`relative snap-center min-w-[180px] rounded-2xl p-5 cursor-pointer transition-all duration-300 border
                  ${isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg scale-105 z-10"
                      : "border-[var(--border)] bg-[var(--card)] opacity-80 hover:opacity-100 scale-95"
                    }`}
                >
                  {/* DISCOUNT BADGE */}
                  {discount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm rotate-3">
                      -{discount}%
                    </span>
                  )}

                  <p className="text-sm font-bold mb-3 truncate opacity-80">
                    💎 {item.itemName}
                  </p>

                  <div className="flex flex-col">
                    <p className="text-2xl font-[900] text-[var(--accent)] tracking-tighter">
                      ₹{item.sellingPrice}
                    </p>
                    {item.dummyPrice && (
                      <p className="text-xs font-bold text-[var(--muted)] line-through opacity-50">
                        ₹{item.dummyPrice}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
