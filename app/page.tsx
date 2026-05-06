"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";
import StarRating from "@/components/StarRating";

const RED = "#E63946";

const CAT_IMAGES: Record<string, string> = {
  restaurants:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  cafes:
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80",
  brunch:
    "https://images.unsplash.com/photo-1561469372-eb082109bf93?w=400&q=80",
  halal:
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
  patisseries:
    "https://images.unsplash.com/photo-1488477181210-6ef054d3fb1d?w=400&q=80",
  monuments:
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80",
  markets:
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80",
  "cheap-eats":
    "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
  bars: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
  desserts:
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80",
  activities:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
  museums:
    "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80",
  romantic:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
  "family-friendly":
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
};

const CAT_PRICE: Record<string, string> = {
  restaurants: "$12 – $45",
  cafes: "$4 – $12",
  brunch: "$8 – $25",
  halal: "$8 – $30",
  patisseries: "$3 – $15",
  monuments: "$15 – $30",
  markets: "$5 – $20",
  "cheap-eats": "$5 – $15",
  bars: "$10 – $25",
  desserts: "$4 – $12",
  activities: "$20 – $80",
  museums: "$12 – $25",
  romantic: "$40 – $120",
  "family-friendly": "$15 – $50",
};

const FOOTER_LINKS = {
  About: [
    { label: "Our Story", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "#" },
  ],
  Contact: [
    { label: "hello@citytaste.co", href: "mailto:hello@citytaste.co" },
    { label: "Support", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  Cities: [
    { label: "🇫🇷 Paris", href: "/cities/paris" },
    { label: "🇪🇸 Barcelona", href: "/cities/barcelona" },
    { label: "🇮🇹 Rome — soon", href: "#" },
    { label: "🇯🇵 Tokyo — soon", href: "#" },
  ],
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const featured = places.filter((p) => p.featured).slice(0, 3);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  function getHours(p: (typeof places)[0]) {
    const h = (p.openingHours as Record<string, string>)?.[today];
    return h || "Open today";
  }

  function scrollCat(dir: number) {
    carouselRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Announcement Bar ── */}
      <div
        style={{ backgroundColor: RED }}
        className="text-white text-center py-2.5 px-4 text-sm font-medium tracking-wide"
      >
        Discover the best food &amp; places in Paris and Barcelona
      </div>

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Left: store buttons */}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="hidden sm:flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-400 transition-colors"
              >
                <AppleIcon />
                App Store
              </a>
              <a
                href="#"
                className="hidden sm:flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-400 transition-colors"
              >
                <GooglePlayIcon />
                Google Play
              </a>
            </div>

            {/* Center: logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                City<span style={{ color: RED }}>Taste</span>
              </span>
            </Link>

            {/* Right: cart + login */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <CartIcon />
              </button>
              <Link
                href="/favorites"
                style={{ backgroundColor: RED }}
                className="hidden sm:block text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "88vh", minHeight: 600 }}>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="Food ingredients"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,10,10,0.70)" }} />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-none tracking-tight mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
          >
            DISCOVER THE BEST<br />
            <span style={{ color: RED }}>FOOD</span> IN EVERY CITY
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Your ultimate guide to restaurants, cafés, monuments and hidden gems
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-4 py-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cuisine type, restaurant name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <div className="hidden sm:flex items-center px-4 py-3 border-l border-gray-200 gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: RED }} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.027A8.25 8.25 0 006 8.25c0 3.33 1.556 6.024 3.5 8.028a19.583 19.583 0 002.684 2.28 16.975 16.975 0 001.143.743zM12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              Paris, Barcelona
            </div>
            <button
              style={{ backgroundColor: RED }}
              className="text-white font-bold px-8 py-3 text-sm hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>

        {/* Bottom white fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Floating Stats Card ── */}
      <div className="relative z-20 max-w-2xl mx-auto px-4 -mt-14">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 px-6 py-6 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { icon: "📍", value: "2", label: "Cities Available" },
            { icon: "🍽️", value: "40+", label: "Places Listed" },
            { icon: "⭐", value: "4.8", label: "Average Rating" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="text-center px-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg mx-auto mb-2"
                style={{ backgroundColor: "#FEE2E2" }}
              >
                {icon}
              </div>
              <div className="text-2xl font-black" style={{ color: RED }}>
                {value}
              </div>
              <div className="text-gray-400 text-xs mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explore Places ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Explore <span style={{ color: RED }}>Places</span>
          </h2>
          <button
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: RED }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.027A8.25 8.25 0 006 8.25c0 3.33 1.556 6.024 3.5 8.028a19.583 19.583 0 002.684 2.28 16.975 16.975 0 001.143.743zM12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            Add location
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((place) => {
            const hours = getHours(place);
            const isClosed = hours === "Closed";
            return (
              <Link
                key={place.id}
                href={`/cities/${place.citySlug}/places/${place.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={place.photos[0]}
                      alt={place.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Heart */}
                    <div className="absolute top-3 right-3">
                      <FavoriteButton placeId={place.id} size="sm" />
                    </div>
                    {/* Rating badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                      <StarRating rating={place.rating} size="sm" />
                      <span className="text-xs font-bold text-gray-800">{place.rating}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#E63946] transition-colors">
                      {place.name}
                    </h3>
                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {place.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2.5 py-0.5 rounded-full font-medium text-gray-600"
                          style={{ backgroundColor: "#F3F4F6" }}
                        >
                          {cat.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                    {/* Opening hours */}
                    <div
                      className="flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: isClosed ? "#DC2626" : "#16A34A" }}
                    >
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {hours}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/cities/paris"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3 rounded-xl border-2 transition-all hover:text-white hover:opacity-90"
            style={{ borderColor: RED, color: RED }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = RED; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; }}
          >
            View all places
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Get Your Guide 24/7 ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: RED }}
            >
              Always available
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Get Your Guide{" "}
              <span style={{ color: RED }}>24/7</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md text-[15px]">
              Access our curated food guides anytime, anywhere. Save your favourite
              spots, check opening hours, get directions, and discover local tips —
              all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cities/paris"
                style={{ backgroundColor: RED }}
                className="text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Explore Paris
              </Link>
              <Link
                href="/cities/barcelona"
                className="font-bold px-6 py-3 rounded-xl text-sm border-2 transition-colors hover:bg-red-50"
                style={{ borderColor: RED, color: RED }}
              >
                Explore Barcelona
              </Link>
            </div>
          </div>

          <div className="flex-1 order-1 md:order-2 w-full">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                alt="Dining experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Top rated</p>
                    <p className="text-sm font-black text-gray-900">4.8 / 5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Browse by <span style={{ color: RED }}>Category</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCat(-1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors text-sm font-bold"
              >
                ←
              </button>
              <button
                onClick={() => scrollCat(1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors text-sm font-bold"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/cities/paris?category=${cat.id}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="flex flex-col items-center w-36">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-shadow ring-2 ring-transparent group-hover:ring-[#E63946] transition-all duration-300">
                    <Image
                      src={CAT_IMAGES[cat.id] ?? CAT_IMAGES.restaurants}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="112px"
                    />
                  </div>
                  <p className="font-bold text-gray-900 text-sm text-center">
                    {cat.emoji} {cat.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {CAT_PRICE[cat.id] ?? "$5 – $50"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Cities ── */}
      <section className="border-t border-b border-gray-100 bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-7">
            Featured Cities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14">
            {[
              { name: "🇫🇷 Paris", href: "/cities/paris", live: true },
              { name: "🇪🇸 Barcelona", href: "/cities/barcelona", live: true },
              { name: "🇮🇹 Rome", href: "#", live: false },
              { name: "🇯🇵 Tokyo", href: "#", live: false },
              { name: "🇺🇸 New York", href: "#", live: false },
            ].map(({ name, href, live }) => (
              <Link
                key={name}
                href={href}
                className={`text-sm font-bold transition-colors ${
                  live
                    ? "text-gray-700 hover:text-[#E63946]"
                    : "text-gray-300 cursor-default pointer-events-none"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#1A1A1A" }} className="text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            {/* Brand col (wider) */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍽️</span>
                <span className="text-xl font-black text-white">
                  City<span style={{ color: RED }}>Taste</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-500 mb-6 max-w-xs">
                Your curated guide to the world&apos;s best restaurants, cafés and food
                experiences. Honest, passionate, always hungry.
              </p>
              {/* Social */}
              <div className="flex gap-3 mb-6">
                {[
                  { label: "Instagram", icon: <InstagramIcon /> },
                  { label: "Facebook", icon: <FacebookIcon /> },
                  { label: "Twitter", icon: <TwitterIcon /> },
                ].map(({ label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
              {/* App badges */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
                >
                  <AppleIcon />
                  App Store
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
                >
                  <GooglePlayIcon />
                  Google Play
                </a>
              </div>
            </div>

            {/* Link columns */}
            {(Object.entries(FOOTER_LINKS) as [string, { label: string; href: string }[]][]).map(
              ([title, links]) => (
                <div key={title}>
                  <h3 className="text-white font-bold text-sm mb-4">{title}</h3>
                  <ul className="space-y-2.5">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-gray-800 text-xs text-gray-600">
            <p>© 2025 CityTaste. Made with ♥ for food lovers everywhere.</p>
            <p>Powered by Next.js · Tailwind CSS · Supabase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Inline SVG icons ── */
function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.34.19.74.19 1.09 0l10.65-6.15-2.29-2.29-9.45 8.44zM.3 1.67C.11 2.02 0 2.43 0 2.88v18.24c0 .45.11.86.3 1.21l.07.07 10.22-10.22v-.24L.37 1.6.3 1.67zM20.94 10.1l-2.88-1.66-2.57 2.57 2.57 2.57 2.9-1.67c.83-.48.83-1.26-.02-1.81zM4.27.24L14.92 6.39l-2.29 2.29L3.18.24c.35-.2.75-.2 1.09 0z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
