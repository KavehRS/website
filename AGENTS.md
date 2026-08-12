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

## Factual accuracy (required)

Published pages must not contain **guessed or unsourced** numbers or species lists. Omit the field if there is no named source.

The **only** exception is the experience of **that** climb (clock times, rests, GPS of that day, weather as felt, who was on the team). Do not copy “typical” hours, rounded lat/lon, or tourism-blog flora into a report.

If elevations/coordinates disagree across named sources, publish the disagreement — do not hide it behind «حدود». Details: `.cursor/rules/logbook-facts.mdc`.

## Climb-report weather (required)

Every `_logbook` ascent report weather section uses **only accurate sources** for that peak and region:

1. **Open-Meteo** — peak coordinates + elevation (+ trailhead when useful); usually always
2. **[Mountain-Forecast](https://www.mountain-forecast.com/)** — **only** when the peak has its own forecast page (no distant proxy)
3. **[Meteoblue](https://www.meteoblue.com/)** — peak coordinates + summit elevation when reliable

**Omit** any source without accurate peak/region data. Number only sources actually used. Gear and challenges derive from those sources only.

Refresh schedule (Asia/Tehran): **04:00, 10:00, 16:00, 22:00** for `report_status: active` reports from creation until **22:00 the night before** program start. See `.cursor/rules/logbook-weather-schedule.mdc`.

If a forecast change is **noticeable**, add/update `## چالش‌های برنامه` with before→after details (sources, time, impact) — see thresholds in `.cursor/rules/logbook-reports.mdc`.

## Report lifecycle

- Agent stays **active** from report creation until `report_status: completed` or user confirms the post-climb report is finished.
- New reports: `report_status: active`. When done: `report_status: completed`.

## Automation billing (owner)

Scheduled agents (weather 4×/day, SEO daily) are **configured but paused** until the site owner recharges their Cursor account and enables:

- Cursor Automation(s) from `.cursor/automations/`, **and/or**
- GitHub secret `CURSOR_API_KEY` for `.github/workflows/logbook-weather-agent.yml`

Until then: all rules still apply when the user or a manual agent run triggers work.

**After recharge: enable schedulers — mandatory always-on; do not wait for user prompts for weather refresh.**


## Climb-report images (required)

Folder `assets/mount/logbook/<slug>/` must match the report URL slug exactly (`/logbook/<slug>/`). See `.cursor/rules/logbook-assets.mdc`.


## Logbook categories, hub, related links

- `categories` must use discipline slugs in `_data/logbook_disciplines.yml` only (training-camp, snowfield, glacier, icefall, winter-ascent, high-altitude, technical-mountaineering / کوهنوردی فنی, hiking, rock-climbing, wall-climbing).
- Classification: ridge / gendarme / alpine hand-and-foot → `technical-mountaineering`. Use `rock-climbing` / `wall-climbing` only for true rock or multipitch wall routes.
- Hub `/logbook/` lists reports **chronologically by date** (newest first), not by category.
- Related reports are **selected** by shared categories, but the **public UI** is only `گزارش‌های مرتبط :` + a flat list — no «بر اساس نوع برنامه…» note and no category subheadings on the page.
- Never put agent/implementation instructions into published page copy; keep them in `.cursor/` and `_drafts/` comments.
- Published logbook prose is the climber’s voice (من / ما / تیم). No «ترک منتشر نشده», JSON-LD, source-footnote asides, or notes about how the agent wrote the page.
- Program dates/length come from the user only (e.g. Kahar is one-day on ۱۶ مرداد ۱۴۰۵ unless the user changes it).
- Reader-facing dates use Jalali via `_includes/jalali-date.html` (footer «آخرین بروزرسانی», post meta, hub list) — e.g. `13 مرداد 1405`, not `04 August 2026`. Keep ISO/`date:` Gregorian for machines. Report body program dates should be Jalali-first.


## Logbook ascent-report agent

When asked to create or update a `گزارش صعود` / climb report:

1. Follow `.cursor/skills/logbook-ascent-report/SKILL.md` end-to-end.
2. Obey `.cursor/rules/logbook-ascent-agent.mdc` and `.cursor/rules/logbook-reports.mdc` (plus weather/assets rules).
3. Use `_drafts/logbook-ascent-report-template.md`; treat `_drafts/samples/kahar-peak-report-framework-sample.md` as structure only.
4. For a Cursor Automation, paste `.cursor/automations/logbook-ascent-report-prompt.md` at https://cursor.com/automations/new
5. Open a PR on `cursor/<descriptive-name>-33ce`, verify `bundle exec jekyll build`, then merge to `master` when safe.

Related scheduled agents (mandatory after billing recharge; paused until then):

- Weather refresh (4× daily Tehran, active reports only): `.cursor/automations/logbook-weather-update-prompt.md` + `.github/workflows/logbook-weather-agent.yml`
- Daily SEO: `.cursor/automations/daily-seo-prompt.md` + `.github/workflows/daily-seo-agent.yml`


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
- Invent climb facts, weather, team members, coordinates, elevations, or flora/fauna
- Publish rounded placeholder lat/lon or «حدود» in place of a missing source
- Weaken uniqueness of logbook narratives for SEO

## Cursor Cloud specific instructions

Static Jekyll 4 site (Ruby 3.2). Standard commands live in `## Install / verify` above.

- Gems install into `./vendor/bundle` (gitignored via a local `bundle config path`). The startup update script runs `bundle install`, so gems are ready — no need to reinstall unless `Gemfile`/`Gemfile.lock` changed.
- Run the dev server with `bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload`. It auto-regenerates on file changes; there is no separate lint step for this site — `bundle exec jekyll build` succeeding is the check.
- The Sass `@import` / `lighten()` deprecation warnings during build/serve are expected and harmless; the build still finishes with exit code 0.
- Adding/removing content files is picked up by the running server via auto-regeneration; editing `_config.yml` requires restarting the server.
