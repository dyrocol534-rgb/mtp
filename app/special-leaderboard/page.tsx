"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function SpecialLeaderboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventStatus, setEventStatus] = useState<
    "upcoming" | "active" | "ended"
  >("upcoming");

  const limit = 10;

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();

    const startDate = new Date(year, 1, 7);
    const endDate = new Date(year, 1, 14, 23, 59, 59);

    if (now < startDate) {
      setEventStatus("upcoming");
      setLoading(false);
      return;
    }

    if (now > endDate) {
      setEventStatus("ended");
      setLoading(false);
      return;
    }

    setEventStatus("active");

    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(
      `/api/leaderboard?range=custom&start=${startDate
        .toISOString()
        .split("T")[0]}&end=${endDate
        .toISOString()
        .split("T")[0]}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((res) => setData(res.success ? res.data : []))
      .finally(() => setLoading(false));
  }, []);

  const topStyles = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-400/20 to-pink-500/20 border-yellow-400/50";
    if (rank === 2)
      return "bg-gradient-to-r from-slate-400/20 to-pink-500/20 border-slate-400/50";
    if (rank === 3)
      return "bg-gradient-to-r from-orange-400/20 to-pink-500/20 border-orange-400/50";
    return "border-pink-500/20";
  };

  return (
   
      <div className="relative min-h-screen overflow-hidden text-white">

        {/* Romantic Gradient Background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#120010] via-[#1b001d] to-black" />

        {/* Soft Glow Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/20 blur-[160px] rounded-full animate-pulse -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-600/20 blur-[160px] rounded-full animate-pulse -z-10" />

        {/* Floating Subtle Hearts */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute text-pink-500/20 text-xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
              }}
            >
              💗
            </span>
          ))}
        </div>

        {/* HERO */}
        <div className="text-center pt-24 pb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
            💖 Valentine Special Leaderboard
          </h1>

          <p className="text-pink-300 mt-4 text-lg">
            Compete from <span className="font-semibold">7 Feb – 14 Feb</span>
          </p>

          <div className="mt-6 inline-block px-6 py-3 rounded-full bg-pink-500/20 border border-pink-400/40 backdrop-blur-md text-pink-200 font-semibold shadow-lg shadow-pink-500/20">
            🎁 Top 5 Players Will Receive Special Prizes
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-20">

          {/* UPCOMING */}
          {eventStatus === "upcoming" && (
            <div className="text-center py-16 rounded-3xl bg-pink-900/20 border border-pink-500/40 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-2">⏳ Event Not Started</h2>
              <p className="text-pink-300">
                The competition begins on February 7 💕
              </p>
            </div>
          )}

          {/* ENDED */}
          {eventStatus === "ended" && (
            <div className="text-center py-16 rounded-3xl bg-purple-900/20 border border-purple-500/40 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-2">💌 Event Ended</h2>
              <p className="text-purple-300">
                Winners will be announced soon!
              </p>
            </div>
          )}

          {/* ACTIVE */}
          {eventStatus === "active" && (
            <>
              {loading ? (
                <div className="text-center py-20 text-pink-300 animate-pulse">
                  Loading rankings...
                </div>
              ) : (
                <div className="rounded-3xl border border-pink-500/30 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-[0_0_40px_rgba(255,0,120,0.2)]">

                  <div className="grid grid-cols-4 text-sm text-pink-300 bg-pink-950/40 p-4 font-semibold">
                    <div>Rank</div>
                    <div>User ID</div>
                    <div>Name</div>
                    <div>Total Spent</div>
                  </div>

                  {data.map((item, index) => {
                    const rank = index + 1;

                    return (
                      <div
                        key={index}
                        className={`grid grid-cols-4 p-4 border-t items-center transition hover:bg-pink-900/20 ${topStyles(
                          rank
                        )}`}
                      >
                        <div className="font-bold text-lg">
                          {rank === 1 && "🥇"}
                          {rank === 2 && "🥈"}
                          {rank === 3 && "🥉"}
                          {rank > 3 && `#${rank}`}
                        </div>

                        <div className="text-gray-300">
                          {item.user?.userId || "—"}
                        </div>

                        <div>
                          {item.user?.name || "Anonymous"}
                        </div>

                        <div className="text-green-400 font-semibold">
                          ₹{item.totalSpent}
                        </div>
                      </div>
                    );
                  })}

                  {data.length === 0 && (
                    <div className="text-center py-16 text-pink-300">
                      Be the first to claim the #1 spot 💗
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
  
  );
}
