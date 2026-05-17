"use client";
import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { places } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import type { Category } from "@/lib/types";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import NearMeMap from "@/components/NearMeMap";

// ── Haversine distance in metres ────────────────────────────────────────────
function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Open-now check ───────────────────────────────────────────────────────────
function isOpenNow(openingHours: Record<string, string>): boolean {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const hours = openingHours[dayName];
  if (!hours || hours === "Closed") return false;
  if (/24h/i.test(hours)) return true;

  const currentMins = now.getHours() * 60 + now.getMinutes();

  // Segments separated by "·" (middle dot)
  return hours.split("·").some((seg) => {
    // Split on en-dash "–" or regular hyphen "-"
    const parts = seg.trim().split(/\s*[–\-]\s*/);
    if (parts.length !== 2) return false;
    const parseT = (t: string) => {
      const [h, m = "0"] = t.trim().split(":");
      return parseInt(h, 10) * 60 + parseInt(m, 10);
    };
    const start = parseT(parts[0]);
    let end = parseT(parts[1]);
    if (end === 0) end = 24 * 60; // "00:00" means midnight
    if (end < start) end += 24 * 60; // crosses midnight
    return currentMins >= start && currentMins < end;
  });
}

// ── City bounding boxes ──────────────────────────────────────────────────────
const CITY_BOXES = [
  { slug: "paris", label: "Paris 🇫🇷", latMin: 48.75, latMax: 48.96, lngMin: 2.10, lngMax: 2.56 },
  { slug: "barcelona", label: "Barcelona 🇪🇸", latMin: 41.30, latMax: 41.50, lngMin: 1.95, lngMax: 2.35 },
  { slug: "rome", label: "Rome 🇮🇹", latMin: 41.75, latMax: 42.00, lngMin: 12.30, lngMax: 12.65 },
];

function detectCity(lat: number, lng: number) {
  return CITY_BOXES.find(
    (b) => lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax
  ) ?? null;
}

// ── Formatting helpers ───────────────────────────────────────────────────────
function fmtDist(m: number) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}
function fmtWalk(m: number) {
  const mins = Math.max(1, Math.round(m / 80));
  return `${mins} min walk`;
}

// ── Inner page (uses useSearchParams → must be inside Suspense) ──────────────
function NearMeContent() {
  const params = useSearchParams();
  const lat = parseFloat(params.get("lat") ?? "");
  const lng = parseFloat(params.get("lng") ?? "");

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const hasLocation = Number.isFinite(lat) && Number.isFinite(lng);
  const detectedCity = hasLocation ? detectCity(lat, lng) : null;

  // All places within 2 km, sorted by distance
  const nearbyPlaces = useMemo(() => {
    if (!hasLocation) return [];
    return places
      .map((p) => ({ ...p, _distM: haversineM(lat, lng, p.lat, p.lng) }))
      .filter((p) => p._distM <= 2000)
      .sort((a, b) => a._distM - b._distM);
  }, [lat, lng, hasLocation]);

  // Apply filters
  const filtered = useMemo(
    () =>
      nearbyPlaces.filter((p) => {
        if (selectedCategory !== "all" && !p.categories.includes(selectedCategory)) return false;
        if (openNowOnly && !isOpenNow(p.openingHours)) return false;
        if (p.rating < minRating) return false;
        return true;
      }),
    [nearbyPlaces, selectedCategory, openNowOnly, minRating]
  );

  // ── No location param ──────────────────────────────────────────────────────
  if (!hasLocation) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">📍</p>
        <h2 className="text-2xl font-black text-slate-900 mb-2">No location detected</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          Go back to the homepage and tap &ldquo;Find places near me&rdquo; to enable GPS.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  // ── Outside covered cities ─────────────────────────────────────────────────
  if (!detectedCity) {
    return (
      <div className="text-center py-24 max-w-md mx-auto">
        <p className="text-5xl mb-4">🌍</p>
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          We&apos;re not in your city yet
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Explore our curated guides for Paris, Barcelona and Rome — more cities coming soon.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/paris" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors">
            🇫🇷 Paris
          </Link>
          <Link href="/barcelona" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-5 py-2.5 rounded-xl transition-colors">
            🇪🇸 Barcelona
          </Link>
          <Link href="/rome" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-5 py-2.5 rounded-xl transition-colors">
            🇮🇹 Rome
          </Link>
        </div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  const RATING_OPTS = [
    { value: 0, label: "All ratings" },
    { value: 4.0, label: "★ 4.0+" },
    { value: 4.5, label: "★ 4.5+" },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
          📍 Places Near You
        </h1>
        <p className="text-slate-500 text-sm">
          {nearbyPlaces.length} place{nearbyPlaces.length !== 1 ? "s" : ""} within 2 km ·{" "}
          {detectedCity.label}
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Open Now */}
        <button
          onClick={() => setOpenNowOnly((v) => !v)}
          className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
            openNowOnly
              ? "bg-green-500 border-green-500 text-white"
              : "bg-white border-slate-200 text-slate-700 hover:border-green-400"
          }`}
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${openNowOnly ? "bg-white" : "bg-green-500"}`} />
          Open Now
        </button>

        {/* Rating */}
        {RATING_OPTS.map((r) => (
          <button
            key={r.value}
            onClick={() => setMinRating(r.value)}
            className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
              minRating === r.value
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-white border-slate-200 text-slate-700 hover:border-orange-300"
            }`}
          >
            {r.label}
          </button>
        ))}

        {/* Category — All */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
            selectedCategory === "all"
              ? "bg-slate-900 border-slate-900 text-white"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
          }`}
        >
          All
        </button>

        {/* Categories present in nearby results */}
        {CATEGORIES.filter((cat) => nearbyPlaces.some((p) => p.categories.includes(cat.id))).map(
          (cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)
              }
              className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          )
        )}
      </div>

      {/* Map + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Cards column */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-3xl mb-3">🔍</p>
              <p className="font-semibold text-slate-600">No places match your filters</p>
              <p className="text-sm mt-1">Try removing some filters</p>
            </div>
          ) : (
            filtered.map((place) => {
              const open = isOpenNow(place.openingHours);
              return (
                <div key={place.id}>
                  {/* Distance + open/closed strip */}
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-600">
                        {fmtDist(place._distM)}
                      </span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-500">{fmtWalk(place._distM)}</span>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        open
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      {open ? "● Open Now" : "● Closed"}
                    </span>
                  </div>
                  <PlaceCard place={place} compact />
                </div>
              );
            })
          )}
        </div>

        {/* Map column — sticky on desktop */}
        <div className="lg:sticky lg:top-6 h-[420px] lg:h-[600px]">
          <NearMeMap places={filtered} userLat={lat} userLng={lng} zoom={15} />
        </div>
      </div>
    </>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────
export default function NearMePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-28 gap-3 text-slate-400">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm font-medium">Finding places near you…</p>
            </div>
          }
        >
          <NearMeContent />
        </Suspense>
      </main>
    </div>
  );
}
