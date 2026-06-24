-- ============================================================
-- Outreach Tables — guest post tracking + drafts
-- ============================================================

CREATE TABLE IF NOT EXISTS public.outreach_targets (
  id              SERIAL PRIMARY KEY,
  site            TEXT NOT NULL UNIQUE,
  da              TEXT DEFAULT '',
  niche           TEXT DEFAULT '',
  link_allowed    TEXT DEFAULT '',
  word_count      TEXT DEFAULT '',
  submission_page TEXT DEFAULT '',
  priority        TEXT DEFAULT '',
  status          TEXT DEFAULT '',
  date_contacted  TEXT DEFAULT '',
  article_sent    TEXT DEFAULT '',
  published       TEXT DEFAULT '',
  link_obtained   TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.outreach_drafts (
  id              SERIAL PRIMARY KEY,
  site            TEXT NOT NULL REFERENCES public.outreach_targets(site) ON DELETE CASCADE,
  draft_title     TEXT DEFAULT '',
  draft_content   TEXT DEFAULT '',
  draft_word_count INTEGER DEFAULT 0,
  draft_word_target INTEGER DEFAULT 0,
  citytaste_link  TEXT DEFAULT '',
  pitch_content   TEXT DEFAULT '',
  niche           TEXT DEFAULT '',
  generated_at    TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(site)
);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE public.outreach_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_drafts  ENABLE ROW LEVEL SECURITY;

-- No public access — only service_role can read/write
-- (the dashboard uses server actions with service_role key)
DROP POLICY IF EXISTS "outreach_targets_service_only" ON public.outreach_targets;
DROP POLICY IF EXISTS "outreach_drafts_service_only"  ON public.outreach_drafts;

-- Service role bypasses RLS automatically, so these tables
-- have NO policies = no access via anon/authenticated keys.
-- This is the most restrictive setup.

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS outreach_targets_status_idx ON public.outreach_targets(status);
CREATE INDEX IF NOT EXISTS outreach_targets_priority_idx ON public.outreach_targets(priority);
CREATE INDEX IF NOT EXISTS outreach_drafts_site_idx ON public.outreach_drafts(site);
