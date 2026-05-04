"use client";
import type { FilterState } from "@/lib/types";

interface FilterBarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}

export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const update = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  const hasActive =
    filters.minRating > 0 ||
    filters.maxPrice < 4 ||
    filters.halal ||
    filters.family ||
    filters.terrace;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-sm">Filters</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{resultCount} results</span>
          {hasActive && (
            <button
              onClick={() =>
                update({ minRating: 0, maxPrice: 4, halal: false, family: false, terrace: false })
              }
              className="text-xs text-brand-orange hover:underline font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Sort by
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => update({ sortBy: e.target.value as FilterState["sortBy"] })}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          >
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Min rating */}
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Minimum Rating
          </label>
          <div className="flex gap-2">
            {[0, 3, 3.5, 4, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => update({ minRating: r })}
                className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-colors
                  ${filters.minRating === r
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange bg-white"
                  }`}
              >
                {r === 0 ? "Any" : `${r}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Max Price
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => update({ maxPrice: p })}
                className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-colors
                  ${filters.maxPrice === p
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange bg-white"
                  }`}
              >
                {"$".repeat(p)}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide">
            Dietary & Features
          </label>
          {[
            { key: "halal", label: "🌙 Halal certified" },
            { key: "family", label: "👨‍👩‍👧 Family friendly" },
            { key: "terrace", label: "🌿 Has terrace" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-slate-700 group-hover:text-slate-900">{label}</span>
              <div
                onClick={() => update({ [key]: !filters[key as keyof FilterState] })}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer
                  ${filters[key as keyof FilterState]
                    ? "bg-brand-orange"
                    : "bg-slate-200"
                  }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform
                    ${filters[key as keyof FilterState] ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
