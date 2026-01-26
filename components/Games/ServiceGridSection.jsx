"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServiceGridSection({
  title,
  total,
  items,
  hrefPrefix,
}) {
  if (!items?.length) return null;

  return (
    <section className="max-w-7xl mx-auto mb-6 mt-7 ">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
        <span className="text-xs text-[var(--muted)]">
          {total}
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`${hrefPrefix}/${item.slug}`}
            className="group relative overflow-hidden rounded-2xl
            bg-[var(--card)]
            border border-[var(--border)]
            transition-all duration-300
            hover:shadow-lg hover:border-[var(--accent)]"
          >
            {/* IMAGE (WIDE, SHORT) */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/10">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300
                group-hover:scale-105"
              />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t
              from-black/70 via-black/30 to-transparent" />

              {/* CATEGORY BADGE */}
              {item.category && (
                <span className="absolute top-2 left-2 text-[10px]
                px-2 py-0.5 rounded-full
                bg-black/60 text-white backdrop-blur">
                  {item.category}
                </span>
              )}
            </div>

            {/* CONTENT (COMPACT) */}
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-[var(--foreground)]
              truncate group-hover:text-[var(--accent)] transition-colors">
                {item.name}
              </h3>

              <span className="text-[10px] text-[var(--muted)]">
                View Plans
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
