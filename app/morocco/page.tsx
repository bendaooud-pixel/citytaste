import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllGuides } from "@/lib/morocco/content";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Morocco Travel Guide ${YEAR} — Food, Tours & Hidden Gems | CityTaste`,
  description:
    `Your complete guide to Morocco: best restaurants, riads, hammams, desert tours and city guides for Marrakech, Fès, Chefchaouen and beyond. Updated ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco`,
    languages: {
      fr: `${BASE}/morocco/fr`,
      it: `${BASE}/morocco/it`,
      es: `${BASE}/morocco/es`,
    },
  },
  openGraph: {
    title: `Morocco Travel Guide ${YEAR} | CityTaste`,
    description: "Your complete guide to Morocco: food, tours & hidden gems.",
    type: "website",
    url: `${BASE}/morocco`,
  },
};

const CITIES = [
  { slug: "marrakech", href: "/marrakech", name: "Marrakech", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", tagline: "Medina, souks & rooftops" },
  { slug: "fes", href: "/morocco", name: "Fès", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80", tagline: "Tanneries, medersas & food" },
  { slug: "chefchaouen", href: "/morocco", name: "Chefchaouen", image: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=600&q=80", tagline: "The blue pearl" },
  { slug: "essaouira", href: "/morocco", name: "Essaouira", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=600&q=80", tagline: "Atlantic coast & winds" },
  { slug: "rabat", href: "/morocco", name: "Rabat", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", tagline: "Capital & kasbah" },
  { slug: "merzouga", href: "/morocco", name: "Sahara Desert", image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80", tagline: "Dunes & starry nights" },
];

export default function MoroccoHubPage() {
  const allGuides = getAllGuides();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-80 md:h-[440px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1400&q=80"
            alt="Morocco travel guide"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto w-full">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">CityTaste Morocco</p>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Morocco Travel Guide
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl text-lg">
              Food guides, city itineraries, desert tours and hidden gems — everything you need to explore Morocco like a local.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Cities grid */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Explore by City
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={city.href}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{city.name}</h3>
                  <p className="text-white/60 text-xs">{city.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Latest guides */}
          {allGuides.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Latest Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {allGuides.slice(0, 6).map((g) => {
                  const loc = g.frontmatter.locale;
                  const prefix = loc === "en" ? "/morocco" : `/morocco/${loc}`;
                  return (
                    <Link
                      key={`${loc}-${g.frontmatter.slug}`}
                      href={`${prefix}/${g.frontmatter.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image src={g.frontmatter.heroImage} alt={g.frontmatter.h1} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-orange-500 uppercase">{g.frontmatter.category}</span>
                          {loc !== "en" && (
                            <span className="text-[10px] font-medium text-slate-400 uppercase border border-slate-200 rounded px-1.5 py-0.5">{loc}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-slate-900 mt-1 leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                          {g.frontmatter.h1}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* Explore Marrakech CTA */}
          <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] rounded-2xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Explore Marrakech
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Discover our curated restaurants, hammams, rooftops and hidden gems in Marrakech.
            </p>
            <Link
              href="/marrakech"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Explore Marrakech &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
