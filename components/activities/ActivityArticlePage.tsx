import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ActivityCard from "./ActivityCard";
import type { Activity, City, Country, ActivityArticle } from "@/lib/activities/types";
import { localized } from "@/lib/activities/types";

const CTA_LABELS: Record<string, { book: string; ready: string; readySubtitle: string; from: string; disclosure: string }> = {
  en: {
    book: "Check availability & book",
    ready: "Ready to go?",
    readySubtitle: "Check availability and secure your spot.",
    from: "from",
    disclosure: "This page contains affiliate links. We earn a small commission at no extra cost to you.",
  },
  fr: {
    book: "Vérifier disponibilité & réserver",
    ready: "Prêt à partir ?",
    readySubtitle: "Vérifiez la disponibilité et réservez votre place.",
    from: "à partir de",
    disclosure: "Cette page contient des liens d'affiliation. Nous recevons une petite commission sans frais supplémentaires pour vous.",
  },
  es: {
    book: "Comprobar disponibilidad y reservar",
    ready: "¿Listo para ir?",
    readySubtitle: "Comprueba la disponibilidad y reserva tu plaza.",
    from: "desde",
    disclosure: "Esta página contiene enlaces de afiliado. Recibimos una pequeña comisión sin costo adicional para ti.",
  },
  it: {
    book: "Verifica disponibilità e prenota",
    ready: "Pronto a partire?",
    readySubtitle: "Verifica la disponibilità e assicura il tuo posto.",
    from: "da",
    disclosure: "Questa pagina contiene link di affiliazione. Riceviamo una piccola commissione senza costi aggiuntivi per te.",
  },
};

const NAV_LABELS: Record<string, { home: string; activities: string; experiences: string; faq: string; related: string }> = {
  en: { home: "Home", activities: "Activities", experiences: "Experiences", faq: "Frequently Asked Questions", related: "Related Experiences in {city}" },
  fr: { home: "Accueil", activities: "Activités", experiences: "Expériences", faq: "Questions Fréquentes", related: "Expériences similaires à {city}" },
  es: { home: "Inicio", activities: "Actividades", experiences: "Experiencias", faq: "Preguntas Frecuentes", related: "Experiencias relacionadas en {city}" },
  it: { home: "Home", activities: "Attività", experiences: "Esperienze", faq: "Domande Frequenti", related: "Esperienze simili a {city}" },
};

interface Props {
  activity: Activity;
  article: ActivityArticle;
  city: City;
  country: Country;
  locale: string;
  relatedActivities: Activity[];
}

export default function ActivityArticlePage({ activity, article, city, country, locale, relatedActivities }: Props) {
  const cta = CTA_LABELS[locale] ?? CTA_LABELS.en;
  const nav = NAV_LABELS[locale] ?? NAV_LABELS.en;
  const cityName = localized(city.name, city.nameI18n, locale);
  const countryName = localized(country.name, country.nameI18n, locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const BASE_URL = "https://www.citytaste.co";
  const pageUrl = `${BASE_URL}/${country.slug}${localePrefix}/${city.slug}/experiences/${activity.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav.home, item: BASE_URL },
      { "@type": "ListItem", position: 2, name: countryName, item: `${BASE_URL}/${country.slug}` },
      { "@type": "ListItem", position: 3, name: nav.activities, item: `${BASE_URL}/${country.slug}${localePrefix}/activities` },
      { "@type": "ListItem", position: 4, name: article.h1, item: pageUrl },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: article.h1,
    description: article.metaDescription,
    image: activity.imageUrl ? `${BASE_URL}${activity.imageUrl}` : undefined,
    brand: { "@type": "Organization", name: activity.platform },
    offers: {
      "@type": "Offer",
      price: activity.priceFrom,
      priceCurrency: activity.currency,
      availability: "https://schema.org/InStock",
      url: activity.affiliateUrl,
    },
  };

  const faqLd = article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  } : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Link href="/" className="hover:text-slate-600 transition-colors">{nav.home}</Link>
            <span>/</span>
            <Link href={`/${country.slug}${localePrefix}`} className="hover:text-slate-600 transition-colors">{countryName}</Link>
            <span>/</span>
            <Link href={`/${country.slug}${localePrefix}/activities`} className="hover:text-slate-600 transition-colors">{nav.activities}</Link>
            <span>/</span>
            <span className="text-slate-600">{cityName}</span>
          </nav>

          {/* H1 */}
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
            {article.h1}
          </h1>

          {/* Hero Image */}
          {activity.imageUrl && (
            <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden mb-0">
              <Image
                src={activity.imageUrl}
                alt={article.h1}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* Booking Box CTA — Above the Fold */}
          <div className="bg-white rounded-xl shadow-md p-5 md:p-6 -mt-6 relative z-10 mx-2 md:mx-4 border border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {activity.priceFrom != null && (
                  <p className="text-slate-900">
                    <span className="text-sm text-slate-500">{cta.from} </span>
                    <span className="text-2xl font-bold">${activity.priceFrom}</span>
                  </p>
                )}
                {activity.duration && (
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.duration}
                    {activity.platform && <span className="ml-2 text-xs text-slate-400 capitalize">via {activity.platform}</span>}
                  </p>
                )}
              </div>
              <a
                href={activity.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm md:text-base"
              >
                {cta.book}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 leading-snug">{cta.disclosure}</p>
          </div>

          {/* Article Body */}
          <article className="mt-10">
            <MarkdownRenderer body={article.body} />
          </article>

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {nav.faq}
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, i) => (
                  <details key={i} className="group bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
                      {item.q}
                      <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Second CTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center border border-orange-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              {cta.ready}
            </h3>
            <p className="text-sm text-slate-500 mb-5">{cta.readySubtitle}</p>
            <a
              href={activity.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              {cta.book}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Related Experiences */}
          {relatedActivities.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {nav.related.replace("{city}", cityName)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedActivities.map((a) => (
                  <ActivityCard
                    key={a.id}
                    activity={a}
                    locale={locale}
                    articleUrl={a.slug ? `/${country.slug}${localePrefix}/${city.slug}/experiences/${a.slug}` : undefined}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Link back to activities */}
          <div className="mt-10 text-center">
            <Link
              href={`/${country.slug}${localePrefix}/activities`}
              className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
            >
              &larr; {nav.activities} — {countryName}
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  );
}
