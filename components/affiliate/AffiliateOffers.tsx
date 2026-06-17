import { getOffersByCity, type AffiliateOffer } from "@/lib/affiliate/offers";
import AffiliateDisclosure from "./AffiliateDisclosure";

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {
    "day-trip": "Day Trip",
    "medina-tour": "Guided Tour",
    activity: "Workshop",
    food: "Food Tour",
    attraction: "Attraction",
    "cooking-class": "Cooking Class",
  },
  fr: {
    "day-trip": "Excursion",
    "medina-tour": "Visite guidée",
    activity: "Atelier",
    food: "Tour gastronomique",
    attraction: "Attraction",
    "cooking-class": "Cours de cuisine",
  },
};

const CITY_NAMES: Record<string, Record<string, string>> = {
  fes: { en: "Fès", fr: "Fès" },
  marrakech: { en: "Marrakech", fr: "Marrakech" },
  paris: { en: "Paris", fr: "Paris" },
  barcelona: { en: "Barcelona", fr: "Barcelone" },
  rome: { en: "Rome", fr: "Rome" },
};

function formatPrice(offer: AffiliateOffer): string {
  return `$${offer.priceFrom}`;
}

interface AffiliateOffersProps {
  citySlug: string;
  locale?: string;
  className?: string;
}

export default function AffiliateOffers({
  citySlug,
  locale = "en",
  className = "",
}: AffiliateOffersProps) {
  const offers = getOffersByCity(citySlug);
  if (offers.length === 0) return null;

  const lang = locale === "fr" ? "fr" : "en";
  const cityName = CITY_NAMES[citySlug]?.[lang] ?? citySlug;
  const labels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.en;

  const heading = lang === "fr"
    ? `Tours & expériences recommandés à ${cityName}`
    : `Recommended Tours & Experiences in ${cityName}`;

  return (
    <section className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 ${className}`}>
      <h2
        className="text-xl font-bold text-slate-900 mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {heading}
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        {lang === "fr"
          ? "Sélectionnés par l'équipe CityTaste. Réservez en toute confiance."
          : "Hand-picked by the CityTaste team. Book with confidence."}
      </p>

      <div className="space-y-4">
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={offer.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
              {offer.category === "day-trip" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              {offer.category === "medina-tour" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
              {offer.category === "activity" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              )}
              {!["day-trip", "medina-tour", "activity"].includes(offer.category) && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {labels[offer.category] ?? offer.category}
                </span>
                <span className="text-xs text-slate-400 capitalize">{offer.platform}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                {offer.title}
              </h3>
            </div>

            <div className="flex-shrink-0 text-right">
              <p className="text-xs text-slate-400">
                {lang === "fr" ? "à partir de" : "from"}
              </p>
              <p className="text-lg font-bold text-slate-900">{formatPrice(offer)}</p>
            </div>
          </a>
        ))}
      </div>

      <AffiliateDisclosure locale={locale} className="mt-5" />
    </section>
  );
}
