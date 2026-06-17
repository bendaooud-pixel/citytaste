import type { Metadata } from "next";
import { getCountryBySlug, getCities, getActivities } from "@/lib/activities/db";
import CountryActivitiesPage from "@/components/activities/CountryActivitiesPage";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Actividades y Tours en Marruecos ${YEAR} | CityTaste`,
  description: `Reserva los mejores tours, excursiones y experiencias en Marruecos. Actividades en Marrakech, Fez, Chefchaouen y más. Actualizado ${YEAR}.`,
  alternates: {
    canonical: `${BASE}/morocco/es/activities`,
    languages: {
      en: `${BASE}/morocco/activities`,
      fr: `${BASE}/morocco/fr/activities`,
      it: `${BASE}/morocco/it/activities`,
    },
  },
  openGraph: {
    title: `Actividades y Tours en Marruecos ${YEAR} | CityTaste`,
    description: "Reserva los mejores tours, excursiones y experiencias en Marruecos.",
    type: "website",
    url: `${BASE}/morocco/es/activities`,
  },
};

export default function MoroccoActivitiesEsPage() {
  const country = getCountryBySlug("morocco");
  if (!country) return null;
  const cities = getCities("morocco");
  const activities = getActivities({ countrySlug: "morocco" });

  return (
    <CountryActivitiesPage
      country={country}
      cities={cities}
      activities={activities}
      locale="es"
    />
  );
}
