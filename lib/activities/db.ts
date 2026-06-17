import type { Country, City, Activity, GetActivitiesParams } from "./types";
import { COUNTRIES, CITIES, ACTIVITIES } from "./static-data";

// Uses static data. When Supabase credentials are configured,
// swap these functions to query the DB instead (see ACTIVITIES-README.md).

export function getCountries(): Country[] {
  return COUNTRIES.filter((c) => c.slug).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function getCities(countrySlug: string): City[] {
  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  if (!country) return [];
  return CITIES.filter((c) => c.countryId === country.id).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

export function getActivities(params: GetActivitiesParams): Activity[] {
  const { countrySlug, citySlug, category, limit } = params;
  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  if (!country) return [];

  const countryCityIds = new Set(
    CITIES.filter((c) => c.countryId === country.id).map((c) => c.id)
  );

  let results = ACTIVITIES.filter((a) => countryCityIds.has(a.cityId));

  if (citySlug) {
    const city = CITIES.find(
      (c) => c.countryId === country.id && c.slug === citySlug
    );
    if (!city) return [];
    results = results.filter((a) => a.cityId === city.id);
  }

  if (category) {
    results = results.filter((a) => a.category === category);
  }

  results.sort((a, b) => a.priority - b.priority);

  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}

export function getCityBySlug(
  countrySlug: string,
  citySlug: string
): City | undefined {
  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  if (!country) return undefined;
  return CITIES.find(
    (c) => c.countryId === country.id && c.slug === citySlug
  );
}

export function getActivityBySlug(
  countrySlug: string,
  citySlug: string,
  activitySlug: string
): Activity | undefined {
  const country = COUNTRIES.find((c) => c.slug === countrySlug);
  if (!country) return undefined;
  const city = CITIES.find(
    (c) => c.countryId === country.id && c.slug === citySlug
  );
  if (!city) return undefined;
  return ACTIVITIES.find((a) => a.cityId === city.id && a.slug === activitySlug);
}

export function getCityById(cityId: string): City | undefined {
  return CITIES.find((c) => c.id === cityId);
}

export function getCountryByCityId(cityId: string): Country | undefined {
  const city = CITIES.find((c) => c.id === cityId);
  if (!city) return undefined;
  return COUNTRIES.find((co) => co.id === city.countryId);
}

export function getAllActivitiesWithSlugs(): Array<{
  activity: Activity;
  citySlug: string;
  countrySlug: string;
}> {
  return ACTIVITIES.filter((a) => a.slug).map((a) => {
    const city = CITIES.find((c) => c.id === a.cityId)!;
    const country = COUNTRIES.find((co) => co.id === city.countryId)!;
    return { activity: a, citySlug: city.slug, countrySlug: country.slug };
  });
}
