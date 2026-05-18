"use client";
import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import NearMeResultsMap from "@/components/NearMeResultsMap";
import type { NearMePlace, NearMeResponse } from "@/app/api/near-me/route";

// ── Haversine ─────────────────────────────────────────────────────────────────
function haversineM(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(lat2 - lat1);
  const dLng = r(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(m: number) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}
function fmtWalk(m: number) {
  return `${Math.max(1, Math.round(m / 80))} min`;
}

// ── Category config ───────────────────────────────────────────────────────────
const TYPES = [
  { id: "restaurant", label: "Restaurants", emoji: "🍽️" },
  { id: "cafe", label: "Cafés", emoji: "☕" },
  { id: "bar", label: "Bars", emoji: "🍸" },
  { id: "tourist_attraction", label: "Attractions", emoji: "🏛️" },
] as const;

type PlaceType = (typeof TYPES)[number]["id"];

const PRICE_LABEL = ["", "€", "€€", "€€€", "€€€€"];

// ── Place card for Google Places result ───────────────────────────────────────
function GooglePlaceCard({
  place,
  distM,
}: {
  place: NearMePlace;
  distM: number;
}) {
  const photoSrc = place.photoUrl ?? null;

  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.placeId}`;

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      {/* Photo */}
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt={place.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">
            📍
          </div>
        )}

        {/* Open / Closed badge */}
        {place.openNow !== null && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                place.openNow
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {place.openNow ? "● Open Now" : "● Closed"}
            </span>
          </div>
        )}

        {/* Distance pill */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {fmtDist(distM)} · {fmtWalk(distM)} walk
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug">{place.name}</h3>
          {place.priceLevel !== null && (
            <span className="text-slate-400 text-xs font-medium shrink-0">
              {PRICE_LABEL[place.priceLevel] ?? ""}
            </span>
          )}
        </div>

        {/* Rating */}
        {place.rating !== null && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-orange-400 text-xs font-bold">
              ★ {place.rating.toFixed(1)}
            </span>
            <span className="text-slate-400 text-xs">
              ({place.userRatingsTotal.toLocaleString()} reviews)
            </span>
          </div>
        )}

        <p className="text-slate-500 text-xs mb-3 leading-snug truncate">{place.vicinity}</p>

        {/* Action buttons */}
        <div className="flex gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors active:scale-[0.98]"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.027A8.25 8.25 0 006 8.25c0 3.33 1.556 6.024 3.5 8.028a19.583 19.583 0 002.684 2.28 16.975 16.975 0 001.143.743zM12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            Open in Maps
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors active:scale-[0.98]"
            title="View on Google Maps"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}

// ── Inner content (uses useSearchParams → inside Suspense) ────────────────────
function NearMeContent() {
  const params = useSearchParams();
  const lat = parseFloat(params.get("lat") ?? "");
  const lng = parseFloat(params.get("lng") ?? "");
  const initialType = (params.get("type") ?? "restaurant") as PlaceType;

  const [selectedType, setSelectedType] = useState<PlaceType>(initialType);
  const [data, setData] = useState<NearMeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasLocation = Number.isFinite(lat) && Number.isFinite(lng);

  useEffect(() => {
    if (!hasLocation) return;
    setLoading(true);
    setError(null);
    fetch(`/api/near-me?lat=${lat}&lng=${lng}&type=${selectedType}&radius=1500`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [lat, lng, selectedType, hasLocation]);

  // Places with distance attached
  const placesWithDist = useMemo(
    () =>
      (data?.places ?? []).map((p) => ({
        ...p,
        _distM: haversineM(lat, lng, p.lat, p.lng),
      })),
    [data, lat, lng]
  );

  // ── No location ──────────────────────────────────────────────────────────────
  if (!hasLocation) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">📍</p>
        <h2 className="text-2xl font-black text-slate-900 mb-2">No location detected</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          Go back to the homepage and tap &ldquo;Find places near me&rdquo;.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const cityLabel = data?.cityName ?? "your location";
  const neighborhoodLabel = data?.neighborhood ?? "";

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
          Near You{cityLabel !== "your location" ? ` in ${cityLabel}` : ""}
        </h1>
        <p className="text-slate-500 text-sm">
          {neighborhoodLabel ? `${neighborhoodLabel} · ` : ""}
          {loading
            ? "Searching…"
            : data
            ? `${data.places.length} places within 1.5 km`
            : ""}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
              selectedType === t.id
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
            }`}
          >
            <span>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
          <strong>Error:</strong> {error}
          {error.includes("FOURSQUARE_API_KEY") && (
            <p className="mt-1 text-xs text-red-500">
              Add <code className="font-mono">FOURSQUARE_API_KEY</code> to your <code>.env.local</code> file.
            </p>
          )}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
              <div className="h-44 bg-slate-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && data && (
        <>
          {data.places.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-slate-600">No places found nearby</p>
              <p className="text-sm mt-1">Try a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {placesWithDist.map((place) => (
                  <GooglePlaceCard key={place.placeId} place={place} distM={place._distM} />
                ))}
              </div>

              {/* Map — sticky on desktop */}
              <div className="lg:sticky lg:top-6 h-[480px] lg:h-[640px]">
                <NearMeResultsMap
                  places={placesWithDist.map((p) => ({
                    placeId: p.placeId,
                    name: p.name,
                    lat: p.lat,
                    lng: p.lng,
                    rating: p.rating,
                    vicinity: p.vicinity,
                  }))}
                  userLat={lat}
                  userLng={lng}
                  zoom={15}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
