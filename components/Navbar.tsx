"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale, LOCALES, type Locale } from "@/lib/i18n";

const CITIES = [
  { label: "🇫🇷 Paris",     href: "/paris" },
  { label: "🇪🇸 Barcelona", href: "/barcelona" },
  { label: "🇮🇹 Rome",      href: "/rome" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t: tRaw } = useLocale();
  const t = (key: string) => tRaw(`nav.${key}`);

  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [citiesOpen,      setCitiesOpen]       = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [langOpen,        setLangOpen]         = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const currentLang = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  function switchLocale(l: Locale) {
    setLocale(l);
    setLangOpen(false);
  }

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
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {t("home")}
            </Link>

            <Link
              href="/blog"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {t("blog")}
            </Link>

            <Link
              href="/plan"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/plan")
                  ? "bg-[#E63946] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              ✨ {t("plan")}
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
                {t("cities")}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${citiesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

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

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Switch language"
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="font-bold">{currentLang.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                  {LOCALES.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => switchLocale(l.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                        locale === l.id
                          ? "bg-[#E63946] text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#E63946]"
                      }`}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      {l.label}
                    </button>
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
            {t("home")}
          </Link>

          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/blog") ? "bg-[#E63946] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t("blog")}
          </Link>

          <Link
            href="/plan"
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/plan") ? "bg-[#E63946] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            ✨ {t("plan")}
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
              {t("cities")}
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
              <div className="mt-1 ms-3 space-y-0.5 border-s-2 border-slate-100 ps-3">
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

          {/* Mobile language switcher */}
          <div className="pt-2 border-t border-slate-100">
            <p className="px-4 py-1 text-xs font-bold uppercase tracking-widest text-slate-400">Language</p>
            <div className="flex gap-2 px-2 py-1 flex-wrap">
              {LOCALES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { switchLocale(l.id); setMobileOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    locale === l.id
                      ? "bg-[#E63946] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
