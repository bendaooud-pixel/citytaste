"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITIES, CITIES } from "@/lib/activities/static-data";

const CATEGORY_LABELS: Record<string, string> = {
  "day-trip": "Day Trip",
  "medina-tour": "Guided Tour",
  activity: "Experience",
  food: "Food Tour",
  desert: "Desert",
  attraction: "Attraction",
  "cooking-class": "Cooking Class",
};

function getFeaturedActivities() {
  const cityMap = Object.fromEntries(CITIES.map((c) => [c.id, c]));

  const sorted = [...ACTIVITIES]
    .filter((a) => a.slug && a.imageUrl)
    .sort((a, b) => a.priority - b.priority);

  // Mix cities: round-robin pick from each city to avoid clustering
  const byCityId = new Map<string, typeof sorted>();
  for (const a of sorted) {
    const arr = byCityId.get(a.cityId) ?? [];
    arr.push(a);
    byCityId.set(a.cityId, arr);
  }

  const result: typeof sorted = [];
  const iterators = [...byCityId.values()].map((arr) => ({ arr, idx: 0 }));
  while (result.length < 8) {
    let added = false;
    for (const it of iterators) {
      if (it.idx < it.arr.length && result.length < 8) {
        result.push(it.arr[it.idx]);
        it.idx++;
        added = true;
      }
    }
    if (!added) break;
  }

  return result.map((a) => ({
    ...a,
    city: cityMap[a.cityId],
  }));
}

const FEATURED = getFeaturedActivities();

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
        <span className="text-white/80 text-xs font-medium">CityTaste</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      loading="lazy"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setFailed(true)}
    />
  );
}

export default function HomepageExperiences() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Experiences in Morocco",
    numberOfItems: FEATURED.length,
    itemListElement: FEATURED.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.citytaste.co/morocco/${a.city?.slug}/experiences/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <section className="py-20 px-4 bg-[#FFF8F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#F97316] mb-2">
              Book with confidence
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Top Experiences in Morocco
            </h2>
          </div>
          <Link
            href="/morocco/activities"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[#F97316] hover:text-orange-600 transition-colors"
          >
            See all experiences
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((a) => (
            <Link
              key={a.id}
              href={`/morocco/${a.city?.slug}/experiences/${a.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <CardImage src={a.imageUrl ?? ""} alt={a.title} />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {CATEGORY_LABELS[a.category] ?? a.category}
                  </span>
                </div>
                {a.city && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold text-white bg-[#F97316]/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {a.city.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#F97316] transition-colors mb-2 line-clamp-2 flex-1">
                  {a.title}
                </h3>

                {a.duration && (
                  <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {a.duration}
                    {a.platform && (
                      <span className="ml-1.5 text-slate-300 capitalize">via {a.platform}</span>
                    )}
                  </p>
                )}

                <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100">
                  {a.priceFrom != null && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">from</p>
                      <p className="text-lg font-bold text-slate-900">${a.priceFrom}</p>
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[#F97316] group-hover:text-orange-600 transition-colors">
                    View details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/morocco/activities"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            See all experiences
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
