"use client";
import { CATEGORIES } from "@/lib/types";
import type { Category } from "@/lib/types";

interface CategoryTabsProps {
  active: Category | "all";
  onChange: (cat: Category | "all") => void;
  counts?: Partial<Record<Category | "all", number>>;
}

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  const all = [
    { id: "all" as const, label: "All", emoji: "✨" },
    ...CATEGORIES,
  ];

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 px-1">
        {all.map((cat) => {
          const isActive = active === cat.id;
          const count = counts?.[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-brand-orange text-white shadow-md shadow-orange-200"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-brand-orange hover:text-brand-orange"
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              {count !== undefined && (
                <span
                  className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
