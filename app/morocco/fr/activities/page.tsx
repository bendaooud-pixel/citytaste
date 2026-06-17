import type { Metadata } from "next";
import { getCountryBySlug, getCities, getActivities } from "@/lib/activities/db";
import CountryActivitiesPage from "@/components/activities/CountryActivitiesPage";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Activités & Excursions au Maroc ${YEAR} | CityTaste`,
  description: `Réservez les meilleures visites, excursions et expériences au Maroc. Activités sélectionnées à Marrakech, Fès, Chefchaouen et au-delà. Mis à jour ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco/fr/activities`,
    languages: {
      en: `${BASE}/morocco/activities`,
      es: `${BASE}/morocco/es/activities`,
      it: `${BASE}/morocco/it/activities`,
    },
  },
  openGraph: {
    title: `Activités & Excursions au Maroc ${YEAR} | CityTaste`,
    description: "Réservez les meilleures visites, excursions et expériences au Maroc.",
    type: "website",
    url: `${BASE}/morocco/fr/activities`,
  },
};

export default function MoroccoActivitiesFrPage() {
  const country = getCountryBySlug("morocco");
  if (!country) return null;
  const cities = getCities("morocco");
  const activities = getActivities({ countrySlug: "morocco" });

  return (
    <CountryActivitiesPage
      country={country}
      cities={cities}
      activities={activities}
      locale="fr"
    />
  );
}
