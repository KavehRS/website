# Agent instructions — kavehrs.com

Jekyll personal site (GitHub Pages): https://www.kavehrs.com  
Repo: `KavehRS/website` · default branch: `master`

## Install / verify

```bash
bundle install
bundle exec jekyll build
```

Build must succeed before opening or merging a PR. Drafts under `_drafts/` and `.cursor/` must never appear in `_site/`.

## Collections

| Path | Purpose |
|------|---------|
| `_logbook/` | Published climb / ascent reports (primary SEO target) |
| `_blog/` | Technical notes |
| `_drafts/` | Unpublished templates/samples only |
| `_projects/` | Not published (`output: false`, `noindex`) |

## Climb-report weather (required)

Every `_logbook` ascent report weather section must use **three** sources:

1. Open-Meteo (peak / trailhead point forecast)
2. [Mountain-Forecast](https://www.mountain-forecast.com/) (exact peak or nearest elevation-matched proxy + URL)
3. [Meteoblue](https://www.meteoblue.com/) (peak coordinates + summit elevation + URL)

See `.cursor/rules/logbook-reports.mdc` and `_drafts/logbook-ascent-report-template.md`.

Gear lists in climb reports must be derived from the climb date and that triple weather forecast — not a generic seasonal checklist. Refresh gear whenever weather is refreshed.

## Daily SEO agent


When running the scheduled SEO automation (or when asked to audit SEO):


1. Follow `.cursor/skills/daily-seo-audit/SKILL.md` end-to-end.
2. Obey `.cursor/rules/seo-daily-agent.mdc` and `.cursor/rules/logbook-reports.mdc`.
3. Prefer high-confidence technical SEO and discoverability fixes over speculative copy rewrites.
4. Never republish duplicate report prose for the same peak.
5. Open a PR on `cursor/<descriptive-name>-33ce`, verify `bundle exec jekyll build`, then merge to `master` when changes are safe and verified.

## Target ranking theme

Become the authoritative Persian source for:

- گزارش برنامه صعود کوهنوردی
- گزارش صعود سنگ‌نوردی
- گزارش صعود یخ‌نوردی / DryTooling
- گزارش‌های قلل البرز و برنامه‌های آموزشی کوهستان

## Do not

- Commit secrets, API keys, or credentials
- Publish `_drafts/`
- Invent climb facts, weather, or team members
- Weaken uniqueness of logbook narratives for SEO
