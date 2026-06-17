"use client";

import { useState } from "react";
import Image from "next/image";
import type { Activity } from "@/lib/activities/types";
import { localized } from "@/lib/activities/types";

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: { "day-trip": "Day Trip", "medina-tour": "Guided Tour", activity: "Workshop", food: "Food Tour", desert: "Desert", attraction: "Attraction", "cooking-class": "Cooking Class" },
  fr: { "day-trip": "Excursion", "medina-tour": "Visite guidée", activity: "Atelier", food: "Tour gastronomique", desert: "Désert", attraction: "Attraction", "cooking-class": "Cours de cuisine" },
  es: { "day-trip": "Excursión", "medina-tour": "Visita guiada", activity: "Taller", food: "Tour gastronómico", desert: "Desierto", attraction: "Atracción", "cooking-class": "Clase de cocina" },
  it: { "day-trip": "Escursione", "medina-tour": "Visita guidata", activity: "Laboratorio", food: "Tour gastronomico", desert: "Deserto", attraction: "Attrazione", "cooking-class": "Corso di cucina" },
};

const CTA_LABELS: Record<string, string> = {
  en: "Check availability",
  fr: "Vérifier la disponibilité",
  es: "Comprobar disponibilidad",
  it: "Verifica disponibilità",
};

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
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

interface Props {
  activity: Activity;
  locale?: string;
}

export default function ActivityCard({ activity, locale = "en" }: Props) {
  const title = localized(activity.title, activity.titleI18n, locale);
  const labels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.en;
  const cta = CTA_LABELS[locale] ?? CTA_LABELS.en;

  return (
    <a
      href={activity.affiliateUrl}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <CardImage src={activity.imageUrl ?? ""} alt={title} />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {labels[activity.category] ?? activity.category}
          </span>
        </div>
        {activity.platform && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-medium text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full capitalize">
              {activity.platform}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-500 transition-colors mb-2 flex-1 line-clamp-2">
          {title}
        </h3>

        {activity.duration && (
          <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activity.duration}
          </p>
        )}

        <div className="flex items-end justify-between gap-2 mt-auto pt-3 border-t border-slate-100">
          <div>
            {activity.priceFrom != null && (
              <>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {locale === "fr" ? "à partir de" : locale === "es" ? "desde" : locale === "it" ? "da" : "from"}
                </p>
                <p className="text-xl font-bold text-slate-900">
                  ${activity.priceFrom}
                </p>
              </>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 bg-[#F97316] text-white text-xs font-semibold px-3.5 py-2 rounded-lg group-hover:bg-orange-600 transition-colors whitespace-nowrap">
            {cta}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
