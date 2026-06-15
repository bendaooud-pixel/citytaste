import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllGuides } from "@/lib/morocco/content";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Guide Voyage Maroc ${YEAR} — Restaurants, Circuits & Pépites | CityTaste`,
  description: `Votre guide complet du Maroc : meilleurs restaurants, riads, hammams, circuits dans le désert et guides de villes pour Marrakech, Fès, Chefchaouen et au-delà. Mis à jour ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco/fr`,
    languages: {
      en: `${BASE}/morocco`,
      it: `${BASE}/morocco/it`,
      es: `${BASE}/morocco/es`,
    },
  },
  openGraph: {
    title: `Guide Voyage Maroc ${YEAR} | CityTaste`,
    description: "Votre guide complet du Maroc : gastronomie, circuits & pépites.",
    type: "website",
    url: `${BASE}/morocco/fr`,
  },
};

const CITIES = [
  { slug: "marrakech", name: "Marrakech", image: "/images/morocco/marrakech.jpg", tagline: "Médina, souks & rooftops" },
  { slug: "fes", name: "Fès", image: "/images/morocco/fes.jpg", tagline: "Tanneries, médersas & cuisine" },
  { slug: "chefchaouen", name: "Chefchaouen", image: "/images/morocco/chefchaouen.jpg", tagline: "La perle bleue" },
  { slug: "essaouira", name: "Essaouira", image: "/images/morocco/essaouira.jpg", tagline: "Côte atlantique & alizés" },
  { slug: "rabat", name: "Rabat", image: "/images/morocco/rabat.jpg", tagline: "Capitale & kasbah" },
  { slug: "merzouga", name: "Désert du Sahara", image: "/images/morocco/sahara-desert.jpg", tagline: "Dunes & nuits étoilées" },
];

export default function MoroccoFrHubPage() {
  const guides = getAllGuides("fr");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-80 md:h-[440px] overflow-hidden">
          <Image
            src="/images/morocco/morocco-hero.jpg"
            alt="Guide voyage Maroc"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto w-full">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">CityTaste Maroc</p>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Guide Voyage Maroc
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl text-lg">
              Guides gastronomiques, itinéraires de villes, circuits dans le désert et pépites cachées — tout ce qu&apos;il faut pour explorer le Maroc comme un local.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Cities grid */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Explorer par ville
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/morocco/fr/${city.slug}`}
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
          {guides.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Derniers guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {guides.slice(0, 6).map((g) => (
                  <Link
                    key={g.frontmatter.slug}
                    href={`/morocco/fr/${g.frontmatter.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={g.frontmatter.heroImage} alt={g.frontmatter.h1} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-orange-500 uppercase">{g.frontmatter.category}</span>
                      <h3 className="font-bold text-slate-900 mt-1 leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                        {g.frontmatter.h1}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] rounded-2xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Explorer Marrakech
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Découvrez nos {new Date().getFullYear()} adresses testées et approuvées à Marrakech — restaurants, hammams, rooftops et plus.
            </p>
            <Link
              href="/marrakech"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Voir Marrakech &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
