# Daily SEO agent log

Append-only run notes for the scheduled SEO agent. Not published on the site.

## 2026-08-04 — bootstrap

- Added daily SEO skill, Cursor Automation prompt, optional GitHub Actions trigger.
- Baseline: logbook CollectionPage + Mountain Article JSON-LD when `page.peak` is set.
- Auto related links for logbook by shared discipline categories (public UI: flat «گزارش‌های مرتبط :» list).
- Tuned site/logbook descriptions toward گزارش برنامه صعود کوهنوردی / سنگ‌نوردی / یخ‌نوردی.
- Sources consulted at bootstrap: Google Search Central (SEO basics, sitemaps, structured data), schema.org `Article` / `Mountain` / `CollectionPage`, Bing Webmaster Guidelines overview.

## 2026-08-04 — related UI + taxonomy sync

- Related public UI: only «گزارش‌های مرتبط :» + flat list (no «بر اساس نوع برنامه…», no discipline headings).
- Hub `/logbook/` chronological by date.
- Added/confirmed `technical-mountaineering` (کوهنوردی فنی) for ridge/gendarme/alpine hand-and-foot; rock/wall reserved for true rock/wall.
- Kahar pre-report corrected to one-day on ۱۶ مرداد ۱۴۰۵.
- Synced AGENTS.md, logbook rules/skills/template/sample.

## 2026-08-04 — Jalali UI dates

- Footer «آخرین بروزرسانی», post meta, and `/logbook/` list dates use Jalali via `_includes/jalali-date.html` (e.g. 13 مرداد 1405).

## 2026-08-05 — Ascent-report agent

- Added on-demand logbook ascent-report agent: `.cursor/automations/logbook-ascent-report-prompt.md`, `.cursor/rules/logbook-ascent-agent.mdc`, AGENTS.md + skill entry points.

## 2026-08-12 — Full SEO remediation

- **Categories:** normalized all 22 logbook posts to `_data/logbook_disciplines.yml` slugs (`mountaineering` / `ice-climbing` / `training` / `traverse` removed).
- **peak front matter:** added or fixed on all 22 reports (renamed legacy `site:` → `peak:` on ice/rock training posts).
- **Duplicate titles:** Hezarla 1402 vs 1403 titles differentiated.
- **OG image:** Kahar 1405 report uses climb cover in slug folder (placeholder from 1402 until 1405 photos uploaded).
- **DNS (owner action):** `pop.kavehrs.com` spam subdomain — see `_seo/subdomain-dns-checklist.md`.
- Live check: sitemap 35 URLs, robots OK, 0 broken asset refs.

- Weather: use only accurate peak/region sources; omit distant proxies (e.g. Kahar drops Mountain-Forecast).
- Report lifecycle: `report_status: active` until post-climb completion; agent stays active entire time.
- Automation configured but paused until Cursor account recharge; mandatory always-on after.
