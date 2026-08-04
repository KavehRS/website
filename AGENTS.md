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

Refresh schedule (Asia/Tehran): **04:00, 10:00, 16:00, 22:00** from report creation until **22:00 the night before** the program start. See `.cursor/rules/logbook-weather-schedule.mdc`.

Gear lists must be derived from the climb date(s) and that triple weather forecast — refresh gear whenever weather is refreshed.

If a forecast change is **noticeable**, add/update `## چالش‌های برنامه` with before→after details (sources, time, impact) — see thresholds in `.cursor/rules/logbook-reports.mdc`.


## Climb-report images (required)

Folder `assets/mount/logbook/<slug>/` must match the report URL slug exactly (`/logbook/<slug>/`). See `.cursor/rules/logbook-assets.mdc`.


## Logbook categories, hub, related links

- `categories` must use discipline slugs in `_data/logbook_disciplines.yml` only (training-camp, snowfield, glacier, icefall, winter-ascent, high-altitude, technical-mountaineering / کوهنوردی فنی, hiking, rock-climbing, wall-climbing).
- Classification: ridge / gendarme / alpine hand-and-foot → `technical-mountaineering`. Use `rock-climbing` / `wall-climbing` only for true rock or multipitch wall routes.
- Hub `/logbook/` lists reports **chronologically by date** (newest first), not by category.
- Related reports are **selected** by shared categories, but the **public UI** is only `گزارش‌های مرتبط :` + a flat list — no «بر اساس نوع برنامه…» note and no category subheadings on the page.
- Never put agent/implementation instructions into published page copy; keep them in `.cursor/` and `_drafts/` comments.
- Program dates/length come from the user only (e.g. Kahar is one-day on ۱۶ مرداد ۱۴۰۵ unless the user changes it).


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
