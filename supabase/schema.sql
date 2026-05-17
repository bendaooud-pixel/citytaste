-- ============================================================
-- CityTaste — Supabase Schema
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Cities
CREATE TABLE IF NOT EXISTS public.cities (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  country      TEXT NOT NULL,
  flag         TEXT NOT NULL,
  description  TEXT NOT NULL,
  image        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  lat          DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng          DOUBLE PRECISION NOT NULL DEFAULT 0,
  place_count  INTEGER NOT NULL DEFAULT 0,
  highlights   TEXT[] NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Places
CREATE TABLE IF NOT EXISTS public.places (
  id                 TEXT PRIMARY KEY,
  city_slug          TEXT NOT NULL REFERENCES public.cities(slug) ON DELETE CASCADE,
  name               TEXT NOT NULL,
  slug               TEXT NOT NULL,
  categories         TEXT[] NOT NULL DEFAULT '{}',
  address            TEXT NOT NULL,
  neighborhood       TEXT NOT NULL,
  rating             DOUBLE PRECISION NOT NULL,
  review_count       INTEGER NOT NULL DEFAULT 0,
  price_level        SMALLINT NOT NULL CHECK (price_level BETWEEN 0 AND 4),
  lat                DOUBLE PRECISION NOT NULL,
  lng                DOUBLE PRECISION NOT NULL,
  phone              TEXT,
  website            TEXT,
  menu_url           TEXT,
  booking_url        TEXT,
  google_maps_url    TEXT NOT NULL,
  photos             TEXT[] NOT NULL DEFAULT '{}',
  opening_hours      JSONB NOT NULL DEFAULT '{}',
  is_halal           BOOLEAN NOT NULL DEFAULT false,
  is_family_friendly BOOLEAN NOT NULL DEFAULT false,
  has_terrace        BOOLEAN NOT NULL DEFAULT false,
  description        TEXT NOT NULL,
  review_summary     TEXT NOT NULL,
  reviews            JSONB NOT NULL DEFAULT '[]',
  entry_price        TEXT,
  duration           TEXT,
  featured           BOOLEAN DEFAULT false,
  ratings            JSONB,
  created_at         TIMESTAMPTZ DEFAULT now(),
  UNIQUE(city_slug, slug)
);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

-- Drop first so this script is safe to re-run
DROP POLICY IF EXISTS "public_read_cities" ON public.cities;
DROP POLICY IF EXISTS "anon_write_cities"  ON public.cities;
DROP POLICY IF EXISTS "cities_select"      ON public.cities;
DROP POLICY IF EXISTS "cities_insert"      ON public.cities;
DROP POLICY IF EXISTS "cities_update"      ON public.cities;
DROP POLICY IF EXISTS "cities_delete"      ON public.cities;

DROP POLICY IF EXISTS "public_read_places" ON public.places;
DROP POLICY IF EXISTS "anon_write_places"  ON public.places;
DROP POLICY IF EXISTS "places_select"      ON public.places;
DROP POLICY IF EXISTS "places_insert"      ON public.places;
DROP POLICY IF EXISTS "places_update"      ON public.places;
DROP POLICY IF EXISTS "places_delete"      ON public.places;

-- Fully open (no auth yet — restrict per-role when auth is added)
CREATE POLICY "cities_select" ON public.cities FOR SELECT USING (true);
CREATE POLICY "cities_insert" ON public.cities FOR INSERT WITH CHECK (true);
CREATE POLICY "cities_update" ON public.cities FOR UPDATE USING (true);
CREATE POLICY "cities_delete" ON public.cities FOR DELETE USING (true);

CREATE POLICY "places_select" ON public.places FOR SELECT USING (true);
CREATE POLICY "places_insert" ON public.places FOR INSERT WITH CHECK (true);
CREATE POLICY "places_update" ON public.places FOR UPDATE USING (true);
CREATE POLICY "places_delete" ON public.places FOR DELETE USING (true);

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS places_city_slug_idx ON public.places(city_slug);
CREATE INDEX IF NOT EXISTS places_slug_idx       ON public.places(slug);
CREATE INDEX IF NOT EXISTS places_featured_idx   ON public.places(featured) WHERE featured = true;
