"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FiFilter,
  FiX,
  FiSearch,
  FiClock,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

/* ================= BLOG DATA ================= */
const BLOGS_DATA = [
  {
    id: "1",
    title: "MLBB Weekly Pass Price in India (2025)",
    slug: "mlbb-weekly-pass-price-in-india",
    type: "Guide",
    excerpt:
      "Learn the latest MLBB weekly pass price in India and whether it’s worth buying.",
    publishedAt: "2025-01-10",
    readingTime: "4 min read",
    featured: true,
  },
  {
    id: "2",
    title: "How to Buy MLBB Diamonds Safely in India",
    slug: "how-to-buy-mlbb-diamonds-safely-in-india",
    type: "Safety",
    excerpt:
      "Step-by-step guide to buying MLBB diamonds safely in India.",
    publishedAt: "2025-01-12",
    readingTime: "5 min read",
    featured: true,
  },
  {
    id: "3",
    title: "Is MLBB Top-Up Legal in India?",
    slug: "is-mlbb-top-up-legal-in-india",
    type: "Info",
    excerpt:
      "Understand whether MLBB top-ups are legal in India.",
    publishedAt: "2025-01-05",
    readingTime: "3 min read",
  },
];

/* ================= SETTINGS ================= */
const POSTS_PER_PAGE = 6;

const isNewPost = (date) =>
  Date.now() - new Date(date).getTime() < 7 * 24 * 60 * 60 * 1000;

/* ================= PAGE ================= */
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const filteredBlogs = useMemo(() => {
    let blogs = [...BLOGS_DATA];

    if (search) {
      blogs = blogs.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      blogs = blogs.filter((b) => b.type === type);
    }

    blogs.sort((a, b) =>
      sort === "latest"
        ? +new Date(b.publishedAt) - +new Date(a.publishedAt)
        : +new Date(a.publishedAt) - +new Date(b.publishedAt)
    );

    return blogs;
  }, [search, type, sort]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type, sort]);

  return (
    <section className="min-h-screen bg-[var(--background)] px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--accent)] to-purple-400 bg-clip-text text-transparent">
            MLBB Blogs & Guides
          </h1>
          <p className="text-[var(--muted)] max-w-2xl">
            Latest pricing updates, safety tips, and MLBB recharge guides.
          </p>
        </header>

        {/* SEARCH */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--card)] border shadow-sm">
          <FiSearch className="text-[var(--muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* BLOG GRID */}
        {paginatedBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[var(--muted)]">
            No articles found.
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === i + 1
                    ? "bg-[var(--accent)] text-black font-semibold"
                    : "hover:border-[var(--accent)]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= BLOG CARD ================= */
function BlogCard({ blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group rounded-2xl p-6 bg-[var(--card)] border hover:-translate-y-1 hover:shadow-xl transition"
    >
      <div className="flex items-center gap-2 text-xs mb-3">
        <span className="px-2 py-1 rounded bg-[var(--accent)] text-black font-semibold">
          {blog.type}
        </span>
        {blog.featured && <FiStar className="text-[var(--accent)]" />}
        {isNewPost(blog.publishedAt) && (
          <span className="px-2 py-1 rounded bg-green-500/20 text-green-500">
            New
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold group-hover:text-[var(--accent)] transition">
        {blog.title}
      </h2>

      <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">
        {blog.excerpt}
      </p>

      <div className="flex justify-between mt-5 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <FiClock />
          {blog.readingTime}
        </span>
        <span className="flex items-center gap-1">
          <FiCalendar />
          {new Date(blog.publishedAt).toDateString()}
        </span>
      </div>
    </Link>
  );
}
