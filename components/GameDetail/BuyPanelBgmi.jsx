"use client";

import Image from "next/image";
import { FiArrowRight, FiShield, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "@/public/logo.png";

export default function BuyPanelBgmi({
  activeItem,
  redirecting,
  goBuy,
  calculateDiscount,
  buyPanelRef,
}) {
  if (!activeItem) return null;

  const itemImage =
    activeItem?.itemImageId?.image ||
    activeItem?.image ||
    logo;

  const discount = calculateDiscount(
    activeItem.sellingPrice,
    activeItem.dummyPrice
  );

  return (
    <motion.div
      ref={buyPanelRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-4xl mx-auto p-4"
    >
      <div className="relative group">
        {/* Ambient Glow */}
        <div className="absolute inset-2 bg-gradient-to-r from-[var(--accent)]/40 to-purple-600/40 blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 -z-10" />

        {/* Main Bar */}
        <div className="relative bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-[2.5rem] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden transform transition-all hover:scale-[1.01]">

          {/* Detailed Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

          {/* TOP SECTION (Mobile: Row, Desktop: Flexed) */}
          <div className="flex flex-row items-center gap-4 w-full md:w-auto md:flex-1 p-2 md:p-0">

            {/* Left: Product Viz */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 md:pl-3">
              <div className="absolute inset-0 bg-[var(--accent)]/10 rounded-2xl rotate-6" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--background)] shadow-lg ring-1 ring-[var(--border)]">
                <Image
                  src={itemImage}
                  alt={activeItem.itemName}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              {discount && (
                <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] font-[900] px-2.5 py-1 rounded-lg border border-white/20 shadow-xl z-10 flex items-center gap-1">
                  <FiTag className="w-3 h-3" /> -{discount}%
                </div>
              )}
            </div>

            {/* Center: Information */}
            <div className="flex-1 flex flex-col justify-center text-left min-w-0">
              <div className="inline-flex items-center justify-start gap-2 mb-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)] opacity-80 truncate">
                  Ready to Ship
                </span>
              </div>

              <h2 className="text-xl md:text-3xl font-[900] text-[var(--foreground)] tracking-tight leading-none mb-2 md:mb-3 truncate">
                {activeItem.itemName}
              </h2>

              {/* Price Block */}
              <div className="flex items-center justify-start gap-3">
                <span className="text-3xl md:text-4xl font-[900] text-[var(--accent)] tracking-tighter drop-shadow-sm">
                  ₹{activeItem.sellingPrice}
                </span>
                {activeItem.dummyPrice && (
                  <div className="flex flex-col items-start leading-none opacity-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Was</span>
                    <span className="text-sm font-bold text-[var(--muted)] line-through decoration-2">
                      ₹{activeItem.dummyPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Action Zone */}
          <div className="w-full md:w-auto md:min-w-[220px] p-1">
            <button
              onClick={() => goBuy(activeItem)}
              disabled={redirecting}
              className={`
                 relative w-full h-full min-h-[60px] md:min-h-[70px] rounded-[2rem] overflow-hidden group/btn
                 flex flex-col items-center justify-center gap-1
                 transition-all duration-300
                 ${redirecting
                  ? 'bg-[var(--muted)]/10 text-[var(--muted)] cursor-not-allowed'
                  : 'bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-white shadow-xl hover:shadow-[var(--accent)]/30'
                }
               `}
            >
              {/* Hover shine effect */}
              {!redirecting && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shine_1s_infinite]" />
              )}

              <div className="relative z-10 flex items-center gap-2">
                <span className="text-lg font-[900] uppercase tracking-wider">
                  {redirecting ? "Processing" : "Buy Now"}
                </span>
                {!redirecting && <FiArrowRight className="text-xl group-hover/btn:translate-x-1 transition-transform" />}
              </div>

              {!redirecting && (
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 relative z-10">
                  Instant Delivery
                </span>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--muted)] opacity-50">
              <FiShield size={10} /> 100% Safe Payment
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
