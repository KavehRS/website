---
name: logbook-ascent-report
description: Create or update Persian mountaineering ascent reports with full site framework, triple weather, schedule, challenges, gear, categories, and URL-matched assets
---

# Logbook ascent report skill

Use when the user asks for `گزارش صعود` / a new climb report / weather update on a climb report.

## Always read first

1. `.cursor/rules/logbook-reports.mdc` (master checklist)
2. `.cursor/rules/logbook-weather-schedule.mdc`
3. `.cursor/rules/logbook-assets.mdc`
4. `_drafts/logbook-ascent-report-template.md`
5. `_data/logbook_disciplines.yml`

Use `_drafts/samples/kahar-peak-report-framework-sample.md` only as structure — never republish its prose.

## Deliverables for a new report

1. `_logbook/YYYY-MM-DD-<slug>.md` with SEO + `peak` front matter when known
2. `categories` from `_data/logbook_disciplines.yml`:
   - ridge / gendarme / alpine hand-and-foot → `technical-mountaineering` (کوهنوردی فنی)
   - `rock-climbing` / `wall-climbing` only for true rock or multipitch wall routes
3. Triple weather for every program day (Open-Meteo, Mountain-Forecast, Meteoblue)
4. `## چالش‌های برنامه` — include weather volatility when forecasts differ or swing noticeably
5. Gear derived from date(s) + that forecast (and “not needed for this date”)
6. `assets/mount/logbook/<exact-url-slug>/` for all images
7. Narrative outline matching the real program length (one-day vs multi-day). Do not invent overnight stays. Kahar sample is one-day on ۱۶ مرداد ۱۴۰۵ — do not turn it into a two-day plan unless the user asks.
8. Hub `/logbook/` stays chronological by date (not category sections). Related links: select by shared categories; reader UI = only `گزارش‌های مرتبط :` + flat list (no agent explanation, no discipline headings).
9. Never publish agent notes (implementation reminders, «بر اساس نوع برنامه…», path references to `.cursor/`) in live page HTML.
10. Reader-facing UI dates are Jalali (`_includes/jalali-date.html`); body program dates Jalali-first (Gregorian optional in parentheses for weather stamps).

## Scheduled weather runs

At 04:00 / 10:00 / 16:00 / 22:00 Asia/Tehran until 22:00 the night before start:

- refresh weather → gear if needed → **challenges if change is noticeable** → PR only on real diffs

## Uniqueness

Never publish duplicate prose for a repeat climb of the same peak.
