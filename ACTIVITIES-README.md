# Activities System

Relational architecture for tours, day trips, workshops, and experiences.

## Data Model

```
countries → activity_cities → activities
```

- **countries**: One per destination country (Morocco, etc.)
- **activity_cities**: Cities within a country that have bookable activities
- **activities**: Individual bookable experiences with affiliate links

All three tables support i18n via JSONB columns (`name_i18n`, `title_i18n`, `desc_i18n`).

## Data Sources

### Static fallback (current)

Data lives in `lib/activities/static-data.ts`. The data access layer in `lib/activities/db.ts` reads from this file. No database connection required.

### Supabase (when configured)

1. Run the migration: `supabase/migrations/001_activities_schema.sql`
2. Set env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Update `lib/activities/db.ts` to query Supabase instead of static data

The SQL migration creates the same schema with RLS policies for public read access on active rows and service-role full access for admin inserts.

## Adding a New Activity

Add an entry to the `ACTIVITIES` array in `lib/activities/static-data.ts`:

```ts
{
  id: "viator-marrakech-123456P1",   // platform-city-productId
  cityId: "ci-marrakech",            // must match a city id
  title: "Marrakech Food Tour",      // English default
  titleI18n: { fr: "Tour gastronomique de Marrakech" },
  descI18n: {},
  category: "food",                  // see categories below
  platform: "viator",
  affiliateUrl: "https://www.viator.com/...",
  imageUrl: "/images/offers/viator-marrakech-123456P1.jpg",
  priceFrom: 35,
  currency: "USD",
  duration: "3 hours",
  priority: 1,                       // lower = shown first
}
```

Save the activity image to `public/images/offers/` with a matching filename.

## Adding a New City

Add to the `CITIES` array in `lib/activities/static-data.ts`:

```ts
{
  id: "ci-tangier",
  countryId: "c-morocco",
  slug: "tangier",
  name: "Tangier",
  nameI18n: { fr: "Tanger", es: "Tánger", it: "Tangeri" },
  heroImage: "/images/morocco/tangier.jpg",  // optional
  displayOrder: 6,
}
```

Cities with no activities won't appear in the city filter.

## Adding a New Country

1. Add to `COUNTRIES` in `lib/activities/static-data.ts`
2. Add cities to `CITIES`
3. Add activities to `ACTIVITIES`
4. Create route pages:
   - `app/{country}/activities/page.tsx` (EN)
   - `app/{country}/fr/activities/page.tsx` (FR)
   - `app/{country}/es/activities/page.tsx` (ES)
   - `app/{country}/it/activities/page.tsx` (IT)

Each route page is ~30 lines — just set metadata and pass the country slug + locale to `CountryActivitiesPage`.

5. Add sitemap entries in `app/sitemap.ts`

## Categories

| Key | EN | FR |
|---|---|---|
| `food` | Food Tour | Tour gastronomique |
| `medina-tour` | Guided Tour | Visite guidée |
| `desert` | Desert | Désert |
| `attraction` | Attraction | Attraction |
| `day-trip` | Day Trip | Excursion |
| `cooking-class` | Cooking Class | Cours de cuisine |
| `activity` | Workshop | Atelier |

Category labels are defined in `components/activities/ActivityCard.tsx`.

## Localized Routes

- `/morocco/activities` — English
- `/morocco/fr/activities` — French
- `/morocco/es/activities` — Spanish
- `/morocco/it/activities` — Italian

Each route has proper `<meta>` alternates pointing to all locale variants.

## Compliance

All affiliate links use `rel="sponsored nofollow noopener" target="_blank"`.
