# Guest Post Outreach Tool

A local-only tool that prepares guest post drafts and pitch emails for manual outreach. **It never contacts external sites** — all output is local markdown files that you review, edit, and submit yourself.

## Quick Start

```bash
# Generate a draft + pitch for a target site
npm run outreach -- --site moroccotourspost.com

# Check outreach status across all targets
npm run outreach:status

# Mark a target's status after you send
npm run outreach:mark -- --site moroccotourspost.com --status sent
```

## Workflow

1. **Add targets** to `content/outreach/guest-post-targets.csv` (see CSV format below)
2. **Generate** a draft + pitch: `npm run outreach -- --site <domain>`
3. **Review and edit** the draft in `content/outreach/drafts/` — make it yours
4. **Personalize** the pitch in `content/outreach/pitches/`
5. **Submit manually** via the site's submission page (never automated)
6. **Update status**: `npm run outreach:mark -- --site <domain> --status sent`
7. When published: `npm run outreach:mark -- --site <domain> --status published`

## CSV Format

File: `content/outreach/guest-post-targets.csv`

| Column | Description |
|--------|-------------|
| `site` | Domain name of the target site |
| `da` | Domain Authority (approximate) |
| `niche` | Site's topic focus (used to pick article angle) |
| `link_allowed` | How many do-follow backlinks they permit |
| `word_count` | Required word count range |
| `submission_page` | URL path or contact info for submission |
| `priority` | Your priority tier (Gros, Bon, Facile, etc.) |
| `status` | Current status (empty, draft ready, sent, published, rejected) |
| `date_contacted` | Date you first reached out |
| `article_sent` | Date the article was sent |
| `published` | Date the article was published |
| `link_obtained` | Confirmed backlink URL |

## Output Files

- **Drafts**: `content/outreach/drafts/{site}-{date}.md` — Article with frontmatter (target site, title, word count, CityTaste link used)
- **Pitches**: `content/outreach/pitches/{site}-{date}.md` — Email body with frontmatter (target site, article title, submission page)

## Valid Statuses

| Status | Meaning |
|--------|---------|
| *(empty)* | Not yet started |
| `draft ready` | Draft generated, not yet sent |
| `sent` | Pitch + article submitted to the site |
| `published` | Article is live on the target site |
| `rejected` | Submission was declined |

## Safety Guarantees

- The tool **never makes HTTP requests** to target sites
- The tool **never auto-submits** content anywhere
- One draft per command — no bulk generation
- All content is a **first draft** for you to edit before sending
- The `published` status is **never set automatically** — only you confirm it
- Requires `ANTHROPIC_API_KEY` environment variable for draft generation
