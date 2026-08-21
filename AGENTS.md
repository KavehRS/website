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
| `_blog/` | Published notes. `note_kind: personal` → یادداشت‌های شخصی (`/notes/`); `note_kind: technical` → یادداشت‌های فنی (`/tech/`). URLs stay `/blog/:path/` |
| `_logbook/` | **Not published here.** Stubs redirect `/logbook/:path/` → `https://logbook.rocks/logbook/:path/` |
| `_drafts/` | Unpublished templates/samples only |
| `_projects/` | Not published (`output: false`, `noindex`) |

Climb / ascent reports live on **https://logbook.rocks** (repo `KavehRS/logbook.rocks`). Do not add new reports to this site. New `گزارش صعود` goes there. This site is personal notes and technical notes only.

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

Scheduled agents (weather 4×/day, SEO daily, SEO+AI-source every 45 minutes) are **configured but paused** until the site owner recharges their Cursor account and enables:

- Cursor Automation(s) from `.cursor/automations/`, **and/or**
- GitHub secret `CURSOR_API_KEY` for `.github/workflows/logbook-weather-agent.yml` and `.github/workflows/seo-ai-source-watch.yml`

Until then: all rules still apply when the user or a manual agent run triggers work.

**After recharge: enable schedulers — mandatory always-on; do not wait for user prompts for weather refresh.**


## Climb reports (not this site)

Ascent reports, weather, categories, and climb images are published on **https://logbook.rocks** (`KavehRS/logbook.rocks`). This repo only keeps `/logbook/:path/` redirect stubs to the same path there.

When asked for a `گزارش صعود` / climb report: work in the logbook.rocks repo, not here.

## Blog post agent

When asked for a `پست جدید وبلاگ` / یادداشت فنی / یادداشت شخصی / update to `_blog/`:

1. Follow `.cursor/skills/blog-post/SKILL.md`.
2. Obey `.cursor/rules/blog-posts.mdc`.
3. Use `_drafts/blog-post-template.md` (structure only — never publish placeholders).
4. File: `_blog/YYYY-MM-DD-<slug>.md` with zero-padded date, `lang: fa-IR`, YAML `tags` array, unique description, and `note_kind: personal` or `note_kind: technical`.
5. Images for new notes: `assets/blog/<exact-url-slug>/`; comment `image:` out until files exist.
6. Related UI stays `یادداشت‌های مرتبط :` + flat list. Hubs: `/notes/` (personal) and `/tech/` (technical). `/blog/` points to those two.
7. Homepage `/` lists newest personal and technical notes automatically; do not hardcode teasers in `index.md`.
8. For a Cursor Automation, paste `.cursor/automations/blog-post-prompt.md` at https://cursor.com/automations/new
9. Open a PR on `cursor/<descriptive-name>-33ce`, verify `bundle exec jekyll build`.

## Instagram agent

When asked to convert Instagram posts into blog notes (`پست‌های اینستاگرام را به بلاگ تبدیل کن` / import `imkavehrs` / `/instagram`):

1. Act as the Instagram agent: `.cursor/agents/instagram.md` and `.cursor/rules/instagram-agent.mdc`.
2. Follow **all** related skills, in order:
   - `.cursor/skills/instagram-to-blog/SKILL.md` (conversion, sources, parser, ledger)
   - `.cursor/skills/blog-post/SKILL.md` (`_blog/` file shape, assets, related UI)
3. Obey `.cursor/rules/instagram-to-blog.mdc` and `.cursor/rules/blog-posts.mdc`.
4. Use `_drafts/instagram-blog-post-template.md` (structure only).
5. Source **only** an official Instagram export in `_drafts/instagram-export/` (2026 path: Meta Account or Accounts Center → Export your information → JSON) or captions/photos/URLs the owner attached. Instagram’s public site is login-walled — do not invent posts. See `_drafts/instagram-export/README.md`.
6. Parse with `.cursor/scripts/parse-instagram-export.py`. Write `_blog/YYYY-MM-DD-<slug>.md` (zero-padded date). Images in `assets/blog/<exact-url-slug>/`. Track ids in `_data/instagram_imports.yml`.
7. Rewrite captions as the author (من). No hashtag dumps, no guessed geo. Link an existing report on https://logbook.rocks/logbook/ instead of cloning it.
8. For a Cursor Automation, paste `.cursor/automations/instagram-to-blog-prompt.md` at https://cursor.com/automations/new
9. Open a PR on `cursor/<descriptive-name>-33ce`, verify `bundle exec jekyll build`.

Related scheduled agents (mandatory after billing recharge; paused until then):

- Weather refresh for **active climb reports** runs on `KavehRS/logbook.rocks`, not this repo
- Daily SEO: `.cursor/automations/daily-seo-prompt.md` + `.github/workflows/daily-seo-agent.yml`
- SEO + AI-source watch (every 45 minutes; technical crawl signals only, never rewrite published posts): `.cursor/automations/seo-ai-source-watch-prompt.md` + `.github/workflows/seo-ai-source-watch.yml`


## Daily SEO agent

When running the scheduled SEO automation (or when asked to audit SEO):

1. Follow `.cursor/skills/daily-seo-audit/SKILL.md` end-to-end.
2. Obey `.cursor/rules/seo-daily-agent.mdc`.
3. Prefer high-confidence technical SEO and discoverability fixes over speculative copy rewrites.
4. Audit every published `/tech/`, `/notes/`, and `/blog/` note URL (unique title/description, canonical, structured data) — **technical notes first**.
5. Keep `/logbook/` URLs as redirects to logbook.rocks; do not republish climb reports here.
6. Open a PR on `cursor/<descriptive-name>-33ce`, verify `bundle exec jekyll build`, then merge to `master` when changes are safe and verified.

## Target ranking theme

Become a Persian **reference for notes about software and technology**:

- یادداشت فنی برنامه‌نویسی
- لینوکس و مانیتورینگ
- ابزارها و زیرساخت نرم‌افزار
- یادداشت‌های شخصی مرتبط با کار و یادگیری در همین حوزه

Climb reports: https://logbook.rocks (not this site)

## Do not

- Commit secrets, API keys, or credentials
- Publish `_drafts/`
- Invent climb facts, weather, team members, coordinates, elevations, or flora/fauna
- Invent Instagram captions, dates, or photos when converting `imkavehrs` into `_blog/`
- Publish rounded placeholder lat/lon or «حدود» in place of a missing source
- Keyword-stuff software terms into personal notes
- Weaken uniqueness of note prose for SEO

## Cursor Cloud specific instructions

Static Jekyll 4 site (Ruby 3.2). Standard commands live in `## Install / verify` above.

- Gems install into `./vendor/bundle` (gitignored via a local `bundle config path`). The startup update script runs `bundle install`, so gems are ready — no need to reinstall unless `Gemfile`/`Gemfile.lock` changed.
- Run the dev server with `bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload`. It auto-regenerates on file changes; there is no separate lint step for this site — `bundle exec jekyll build` succeeding is the check.
- The Sass `@import` / `lighten()` deprecation warnings during build/serve are expected and harmless; the build still finishes with exit code 0.
- Adding/removing content files is picked up by the running server via auto-regeneration; editing `_config.yml` requires restarting the server.
