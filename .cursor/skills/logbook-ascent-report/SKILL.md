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

## Categories / disciplines (mandatory)

Set `categories` using slugs from `_data/logbook_disciplines.yml`:

`training-camp` · `snowfield` · `glacier` · `icefall` · `winter-ascent` · `high-altitude` · `hiking` · `rock-climbing` · `wall-climbing`

- Pick all that truly apply; keep them separate (do not collapse into a generic “mountaineering” category)
- `/logbook/` and related-links group by these categories, not by template similarity
- Avoid manual `related:` unless the user asks for a specific cross-link

## Weather-based gear (mandatory)


After writing the triple weather block, build `تجهیزات مورد نیاز` from **that climb date + those forecasts**:

1. One-line basis (date, one-day/overnight, expected summit temps/wind/precip)
2. Clothing layers matched to temperature and wind
3. Rain shell / sun kit / hydration amounts justified by the forecast
4. Technical tools (crampons, axe, rope, overnight kit) only if this date/route needs them
5. A short “not needed for this date” list
6. If weather is updated later, rewrite gear in the same pass — never leave a generic seasonal list

See `_drafts/logbook-ascent-report-template.md` for the section skeleton.

## Uniqueness

Never publish duplicate prose for a repeat climb of the same peak. Rewrite literature; only stable facts may repeat when still accurate.

