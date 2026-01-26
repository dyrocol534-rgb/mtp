"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GameCardGrid({ game, isOutOfStock }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <Link
      href={disabled ? "#" : `/games/${game.gameSlug}`}
      className={`group relative overflow-hidden rounded-2xl border
      bg-[var(--card)] transition-all duration-300
      ${
        disabled
          ? "opacity-90 pointer-events-none border-[var(--border)]"
          : "hover:-translate-y-1 hover:shadow-2xl hover:border-[var(--accent)] border-[var(--border)]"
      }`}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/10">
        <Image
          src={game.gameImageId?.image || logo}
          alt={game.gameName}
          fill
          priority={false}
          className={`object-cover transition-all duration-500
            ${
              disabled
                ? "grayscale blur-[1px] scale-105"
                : "group-hover:scale-110"
            }`}
        />

        {/* SOFT GLOW */}
        {!disabled && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-[var(--accent)]/20 via-transparent to-transparent" />
        )}

        {/* TAG */}
        {!disabled && game.tagId && (
          <span
            className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full font-semibold shadow"
            style={{
              background: game.tagId.tagBackground,
              color: game.tagId.tagColor,
            }}
          >
            {game.tagId.tagName}
          </span>
        )}

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* CTA */}
        {!disabled && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent)] text-white shadow-lg">
              View →
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3
          className={`text-sm font-semibold leading-tight line-clamp-1 transition-colors
          ${
            disabled
              ? "text-[var(--muted)]"
              : "group-hover:text-[var(--accent)]"
          }`}
        >
          {game.gameName}
        </h3>

        <p className="mt-1 text-xs text-[var(--muted)]">
          {game.gameFrom}
        </p>
      </div>

      {/* OUT OF STOCK */}
      {disabled && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow">
            Out of Stock
          </span>
        </div>
      )}
    </Link>
  );
}
