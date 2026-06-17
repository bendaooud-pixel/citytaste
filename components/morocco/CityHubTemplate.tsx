import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GygWidget from "@/components/affiliate/GygWidget";
import GygButton from "@/components/affiliate/GygButton";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import AffiliateOffers from "@/components/affiliate/AffiliateOffers";
import type { Guide, MoroccoLocale } from "@/lib/morocco/types";

interface Props {
  citySlug: string;
  cityName: string;
  locale: MoroccoLocale;
  guides: Guide[];
  heroImage: string;
  description: string;
}

export default function CityHubTemplate({ citySlug, cityName, locale, guides, heroImage, description }: Props) {
  const localePrefix = locale === "en" ? "/morocco" : `/morocco/${locale}`;
  const isFr = locale === "fr";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={heroImage}
            alt={cityName}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto w-full">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                {isFr ? "Accueil" : "Home"}
              </Link>
              <span>&rsaquo;</span>
              <Link href={localePrefix} className="hover:text-white transition-colors">
                {isFr ? "Maroc" : "Morocco"}
              </Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">{cityName}</span>
            </nav>
            <h1
              className="text-white text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {cityName}
            </h1>
            <p className="text-white/70 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            {isFr ? `Nos guides ${cityName}` : `${cityName} Guides`}
          </h2>

          {guides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {guides.map((g) => (
                <Link
                  key={g.frontmatter.slug}
                  href={`${localePrefix}/${g.frontmatter.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={g.frontmatter.heroImage}
                      alt={g.frontmatter.h1}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-orange-500 uppercase">{g.frontmatter.category}</span>
                    <h3
                      className="font-bold text-slate-900 mt-1 text-lg leading-snug group-hover:text-orange-500 transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {g.frontmatter.h1}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2">
                      {g.frontmatter.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 mb-12">
              {isFr ? "Guides bientôt disponibles." : "Guides coming soon."}
            </p>
          )}

          {/* GetYourGuide Activities */}
          <section className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              {isFr
                ? `Tours & expériences recommandés à ${cityName}`
                : `Recommended Tours & Experiences in ${cityName}`}
            </h2>
            <p className="text-slate-500 text-sm mb-5">
              {isFr
                ? "Réservez des visites guidées, des excursions et des expériences locales."
                : "Book guided tours, day trips and local experiences."}
            </p>
            <GygWidget
              citySlug={citySlug}
              locale={locale}
              numberOfItems={3}
              className="mb-4"
            />
            <GygButton citySlug={citySlug} locale={locale} />
            <AffiliateDisclosure locale={locale} className="mt-4" />
          </section>

          {/* Viator Offers */}
          <AffiliateOffers citySlug={citySlug} locale={locale} className="mb-10" />

          {/* Link to main city page if Marrakech */}
          {citySlug === "marrakech" && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {isFr ? "Restaurants & bonnes adresses" : "Restaurants & curated places"}
              </h2>
              <p className="text-slate-600 text-sm mb-4">
                {isFr
                  ? "Découvrez aussi nos restaurants, hammams et adresses testées à Marrakech."
                  : "Explore our curated restaurants, hammams and hidden gems in Marrakech."}
              </p>
              <Link
                href="/marrakech"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                {isFr ? "Voir les adresses Marrakech" : "Explore Marrakech places"} &rarr;
              </Link>
            </div>
          )}

          {/* Back to Morocco hub */}
          <div className="text-center">
            <Link
              href={localePrefix}
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              &larr; {isFr ? "Retour au guide Maroc" : "Back to Morocco guide"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
