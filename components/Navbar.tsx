"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CITIES = [
  { label: "🇫🇷 Paris", href: "/paris" },
  { label: "🇪🇸 Barcelona", href: "/barcelona" },
  { label: "🇮🇹 Rome", href: "/rome" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🍽️</span>
            <span
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              City<span className="text-[#E63946]">Taste</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Home */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Home
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Blog
            </Link>

            {/* Cities dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCitiesOpen(true)}
              onMouseLeave={() => setCitiesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  CITIES.some((c) => pathname.startsWith(c.href))
                    ? "bg-[#E63946] text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Cities
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${citiesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {citiesOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                  {CITIES.map((city) => (
                    <Link
                      key={city.href}
                      href={city.href}
                      className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E63946] transition-colors"
                    >
                      {city.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/") ? "bg-[#E63946] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/blog") ? "bg-[#E63946] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Blog
          </Link>

          {/* Cities accordion */}
          <div>
            <button
              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                CITIES.some((c) => pathname.startsWith(c.href))
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cities
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileCitiesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileCitiesOpen && (
              <div className="mt-1 ml-3 space-y-0.5 border-l-2 border-slate-100 pl-3">
                {CITIES.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    onClick={() => { setMobileOpen(false); setMobileCitiesOpen(false); }}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#E63946] transition-colors"
                  >
                    {city.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
