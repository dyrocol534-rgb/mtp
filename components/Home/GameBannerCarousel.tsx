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
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [banners.length]);

  const goNext = () => {
    resetAutoplay();
    setCurrent((p) => (p + 1) % banners.length);
  };

  const goPrev = () => {
    resetAutoplay();
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  };

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative max-w-7xl mx-auto mt-1 px-4">
      {/* MAIN SLIDE */}
      <div className="relative h-[260px] md:h-[420px] rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
        <Link href="/" className="absolute inset-0">
          <Image
            src={banner.bannerImage || logo}
            alt={banner.bannerTitle}
            fill
            priority
            className="object-cover transition-transform duration-[1200ms] ease-out scale-105"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              {banner.bannerTitle}
            </h2>

            <p className="mt-3 max-w-xl text-gray-300 text-sm md:text-base">
              {banner.bannerDescription ||
                "Top-up instantly. Secure. Trusted."}
            </p>

            <button className="mt-6 w-fit px-8 py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:scale-105 transition-transform">
              Buy Now →
            </button>
          </div>
        </Link>

        {/* NAV */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-black/40 backdrop-blur
            flex items-center justify-center hover:bg-white/10"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 rounded-full bg-black/40 backdrop-blur
            flex items-center justify-center hover:bg-white/10"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="flex justify-center gap-4 mt-6">
        {banners.map((b, i) => (
          <button
            key={i}
            onClick={() => {
              resetAutoplay();
              setCurrent(i);
            }}
            className={`transition-all
              ${current === i
                ? "scale-100 opacity-100"
                : "scale-90 opacity-50 hover:opacity-80"}
            `}
          >
            <div className={`relative w-24 md:w-32 h-16 md:h-20 rounded-xl overflow-hidden
              border ${current === i ? "border-pink-500" : "border-white/10"}`}>
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

      {/* PROGRESS */}
      <div className="mt-4 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${((current + 1) / banners.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
