"use client";
import { useState } from "react";
import { cities } from "@/lib/data";
import CityCard from "@/components/CityCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-rose-950 text-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/20">
              <span>🍽️</span> Your culinary travel companion
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Discover the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                World&apos;s Best Bites
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Curated restaurants, cafés and hidden gems in the world&apos;s greatest
              food cities. Honest picks, real reviews, zero compromise.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search a city — Paris, Barcelona…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 text-base placeholder:text-slate-400 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-400/30"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { value: "2", label: "Cities" },
                { value: "22+", label: "Curated Spots" },
                { value: "100%", label: "Honest Reviews" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{value}</div>
                  <div className="text-white/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-[#fff8f0]"
            style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
          />
        </section>

        {/* ── Cities ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Explore Cities
            </p>
            <h2
              className="text-4xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {query
                ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`
                : "Where do you want to eat?"}
            </h2>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {filtered.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🗺️</p>
              <p className="text-slate-600 text-lg mb-2">No cities found for &quot;{query}&quot;</p>
              <p className="text-slate-400 text-sm">Try Paris or Barcelona</p>
            </div>
          )}
        </section>

        {/* ── How it works ── */}
        <section className="bg-[#1e293b] text-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your perfect meal, one click away
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: "🏙️", title: "Pick a City", desc: "Choose from our curated list of food-forward destinations." },
                { icon: "🔎", title: "Filter & Discover", desc: "Browse by category, rating, price, halal, terrace and more." },
                { icon: "🗺️", title: "Get There", desc: "Open in Google Maps, view the menu and save your favourites." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center">
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Find exactly what you crave
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { emoji: "🍽️", label: "Restaurants" },
              { emoji: "☕", label: "Cafés" },
              { emoji: "🥞", label: "Brunch" },
              { emoji: "🌙", label: "Halal" },
              { emoji: "💰", label: "Cheap Eats" },
              { emoji: "💑", label: "Romantic" },
              { emoji: "👨‍👩‍👧", label: "Family" },
            ].map(({ emoji, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-2 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-semibold text-slate-700 text-center">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
