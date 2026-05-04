"use client";
import Link from "next/link";
import { places } from "@/lib/data";
import { useFavorites } from "@/lib/useFavorites";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceCard from "@/components/PlaceCard";

export default function FavoritesPage() {
  const { favorites, hydrated } = useFavorites();

  const favPlaces = places.filter((p) => favorites.includes(p.id));

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            Your collection
          </p>
          <h1
            className="text-4xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            My Favourites
          </h1>
          {hydrated && favPlaces.length > 0 && (
            <p className="text-slate-500 mt-2 text-sm">
              {favPlaces.length} saved spot{favPlaces.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {!hydrated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : favPlaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6">🤍</div>
            <h2
              className="text-2xl font-bold text-slate-800 mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              No favourites yet
            </h2>
            <p className="text-slate-500 text-base max-w-sm mb-8">
              Browse our curated spots and tap the ♡ heart to save your favourite
              restaurants and cafés.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/cities/paris"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-orange-200"
              >
                🇫🇷 Explore Paris
              </Link>
              <Link
                href="/cities/barcelona"
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl transition-colors border border-slate-200 shadow-sm"
              >
                🇪🇸 Explore Barcelona
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
