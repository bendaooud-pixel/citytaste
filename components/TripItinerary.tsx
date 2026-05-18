"use client";
import { useState } from "react";
import Link from "next/link";

export interface ItineraryStop {
  time: string;
  timeOfDay: "morning" | "afternoon" | "evening";
  name: string;
  placeId: string | null;
  category: string;
  description: string;
  duration: string;
  address?: string;
  walkingHint?: string;
  tip?: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  morning: ItineraryStop[];
  afternoon: ItineraryStop[];
  evening: ItineraryStop[];
}

export interface Itinerary {
  city: string;
  days: ItineraryDay[];
  estimatedDailyBudget: string;
  tips: string[];
}

const TIME_CONFIG = {
  morning:   { label: "Morning",   emoji: "🌅", bg: "bg-amber-50",   border: "border-amber-200",  dot: "bg-amber-400"  },
  afternoon: { label: "Afternoon", emoji: "☀️",  bg: "bg-sky-50",    border: "border-sky-200",    dot: "bg-sky-400"    },
  evening:   { label: "Evening",   emoji: "🌙",  bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-400" },
} as const;

const CATEGORY_EMOJI: Record<string, string> = {
  breakfast: "🥐",
  lunch:     "🍽️",
  dinner:    "🍷",
  activity:  "🎭",
  sight:     "🏛️",
  monument:  "🏛️",
  market:    "🛍️",
  cafe:      "☕",
  bar:       "🍸",
  museum:    "🎨",
  shopping:  "🛒",
  brunch:    "🥞",
  default:   "📍",
};

function catEmoji(cat: string) {
  return CATEGORY_EMOJI[cat.toLowerCase()] ?? CATEGORY_EMOJI.default;
}

function StopCard({ stop, citySlug }: { stop: ItineraryStop; citySlug: string }) {
  const placeHref = stop.placeId ? `/${citySlug}/${stop.placeId.replace(`${citySlug}-`, "")}` : null;

  return (
    <div className="flex gap-3">
      {/* Time */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16 text-right">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{stop.time}</span>
      </div>

      {/* Card */}
      <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{catEmoji(stop.category)}</span>
            {placeHref ? (
              <Link
                href={placeHref}
                className="font-semibold text-slate-900 text-sm hover:text-[#E63946] transition-colors"
              >
                {stop.name}
              </Link>
            ) : (
              <span className="font-semibold text-slate-900 text-sm">{stop.name}</span>
            )}
          </div>
          <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{stop.duration}</span>
        </div>

        <p className="text-slate-600 text-xs leading-relaxed mb-2">{stop.description}</p>

        {stop.address && (
          <p className="text-slate-400 text-xs mb-2 truncate">📍 {stop.address}</p>
        )}

        {stop.tip && (
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 text-xs text-amber-800 mb-2">
            💡 {stop.tip}
          </div>
        )}

        {stop.walkingHint && (
          <p className="text-slate-400 text-xs">🚶 {stop.walkingHint}</p>
        )}
      </div>
    </div>
  );
}

function DaySection({ day, citySlug }: { day: ItineraryDay; citySlug: string }) {
  const segments: Array<"morning" | "afternoon" | "evening"> = ["morning", "afternoon", "evening"];

  return (
    <div className="space-y-6">
      {segments.map((seg) => {
        const stops = day[seg];
        if (!stops || stops.length === 0) return null;
        const cfg = TIME_CONFIG[seg];
        return (
          <div key={seg} className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-4`}>
            <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
              <span>{cfg.emoji}</span>
              {cfg.label}
            </h4>
            <div className="space-y-3">
              {stops.map((stop, i) => (
                <StopCard key={i} stop={stop} citySlug={citySlug} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  itinerary: Itinerary;
  onReset: () => void;
}

export default function TripItinerary({ itinerary, onReset }: Props) {
  const [activeDay, setActiveDay] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const citySlug = itinerary.city.toLowerCase();
  const currentDay = itinerary.days[activeDay];

  function saveTrip() {
    try {
      const existing: Itinerary[] = JSON.parse(localStorage.getItem("citytaste-trips") ?? "[]");
      const updated = [itinerary, ...existing.filter((t) => t.city !== itinerary.city)];
      localStorage.setItem("citytaste-trips", JSON.stringify(updated));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  }

  function shareTrip() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  }

  function printTrip() {
    window.print();
  }

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 print:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Your {itinerary.days.length}-Day {itinerary.city} Itinerary
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Budget: <span className="font-semibold text-slate-700">{itinerary.estimatedDailyBudget}</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 print:hidden">
            <button
              onClick={saveTrip}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700"
            >
              {saved ? "✓ Saved!" : "💾 Save"}
            </button>
            <button
              onClick={shareTrip}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700"
            >
              {copied ? "✓ Copied!" : "🔗 Share"}
            </button>
            <button
              onClick={printTrip}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700"
            >
              🖨️ Print
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              ↩ New Plan
            </button>
          </div>
        </div>
      </div>

      {/* Day tabs */}
      {itinerary.days.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 print:hidden" style={{ scrollbarWidth: "none" }}>
          {itinerary.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeDay === i
                  ? "bg-[#E63946] border-[#E63946] text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      )}

      {/* Current day */}
      <div className="print:hidden">
        {currentDay && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-black text-slate-900">
                Day {currentDay.day} — {currentDay.theme}
              </h3>
            </div>
            <DaySection day={currentDay} citySlug={citySlug} />
          </div>
        )}
      </div>

      {/* Print view: all days */}
      <div className="hidden print:block space-y-8">
        {itinerary.days.map((day) => (
          <div key={day.day}>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              Day {day.day} — {day.theme}
            </h3>
            <DaySection day={day} citySlug={citySlug} />
          </div>
        ))}
      </div>

      {/* Tips */}
      {itinerary.tips && itinerary.tips.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-5">
          <h3 className="font-black text-base mb-3">✈️ Local Tips</h3>
          <ul className="space-y-2">
            {itinerary.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="text-[#E63946] font-bold flex-shrink-0">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
