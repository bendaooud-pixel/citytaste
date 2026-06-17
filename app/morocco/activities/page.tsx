import type { Metadata } from "next";
import { getCountryBySlug, getCities, getActivities } from "@/lib/activities/db";
import CountryActivitiesPage from "@/components/activities/CountryActivitiesPage";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Activities & Tours in Morocco ${YEAR} | CityTaste`,
  description: `Book the best tours, day trips, workshops and experiences across Morocco. Curated activities in Marrakech, Fès, Chefchaouen and beyond. Updated ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco/activities`,
    languages: {
      fr: `${BASE}/morocco/fr/activities`,
      es: `${BASE}/morocco/es/activities`,
      it: `${BASE}/morocco/it/activities`,
    },
  },
  openGraph: {
    title: `Activities & Tours in Morocco ${YEAR} | CityTaste`,
    description: "Book the best tours, day trips, workshops and experiences across Morocco.",
    type: "website",
    url: `${BASE}/morocco/activities`,
  },
};

export default function MoroccoActivitiesPage() {
  const country = getCountryBySlug("morocco");
  if (!country) return null;
  const cities = getCities("morocco");
  const activities = getActivities({ countrySlug: "morocco" });

  return (
    <CountryActivitiesPage
      country={country}
      cities={cities}
      activities={activities}
      locale="en"
    />
  );
}
