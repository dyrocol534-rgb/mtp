"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ValentinePopup() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });

  useEffect(() => {
    const seen = sessionStorage.getItem("valentine_popup_seen");

    if (!seen) {
      setShow(true);
    }

    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 1, 14); // Feb 14

    // If Feb 14 already passed → next year
    if (now > targetDate) {
      targetDate = new Date(now.getFullYear() + 1, 1, 14);
    }

    const timer = setInterval(() => {
      const current = new Date().getTime();
      const distance = targetDate.getTime() - current;

      if (distance <= 0) {
        setTimeLeft((prev) => ({
          ...prev,
          message: "It's Valentine’s Day! 💖",
        }));
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
        message: "",
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    // Close animation first
    setShow(false);

    setTimeout(() => {
      sessionStorage.setItem("valentine_popup_seen", "true");
      router.push("/special-leaderboard");
    }, 300);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-lg animate-fadeIn">

      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 opacity-20 animate-floatSlow"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${14 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            💕
          </span>
        ))}
      </div>

      {/* Popup Card */}
      <div className="relative w-[92%] max-w-sm rounded-3xl p-8 text-center border border-pink-500/40 bg-gradient-to-br from-pink-600/25 via-rose-500/20 to-purple-600/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,0,120,0.25)] animate-popupIn">

        {/* Glow */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-pink-500/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-rose-500/30 blur-[140px] rounded-full" />

        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-heartBeat">
            💖
          </div>

          <h2 className="text-2xl font-extrabold mb-2 text-white tracking-wide">
            Valentine Special
          </h2>

          <p className="text-sm text-pink-100 mb-6">
            Celebrate love & epic wins.  
            Top 10 players will receive exclusive prizes!
          </p>

          {/* Countdown */}
          {timeLeft.message ? (
            <div className="mb-6 text-pink-300 font-semibold">
              {timeLeft.message}
            </div>
          ) : (
            <div className="mb-6 grid grid-cols-4 gap-2 text-center">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div
                  key={unit}
                  className="rounded-xl bg-pink-500/20 border border-pink-400/30 py-2 backdrop-blur-sm"
                >
                  <div className="text-lg font-bold text-white">
                    {timeLeft[unit as keyof typeof timeLeft]}
                  </div>
                  <div className="text-[10px] uppercase text-pink-200">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleRedirect}
            className="px-8 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all duration-300 active:scale-95 hover:shadow-[0_0_25px_rgba(255,0,120,0.7)]"
          >
            View Special Leaderboard 💝
          </button>
        </div>
      </div>
    </div>
  );
}
