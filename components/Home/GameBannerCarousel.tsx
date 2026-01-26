"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/game-banners")
      .then((r) => r.json())
      .then((d) => setBanners(d?.data ?? []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!banners.length) return;

    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % banners.length);
    }, 6500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [banners.length]);

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goNext = () => {
    resetAutoplay();
    setCurrent((p) => (p + 1) % banners.length);
  };

  const goPrev = () => {
    resetAutoplay();
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  };

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative max-w-7xl mx-auto mt-2 px-4">
      {/* ================= MAIN SLIDE ================= */}
      <div
        className="
          relative h-[240px] sm:h-[300px] md:h-[420px]
          rounded-[32px] overflow-hidden
          bg-black
          border border-white/10
          shadow-[0_40px_120px_rgba(0,0,0,0.75)]
        "
      >
        <Link href="/" className="absolute inset-0">
          <Image
            src={banner.bannerImage || logo}
            alt={banner.bannerTitle}
            fill
            priority
            className="
              object-cover
              scale-[1.04]
              transition-transform duration-[1400ms] ease-out
            "
          />

          {/* OVERLAY (premium, softer) */}
          <div className="absolute inset-0 bg-gradient-to-t
            from-black/95 via-black/45 to-black/10" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
            <h2 className="
              max-w-2xl
              text-2xl sm:text-3xl md:text-5xl
              font-extrabold tracking-tight
              text-white
            ">
              {banner.bannerTitle}
            </h2>

            <p className="mt-2 sm:mt-3 max-w-xl
              text-xs sm:text-sm md:text-base
              text-gray-300 leading-relaxed">
              {banner.bannerDescription || "Top-up instantly. Secure. Trusted."}
            </p>

            {/* CTA */}
            <div className="mt-5 sm:mt-6 flex items-center gap-4">
              <span
                className="
                  inline-flex items-center gap-2
                  px-6 py-2.5
                  rounded-full
                  text-sm font-semibold
                  text-white
                  bg-gradient-to-r from-purple-500/90 to-pink-500/90
                  hover:from-purple-500 hover:to-pink-500
                  transition-all
                "
              >
                Buy Now
                <span className="opacity-70">→</span>
              </span>

              <span className="text-xs text-gray-400">
                Instant delivery
              </span>
            </div>
          </div>
        </Link>

        {/* ================= NAV ================= */}
        <button
          onClick={goPrev}
          className="
            absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur
            border border-white/10
            flex items-center justify-center
            hover:bg-white/10
            transition
          "
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>

        <button
          onClick={goNext}
          className="
            absolute right-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur
            border border-white/10
            flex items-center justify-center
            hover:bg-white/10
            transition
          "
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="flex justify-center gap-3 mt-6">
        {banners.map((b, i) => (
          <button
            key={i}
            onClick={() => {
              resetAutoplay();
              setCurrent(i);
            }}
            className={`transition-all duration-300
              ${current === i
                ? "scale-100 opacity-100"
                : "scale-90 opacity-40 hover:opacity-70"}
            `}
          >
            <div
              className={`
                relative w-20 sm:w-24 md:w-28
                h-12 sm:h-14 md:h-16
                rounded-lg overflow-hidden
                border
                ${current === i ? "border-pink-500/80" : "border-white/10"}
              `}
            >
              <Image
                src={b.bannerImage || logo}
                alt={b.bannerTitle}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      {/* ================= PROGRESS ================= */}
      <div className="mt-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="
            h-full
            bg-gradient-to-r from-purple-500 to-pink-500
            transition-all duration-500
          "
          style={{ width: `${((current + 1) / banners.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
