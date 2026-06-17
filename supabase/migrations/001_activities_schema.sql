-- Activities system: countries → cities → activities (relational)
-- Localization: JSONB columns for i18n overrides (pragmatic, no join overhead)
-- Run this in the Supabase SQL Editor or via `supabase db push`

-- ═══════════════════════════════════════════════════════════════
-- COUNTRIES
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS countries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE,
  name          text NOT NULL,               -- English default
  name_i18n     jsonb DEFAULT '{}'::jsonb,    -- {"fr":"Maroc","es":"Marruecos","it":"Marocco"}
  flag          text,                         -- emoji flag e.g. '🇲🇦'
  active        boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- CITIES
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS activity_cities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id    uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  slug          text NOT NULL,
  name          text NOT NULL,               -- English default
  name_i18n     jsonb DEFAULT '{}'::jsonb,    -- {"fr":"Fès","es":"Fez"}
  region        text,
  hero_image    text,
  active        boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, slug)
);

CREATE INDEX idx_activity_cities_country ON activity_cities(country_id);

-- ═══════════════════════════════════════════════════════════════
-- ACTIVITIES
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS activities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id       uuid NOT NULL REFERENCES activity_cities(id) ON DELETE CASCADE,
  slug          text,                         -- URL-friendly slug, unique per city
  title         text NOT NULL,               -- English default
  title_i18n    jsonb DEFAULT '{}'::jsonb,    -- {"fr":"...","es":"..."}
  description   text,
  desc_i18n     jsonb DEFAULT '{}'::jsonb,
  category      text NOT NULL DEFAULT 'activity',
  platform      text NOT NULL DEFAULT 'viator',
  affiliate_url text NOT NULL,
  image_url     text,
  price_from    numeric,
  currency      text NOT NULL DEFAULT 'USD',
  duration      text,                         -- e.g. "3 days", "4 hours"
  rating        numeric,
  priority      int NOT NULL DEFAULT 1,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (city_id, slug)
);

CREATE INDEX idx_activities_city    ON activities(city_id);
CREATE INDEX idx_activities_active  ON activities(active) WHERE active = true;

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — public read on active rows
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active countries"
  ON countries FOR SELECT USING (active = true);

CREATE POLICY "Public read active cities"
  ON activity_cities FOR SELECT USING (active = true);

CREATE POLICY "Public read active activities"
  ON activities FOR SELECT USING (active = true);

-- Service-role full access (for admin inserts)
CREATE POLICY "Service role full access countries"
  ON countries FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access cities"
  ON activity_cities FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access activities"
  ON activities FOR ALL USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA — Morocco + 10 cities + 3 Fès Viator activities
-- ═══════════════════════════════════════════════════════════════

INSERT INTO countries (slug, name, name_i18n, flag, active, display_order) VALUES
  ('morocco', 'Morocco', '{"fr":"Maroc","es":"Marruecos","it":"Marocco"}', '🇲🇦', true, 1)
ON CONFLICT (slug) DO NOTHING;

WITH morocco AS (SELECT id FROM countries WHERE slug = 'morocco')
INSERT INTO activity_cities (country_id, slug, name, name_i18n, hero_image, active, display_order) VALUES
  ((SELECT id FROM morocco), 'marrakech',    'Marrakech',    '{"fr":"Marrakech","es":"Marrakech","it":"Marrakech"}',       '/images/morocco/marrakech.jpg',      true, 1),
  ((SELECT id FROM morocco), 'fes',          'Fès',          '{"fr":"Fès","es":"Fez","it":"Fès"}',                         '/images/morocco/fes.jpg',            true, 2),
  ((SELECT id FROM morocco), 'chefchaouen',  'Chefchaouen',  '{"fr":"Chefchaouen","es":"Chefchaouen","it":"Chefchaouen"}', '/images/morocco/chefchaouen.jpg',    true, 3),
  ((SELECT id FROM morocco), 'casablanca',   'Casablanca',   '{"fr":"Casablanca","es":"Casablanca","it":"Casablanca"}',    null,                                  true, 4),
  ((SELECT id FROM morocco), 'rabat',        'Rabat',        '{"fr":"Rabat","es":"Rabat","it":"Rabat"}',                   '/images/morocco/rabat.jpg',          true, 5),
  ((SELECT id FROM morocco), 'tangier',      'Tangier',      '{"fr":"Tanger","es":"Tánger","it":"Tangeri"}',               null,                                  true, 6),
  ((SELECT id FROM morocco), 'agadir',       'Agadir',       '{"fr":"Agadir","es":"Agadir","it":"Agadir"}',                null,                                  true, 7),
  ((SELECT id FROM morocco), 'essaouira',    'Essaouira',    '{"fr":"Essaouira","es":"Esauira","it":"Essaouira"}',         '/images/morocco/essaouira.jpg',      true, 8),
  ((SELECT id FROM morocco), 'merzouga',     'Merzouga',     '{"fr":"Merzouga","es":"Merzouga","it":"Merzouga"}',          '/images/morocco/sahara-desert.jpg',  true, 9),
  ((SELECT id FROM morocco), 'ouarzazate',   'Ouarzazate',   '{"fr":"Ouarzazate","es":"Uarzazat","it":"Ouarzazate"}',      null,                                  true, 10)
ON CONFLICT (country_id, slug) DO NOTHING;

WITH fes_city AS (
  SELECT ac.id FROM activity_cities ac
  JOIN countries c ON c.id = ac.country_id
  WHERE c.slug = 'morocco' AND ac.slug = 'fes'
)
INSERT INTO activities (city_id, slug, title, category, platform, affiliate_url, image_url, price_from, currency, duration, priority) VALUES
  ((SELECT id FROM fes_city),
   'fez-to-marrakech-merzouga-desert-tour',
   'Best Fez to Marrakech via Merzouga Desert Dunes, 3 Days Tour',
   'day-trip', 'viator',
   'https://www.viator.com/Fez/d22151-ttd/p-115777P9?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-mer&source=shortlink&localeSwitch=1',
   '/images/offers/viator-fes-115777P9.jpg',
   244, 'USD', '3 days', 1),

  ((SELECT id FROM fes_city),
   'fez-medina-walking-tour',
   'Exclusive Fez Medina Walking Tour with Private Guide',
   'medina-tour', 'viator',
   'https://www.viator.com/Fez/d22151-ttd/p-463193P2?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-dbgh&source=shortlink&localeSwitch=1',
   '/images/offers/viator-fes-463193P2.jpg',
   36, 'USD', '4 hours', 1),

  ((SELECT id FROM fes_city),
   'fez-pottery-mosaic-workshop',
   'Pottery and Mosaic Workshop in Fes Led by Local Artisans',
   'activity', 'viator',
   'https://www.viator.com/Fez/d22151-ttd/p-459799P6?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-tin&source=shortlink&localeSwitch=1',
   '/images/offers/viator-fes-459799P6.jpg',
   45, 'USD', '2 hours', 1);
