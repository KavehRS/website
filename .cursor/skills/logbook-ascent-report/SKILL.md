---
name: logbook-ascent-report
description: Agent skill for Persian گزارش صعود — lifecycle-active reports, accurate weather sources only, gear, challenges, Jalali UI, URL-matched assets
---

# Logbook ascent report skill

This is the **logbook ascent-report agent** skill. Use when the user asks for `گزارش صعود` / a new climb report / update / post-climb completion / weather update on a climb report.

Automation prompt (Cursor dashboard): `.cursor/automations/logbook-ascent-report-prompt.md`  
Agent rule: `.cursor/rules/logbook-ascent-agent.mdc`

## Always read first

1. `AGENTS.md`
2. `.cursor/rules/logbook-ascent-agent.mdc`
3. `.cursor/rules/logbook-reports.mdc` (master checklist)
4. `.cursor/rules/logbook-facts.mdc` (no guessed elevations/coordinates/species)
5. `.cursor/rules/logbook-weather-schedule.mdc`
6. `.cursor/rules/logbook-assets.mdc`
7. `_drafts/logbook-ascent-report-template.md`
8. `_data/logbook_disciplines.yml`

Use `_drafts/samples/kahar-peak-report-framework-sample.md` only as structure — never republish its prose.

## Lifecycle (agent stays active)

- **From:** report file created in `_logbook/`
- **Until:** `report_status: completed` or user confirms post-climb report is finished
- **While active:** all logbook rules apply (including post-climb narrative/photos when user provides them)
- **New reports:** `report_status: active` in front matter
- **Weather sub-window:** 04/10/16/22 Asia/Tehran until 22:00 night before climb (active reports only)

## Deliverables for a new report

1. `_logbook/YYYY-MM-DD-<slug>.md` with SEO + `report_status: active` + `peak` front matter only for sourced values (omit guessed lat/lon/elevation)
2. `categories` from `_data/logbook_disciplines.yml`:
   - ridge / gendarme / alpine hand-and-foot → `technical-mountaineering` (کوهنوردی فنی)
   - `rock-climbing` / `wall-climbing` only for true rock or multipitch wall routes
3. Weather for every program day from **accurate sources only** (Open-Meteo, Mountain-Forecast if peak has its own page, Meteoblue when reliable) — **omit** distant proxies / missing data
4. `## چالش‌های برنامه` — noticeable forecast change or disagreement among **sources actually used**
5. Gear derived from date(s) + applicable forecast(s). Do not publish a «همراه نبرید» list.
6. `assets/mount/logbook/<exact-url-slug>/` for all images
7. Narrative outline → post-climb completion when user provides details. Program length from user only (Kahar = one-day ۱۶ مرداد ۱۴۰۵ unless changed).
8. Hub `/logbook/` chronological; related UI = only `گزارش‌های مرتبط :` + flat list
9. Homepage `/` always lists the 4 newest reports (and notes/news via the same include) via `_includes/home-latest.html` (do not hardcode teasers in `index.md`)
10. Never publish agent notes in live HTML
11. Reader-facing UI dates Jalali (`_includes/jalali-date.html`)

## Scheduled weather runs (automatic when billing enabled)

At 04:00 / 10:00 / 16:00 / 22:00 Asia/Tehran for **active** reports until 22:00 night before start:

- refresh **applicable accurate** sources → gear if needed → **challenges if noticeable** → PR only on real diffs
- **Paused until owner recharges Cursor account** and enables schedulers — then **mandatory always-on**
- `.cursor/automations/logbook-weather-update-prompt.md` + `.github/workflows/logbook-weather-agent.yml`

## Uniqueness

Never publish duplicate prose for a repeat climb of the same peak.
