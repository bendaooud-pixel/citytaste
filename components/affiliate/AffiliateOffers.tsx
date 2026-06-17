"use client";

import { useState } from "react";
import Image from "next/image";
import { getOffersByCity } from "@/lib/affiliate/offers";
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

function OfferImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        <span className="text-slate-400 text-xs font-medium">CityTaste</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setFailed(true)}
    />
  );
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
    ? `Tours recommandés à ${cityName}`
    : `Recommended Tours in ${cityName}`;

  const buttonLabel = lang === "fr" ? "Réserver sur Viator" : "Book on Viator";

  return (
    <section className={className}>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={offer.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100 flex flex-col"
          >
            <div className="relative h-44 overflow-hidden">
              <OfferImage src={offer.imageUrl} alt={offer.title} />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {labels[offer.category] ?? offer.category}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-500 transition-colors mb-3 flex-1">
                {offer.title}
              </h3>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-400">
                    {lang === "fr" ? "à partir de" : "from"}
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    ${offer.priceFrom}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-[#FF5533] text-white text-xs font-semibold px-3 py-2 rounded-lg group-hover:bg-[#E64D2E] transition-colors whitespace-nowrap">
                  {buttonLabel}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <AffiliateDisclosure locale={locale} className="mt-4" />
    </section>
  );
}
