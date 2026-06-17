"use client";

import { useState, useMemo } from "react";
import type { City, Activity } from "@/lib/activities/types";
import { localized } from "@/lib/activities/types";
import ActivityCard from "./ActivityCard";

const ALL_LABEL: Record<string, string> = {
  en: "All Cities",
  fr: "Toutes les villes",
  es: "Todas las ciudades",
  it: "Tutte le città",
};

const EMPTY_LABEL: Record<string, string> = {
  en: "No activities found for this city yet. Check back soon!",
  fr: "Aucune activité trouvée pour cette ville. Revenez bientôt !",
  es: "No se encontraron actividades para esta ciudad. ¡Vuelve pronto!",
  it: "Nessuna attività trovata per questa città. Torna presto!",
};

interface Props {
  cities: City[];
  activities: Activity[];
  locale: string;
}

export default function CityFilter({ cities, activities, locale }: Props) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      selectedCity
        ? activities.filter((a) => a.cityId === selectedCity)
        : activities,
    [selectedCity, activities]
  );

  const citiesWithActivities = useMemo(() => {
    const ids = new Set(activities.map((a) => a.cityId));
    return cities.filter((c) => ids.has(c.id));
  }, [cities, activities]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCity(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCity === null
              ? "bg-orange-500 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {ALL_LABEL[locale] ?? ALL_LABEL.en}
        </button>
        {citiesWithActivities.map((city) => (
          <button
            key={city.id}
            onClick={() => setSelectedCity(city.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCity === city.id
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {localized(city.name, city.nameI18n, locale)}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">
            {EMPTY_LABEL[locale] ?? EMPTY_LABEL.en}
          </p>
        </div>
      )}
    </>
  );
}
