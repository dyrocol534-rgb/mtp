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
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/game-banners")
      .then((r) => r.json())
      .then((d) => setBanners(d?.data ?? []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  /* AUTO PLAY */
  useEffect(() => {
    if (!banners.length) return;

    intervalRef.current = setInterval(() => {
      setDirection("next");
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 1500); // smoother timing

    return () => clearInterval(intervalRef.current);
  }, [banners.length]);

  const goNext = () => {
    clearInterval(intervalRef.current);
    setDirection("next");
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const goPrev = () => {
    clearInterval(intervalRef.current);
    setDirection("prev");
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (loading) return <Loader />;
  if (!banners.length) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-4 mt-4">
      <div className="relative h-[220px] sm:h-[280px] md:h-[420px] rounded-[28px] overflow-hidden border border-white/10">

        {banners.map((banner, index) => {
          const isActive = index === current;

          const base =
            "absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]";

          let stateClass = "";

          if (isActive) {
            stateClass =
              "opacity-100 translate-x-0 scale-100 z-20";
          } else {
            if (direction === "next") {
              stateClass =
                index < current
                  ? "opacity-0 -translate-x-16 scale-95 z-10"
                  : "opacity-0 translate-x-16 scale-95 z-10";
            } else {
              stateClass =
                index > current
                  ? "opacity-0 translate-x-16 scale-95 z-10"
                  : "opacity-0 -translate-x-16 scale-95 z-10";
            }
          }

          return (
            <div key={index} className={`${base} ${stateClass}`}>
              <Link href="/" className="absolute inset-0 group">
                <Image
                  src={banner.bannerImage || logo}
                  alt={banner.bannerTitle}
                  fill
                  priority
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
                  <h2 className="text-white font-extrabold text-xl sm:text-3xl md:text-4xl">
                    {banner.bannerTitle}
                  </h2>

                  <p className="text-gray-300 mt-2 text-sm md:text-base">
                    {banner.bannerDescription ||
                      "Instant top-ups • Secure payments • Trusted by gamers"}
                  </p>

                  <div className="mt-6">
                    <span className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition">
                      Buy Now →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        {/* NAV */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-black/70 transition"
        >
          <ChevronLeft className="text-white w-4 h-4" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-black/70 transition"
        >
          <ChevronRight className="text-white w-4 h-4" />
        </button>

      </div>
    </section>
  );
}
