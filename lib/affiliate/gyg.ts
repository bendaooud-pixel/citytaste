const PARTNER_ID = process.env.NEXT_PUBLIC_GYG_PARTNER_ID ?? "";

const GYG_CITY_QUERIES: Record<string, string> = {
  marrakech: "Marrakech",
  fes: "Fes",
  chefchaouen: "Chefchaouen",
  casablanca: "Casablanca",
  rabat: "Rabat",
  essaouira: "Essaouira",
  tangier: "Tangier",
  agadir: "Agadir",
  ouarzazate: "Ouarzazate",
  merzouga: "Merzouga Sahara",
  paris: "Paris",
  barcelona: "Barcelona",
  rome: "Rome",
};

export function gygSearchLink(query: string, locale = "en"): string {
  const host = locale === "fr" ? "www.getyourguide.fr" : "www.getyourguide.com";
  const params = new URLSearchParams({
    q: query,
    partner_id: PARTNER_ID,
    utm_medium: "online_publisher",
    utm_campaign: "citytaste",
  });
  return `https://${host}/s/?${params.toString()}`;
}

export function gygActivityLink(slug: string): string {
  return `https://www.getyourguide.com/${slug}?partner_id=${PARTNER_ID}&utm_medium=online_publisher&utm_campaign=citytaste`;
}

export function gygCityQuery(citySlug: string): string {
  return GYG_CITY_QUERIES[citySlug] ?? citySlug;
}

export function getPartnerId(): string {
  return PARTNER_ID;
}
