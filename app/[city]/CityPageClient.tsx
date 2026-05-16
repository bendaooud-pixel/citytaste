"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { City, Place, Category, FilterState } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceCard from "@/components/PlaceCard";
import CategoryTabs from "@/components/CategoryTabs";
import FilterBar from "@/components/FilterBar";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading map…
    </div>
  ),
});

interface Props {
  city: City;
  places: Place[];
}

export default function CityPageClient({ city, places: allPlaces }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    minRating: 0,
    maxPrice: 4,
    halal: false,
    family: false,
    terrace: false,
    sortBy: "rating",
  });
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = allPlaces;
    if (filters.category !== "all") {
      result = result.filter((p) => p.categories.includes(filters.category as Category));
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    result = result.filter((p) => p.priceLevel <= filters.maxPrice);
    if (filters.halal) result = result.filter((p) => p.isHalal);
    if (filters.family) result = result.filter((p) => p.isFamilyFriendly);
    if (filters.terrace) result = result.filter((p) => p.hasTerrace);
    return [...result].sort((a, b) => {
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "reviews") return b.reviewCount - a.reviewCount;
      if (filters.sortBy === "price-low") return a.priceLevel - b.priceLevel;
      if (filters.sortBy === "price-high") return b.priceLevel - a.priceLevel;
      return 0;
    });
  }, [allPlaces, filters]);

  const counts = useMemo(() => {
    const obj: Partial<Record<Category | "all", number>> = { all: allPlaces.length };
    CATEGORIES.forEach((cat) => {
      obj[cat.id] = allPlaces.filter((p) => p.categories.includes(cat.id)).length;
    });
    return obj;
  }, [allPlaces]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── City Hero ── */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={city.image}
            alt={`Best restaurants and cafés in ${city.name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-7xl mx-auto w-full">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-white font-medium" aria-current="page">{city.name}</span>
            </nav>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">{city.flag} {city.country}</p>
                <h1
                  className="text-white text-4xl md:text-5xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {city.name}
                </h1>
                <p className="text-white/70 mt-2 max-w-xl text-sm leading-relaxed hidden md:block">
                  {city.description}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
                  {allPlaces.length} curated spots
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        <div className="sticky top-16 z-30 bg-brand-cream/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <CategoryTabs
              active={filters.category}
              onChange={(cat) => setFilters((f) => ({ ...f, category: cat }))}
              counts={counts}
            />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile controls */}
          <div className="flex items-center gap-3 mb-6 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                ${showFilters ? "bg-orange-500 text-white border-orange-500" : "bg-white border-slate-200 text-slate-700"}`}
            >
              ⚙️ Filters
              {(filters.minRating > 0 || filters.maxPrice < 4 || filters.halal || filters.family || filters.terrace) && (
                <span className="bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">!</span>
              )}
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                ${showMap ? "bg-orange-500 text-white border-orange-500" : "bg-white border-slate-200 text-slate-700"}`}
            >
              🗺️ {showMap ? "List" : "Map"}
            </button>
            <span className="ml-auto text-sm text-slate-500">{filtered.length} spots</span>
          </div>

          {showFilters && (
            <div className="md:hidden mb-6">
              <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
            </div>
          )}

          {showMap && (
            <div className="md:hidden mb-6 h-80 rounded-2xl overflow-hidden shadow-lg">
              <Map places={filtered} center={city.coordinates} zoom={13} />
            </div>
          )}

          {/* Desktop: 3-col layout */}
          <div className="hidden md:grid md:grid-cols-[280px_1fr_380px] gap-6">
            <aside className="sticky top-32 self-start">
              <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
            </aside>
            <section aria-label="Places">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filtered.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-5xl mb-4">🍽️</p>
                  <p className="text-slate-600 font-medium mb-2">No places match your filters</p>
                  <button
                    onClick={() => setFilters({ category: "all", minRating: 0, maxPrice: 4, halal: false, family: false, terrace: false, sortBy: "rating" })}
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
            <aside className="sticky top-32 self-start h-[600px] rounded-2xl overflow-hidden shadow-lg">
              <Map places={filtered} center={city.coordinates} zoom={13} />
            </aside>
          </div>

          {/* Mobile: place grid */}
          <div className="md:hidden">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-slate-500">No places match your filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
