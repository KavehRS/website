---
name: logbook-ascent-report
description: Create or update Persian mountaineering ascent reports with the site framework and triple weather sources
---

# Logbook ascent report skill

Use when the user asks for `گزارش صعود` / a new climb report / weather update on a climb report.

## Framework

1. Follow `.cursor/rules/logbook-reports.mdc`
2. Copy section structure from `_drafts/logbook-ascent-report-template.md`
3. Use `_drafts/samples/kahar-peak-report-framework-sample.md` only as a structural example — never republish its prose
4. Write the live file under `_logbook/YYYY-MM-DD-<peak-slug>.md`

## Triple weather (mandatory)

Populate the climate/weather block from **all three** sources for the climb day:

| # | Source | How to use |
|---|--------|------------|
| 1 | **Open-Meteo** | API/point forecast at peak lat/lon + elevation; also trailhead elevation when useful |
| 2 | **Mountain-Forecast** | https://www.mountain-forecast.com/ — exact peak page if it exists; otherwise closest Alborz (or local range) peak with the elevation band nearest the summit. State proxy name, distance, elevation band, and URL |
| 3 | **Meteoblue** | https://www.meteoblue.com/ — week/point forecast for peak coordinates with elevation set near the summit; include URL |

Requirements:

- Stamp the fetch date in Jalali + Gregorian
- Prefer metric units (°C, km/h, mm)
- Add a short operational summary when sources disagree
- Refresh weather whenever the climb date changes or the user asks for an update

## Uniqueness

Never publish duplicate prose for a repeat climb of the same peak. Rewrite literature; only stable facts may repeat when still accurate.
