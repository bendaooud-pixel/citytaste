"use client";
import { Suspense, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TripItinerary, { type Itinerary } from "@/components/TripItinerary";

const CITIES = [
  { id: "paris",     label: "🇫🇷 Paris" },
  { id: "barcelona", label: "🇪🇸 Barcelona" },
  { id: "rome",      label: "🇮🇹 Rome" },
];

const BUDGETS = [
  { id: "30",  label: "€30 / day",  desc: "Budget" },
  { id: "50",  label: "€50 / day",  desc: "Mid-range" },
  { id: "100", label: "€100 / day", desc: "Comfortable" },
  { id: "150", label: "€150+ / day", desc: "Luxury" },
];

const INTERESTS = [
  { id: "Food",      emoji: "🍽️" },
  { id: "Monuments", emoji: "🏛️" },
  { id: "Markets",   emoji: "🛍️" },
  { id: "Nightlife", emoji: "🌙" },
  { id: "Brunch",    emoji: "🥞" },
  { id: "Shopping",  emoji: "🛒" },
  { id: "Museums",   emoji: "🎨" },
  { id: "Cafés",     emoji: "☕" },
];

const STYLES = [
  { id: "Solo",   emoji: "🧳" },
  { id: "Couple", emoji: "💑" },
  { id: "Family", emoji: "👨‍👩‍👧" },
  { id: "Group",  emoji: "👥" },
];

function PlanForm() {
  const params = useSearchParams();
  const router = useRouter();

  const [city, setCity]           = useState(params.get("city") ?? "paris");
  const [days, setDays]           = useState(Number(params.get("days") ?? 3));
  const [budget, setBudget]       = useState(params.get("budget") ?? "50");
  const [interests, setInterests] = useState<string[]>(
    params.get("interests") ? params.get("interests")!.split(",") : ["Food", "Monuments"]
  );
  const [travelStyle, setStyle]   = useState(params.get("style") ?? "Couple");

  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setItinerary(null);

    // Reflect params in URL so the share link works
    const url = new URL(window.location.href);
    url.searchParams.set("city", city);
    url.searchParams.set("days", String(days));
    url.searchParams.set("budget", budget);
    url.searchParams.set("interests", interests.join(","));
    url.searchParams.set("style", travelStyle);
    router.replace(url.pathname + url.search, { scroll: false });

    try {
      const res = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, days, budget, interests, travelStyle }),
      });

      const text = await res.text();
      if (!text.trim()) throw new Error(`Empty response (HTTP ${res.status})`);

      let data: { itinerary?: Itinerary; error?: string; detail?: string };
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Non-JSON response: ${text.slice(0, 120)}`);
      }

      if (data.error) throw new Error(data.detail ? `${data.error} — ${data.detail}` : data.error);
      if (!data.itinerary) throw new Error("No itinerary returned");

      setItinerary(data.itinerary);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [city, days, budget, interests, travelStyle, router]);

  if (itinerary) {
    return <TripItinerary itinerary={itinerary} onReset={() => setItinerary(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* City */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">Select City</label>
        <div className="grid grid-cols-3 gap-3">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCity(c.id)}
              className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                city === c.id
                  ? "bg-[#E63946] border-[#E63946] text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Days */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Number of Days — <span className="text-[#E63946]">{days} {days === 1 ? "day" : "days"}</span>
        </label>
        <input
          type="range"
          min={1}
          max={7}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full accent-[#E63946]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1 day</span>
          <span>7 days</span>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">Budget per Day</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BUDGETS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBudget(b.id)}
              className={`py-3 px-2 rounded-xl border-2 text-center transition-all ${
                budget === b.id
                  ? "bg-[#E63946] border-[#E63946] text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              <div className="font-bold text-sm">{b.label}</div>
              <div className={`text-xs mt-0.5 ${budget === b.id ? "text-white/80" : "text-slate-400"}`}>
                {b.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button
              key={i.id}
              onClick={() => toggleInterest(i.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                interests.includes(i.id)
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              {i.emoji} {i.id}
            </button>
          ))}
        </div>
      </div>

      {/* Travel style */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">Travel Style</label>
        <div className="grid grid-cols-4 gap-3">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`py-3 rounded-xl border-2 text-center transition-all ${
                travelStyle === s.id
                  ? "bg-[#E63946] border-[#E63946] text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              <div className="text-xl mb-0.5">{s.emoji}</div>
              <div className="text-xs font-bold">{s.id}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          <strong>Error:</strong> {error}
          {error.includes("ANTHROPIC_API_KEY") && (
            <p className="mt-1 text-xs text-red-500">
              Add <code className="font-mono">ANTHROPIC_API_KEY</code> to your <code>.env.local</code> file.
            </p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={generate}
        disabled={loading || interests.length === 0}
        className="w-full py-4 rounded-2xl bg-[#E63946] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-base transition-colors flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating your itinerary…
          </>
        ) : (
          <>✨ Plan My Trip</>
        )}
      </button>
    </div>
  );
}

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#E63946] text-white py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-black mb-2">✨ Plan My Trip</h1>
        <p className="text-white/80 text-base max-w-md mx-auto">
          AI-powered day-by-day itineraries built from our curated city guides
        </p>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10 pb-20">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <svg className="w-8 h-8 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          }
        >
          <PlanForm />
        </Suspense>
      </main>
    </div>
  );
}
