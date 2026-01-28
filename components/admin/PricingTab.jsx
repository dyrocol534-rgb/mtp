"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://game-off-ten.vercel.app/api/v1";

export default function PricingTab({
  pricingType,
  setPricingType,
  slabs,
  setSlabs,
  overrides,
  setOverrides,
  savingPricing,
  onSave,
}) {
  /* ================= LOCAL STATE ================= */

  const [pricingMode, setPricingMode] = useState("percent"); // percent | fixed
  const [games, setGames] = useState([]);
  const [itemsByGame, setItemsByGame] = useState({});
  const [fixedGameFilter, setFixedGameFilter] = useState("");

  /* ================= FETCH GAMES ================= */

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_BASE}/games/list`);
        const json = await res.json();
        if (json.success) setGames(json.data.games);
      } catch (err) {
        console.error("Failed to fetch games", err);
      }
    };

    fetchGames();
  }, []);

  /* ================= FETCH ITEMS ================= */

  const fetchItemsForGame = async (gameSlug) => {
    if (!gameSlug || itemsByGame[gameSlug]) return;

    try {
      const res = await fetch(`${API_BASE}/games/${gameSlug}/items`);
      const json = await res.json();
      if (json.success) {
        setItemsByGame((prev) => ({
          ...prev,
          [gameSlug]: json.data.items,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  /* ================= VALIDATION ================= */

  const isValidSlabs =
    slabs.length > 0 &&
    slabs.every(
      (s) =>
        Number.isFinite(s.min) &&
        Number.isFinite(s.max) &&
        Number.isFinite(s.percent) &&
        s.min >= 0 &&
        s.max >= s.min &&
        s.percent >= 0
    );

  const isValidOverrides =
    overrides.length > 0 &&
    overrides.every(
      (o) =>
        o.gameSlug &&
        o.itemSlug &&
        Number.isFinite(o.fixedPrice) &&
        o.fixedPrice >= 0
    );

  const canSave =
    !savingPricing &&
    ((pricingMode === "percent" && isValidSlabs) ||
      (pricingMode === "fixed" && isValidOverrides));

  /* ================= DERIVED ================= */

  const visibleOverrides = fixedGameFilter
    ? overrides.filter((o) => o.gameSlug === fixedGameFilter)
    : overrides;

  /* ================= SLABS ================= */

  const updateSlab = (i, key, value) => {
    const next = [...slabs];
    next[i][key] = Math.max(0, Number(value) || 0);
    setSlabs(next);
  };

  const addSlab = () =>
    setSlabs([...slabs, { min: 0, max: 0, percent: 0 }]);

  const deleteSlab = (i) =>
    setSlabs(slabs.filter((_, index) => index !== i));

  /* ================= FIXED PRICES ================= */

  const updateOverride = (i, key, value) => {
    const next = [...overrides];
    next[i][key] =
      key === "fixedPrice" ? Math.max(0, Number(value) || 0) : value;
    setOverrides(next);
  };

  const addOverride = () =>
    setOverrides([
      ...overrides,
      { gameSlug: "", itemSlug: "", fixedPrice: 0 },
    ]);

  const deleteOverride = (overrideIndex) =>
    setOverrides(overrides.filter((_, i) => i !== overrideIndex));

  return (
    <div className="max-w-6xl space-y-10">
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight">Pricing Rules</h2>
        <p className="text-sm text-gray/60 max-w-xl">
          Configure pricing using percentage markups or fixed item prices.
        </p>
      </div>

      {/* ================= MODE TOGGLE ================= */}
      <div className="flex gap-1 bg-black/40 p-1 rounded-full w-fit border border-white/10">
        <button
          onClick={() => setPricingMode("percent")}
          className={`px-4 h-9 rounded-full text-sm font-semibold transition
            ${
              pricingMode === "percent"
                ? "bg-[var(--accent)] text-black"
                : "text-gray/70 hover:text-white"
            }`}
        >
          % Markup
        </button>
        <button
          onClick={() => setPricingMode("fixed")}
          className={`px-4 h-9 rounded-full text-sm font-semibold transition
            ${
              pricingMode === "fixed"
                ? "bg-[var(--accent)] text-black"
                : "text-gray/70 hover:text-white"
            }`}
        >
          Fixed Price
        </button>
      </div>

      {/* ================= USER TYPE ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-semibold text-gray/80">
          Apply pricing for
        </span>
        <select
          value={pricingType}
          onChange={(e) => setPricingType(e.target.value)}
          className="h-10 px-4 rounded-full border border-white/10 bg-black/40
                     text-sm font-semibold backdrop-blur focus:ring-2
                     focus:ring-[var(--accent)]/40"
        >
          <option value="user">Normal Users</option>
          <option value="member">Members</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* ================= SLAB PRICING ================= */}
      {pricingMode === "percent" && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-lg">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold">Price Range Markup</h3>
          </div>

          <table className="w-full min-w-[520px] text-sm">
            <tbody>
              {slabs.map((s, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.min}
                      onChange={(e) =>
                        updateSlab(i, "min", e.target.value)
                      }
                      className="input h-9"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.max}
                      onChange={(e) =>
                        updateSlab(i, "max", e.target.value)
                      }
                      className="input h-9"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.percent}
                      onChange={(e) =>
                        updateSlab(i, "percent", e.target.value)
                      }
                      className="input h-9"
                    />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => deleteSlab(i)}
                      className="text-xs text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4">
            <button
              onClick={addSlab}
              className="text-sm font-semibold text-[var(--accent)]"
            >
              + Add Price Range
            </button>
          </div>
        </section>
      )}

      {/* ================= FIXED PRICING ================= */}
      {pricingMode === "fixed" && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-lg p-6 space-y-4">
          {/* FILTER */}
          <div className="flex gap-3 items-center">
            <select
              value={fixedGameFilter}
              onChange={(e) => setFixedGameFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-white/10 bg-black/40
                         text-sm font-semibold backdrop-blur"
            >
              <option value="">All Games</option>
              {games.map((g) => (
                <option key={g.gameSlug} value={g.gameSlug}>
                  {g.gameName}
                </option>
              ))}
            </select>

            {fixedGameFilter && (
              <button
                onClick={() => setFixedGameFilter("")}
                className="text-sm text-gray/60 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* LIST */}
          {visibleOverrides.map((o) => {
            const realIndex = overrides.indexOf(o);

            return (
              <div
                key={realIndex}
                className="grid gap-3 sm:grid-cols-4 rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <input
                  placeholder="Game"
                  value={o.gameSlug}
                  className="input h-9"
                  disabled
                />

                <input
                  placeholder="Item"
                  value={o.itemSlug}
                  className="input h-9"
                  disabled
                />

                <input
                  type="number"
                  value={o.fixedPrice}
                  onChange={(e) =>
                    updateOverride(
                      realIndex,
                      "fixedPrice",
                      e.target.value
                    )
                  }
                  className="input h-9"
                />

                <button
                  onClick={() => deleteOverride(realIndex)}
                  className="text-xs text-red-400 text-right"
                >
                  Delete
                </button>
              </div>
            );
          })}

          <button
            onClick={addOverride}
            className="text-sm font-semibold text-[var(--accent)]"
          >
            + Add Fixed Price
          </button>
        </section>
      )}

      {/* ================= SAVE ================= */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={!canSave}
          className={`h-11 px-7 rounded-lg text-sm font-semibold transition
            ${
              canSave
                ? "bg-[var(--accent)] text-black"
                : "bg-white/10 text-gray/40 cursor-not-allowed"
            }`}
        >
          {savingPricing ? "Saving..." : "Save Pricing"}
        </button>
      </div>
    </div>
  );
}
