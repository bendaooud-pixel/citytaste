import type { Metadata } from "next";
import { getCountryBySlug, getCities, getActivities } from "@/lib/activities/db";
import CountryActivitiesPage from "@/components/activities/CountryActivitiesPage";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Attività e Tour in Marocco ${YEAR} | CityTaste`,
  description: `Prenota i migliori tour, escursioni e esperienze in Marocco. Attività selezionate a Marrakech, Fès, Chefchaouen e oltre. Aggiornato ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco/it/activities`,
    languages: {
      en: `${BASE}/morocco/activities`,
      fr: `${BASE}/morocco/fr/activities`,
      es: `${BASE}/morocco/es/activities`,
    },
  },
  openGraph: {
    title: `Attività e Tour in Marocco ${YEAR} | CityTaste`,
    description: "Prenota i migliori tour, escursioni e esperienze in Marocco.",
    type: "website",
    url: `${BASE}/morocco/it/activities`,
  },
};

export default function MoroccoActivitiesItPage() {
  const country = getCountryBySlug("morocco");
  if (!country) return null;
  const cities = getCities("morocco");
  const activities = getActivities({ countrySlug: "morocco" });

  return (
    <CountryActivitiesPage
      country={country}
      cities={cities}
      activities={activities}
      locale="it"
    />
  );
}
