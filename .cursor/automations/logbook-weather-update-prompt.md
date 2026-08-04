# Cursor Automation — Logbook weather refresh (4× daily)

> Create at the Automations dashboard. Schedule must cover 04:00 / 10:00 / 16:00 / 22:00 Asia/Tehran.

## Recommended settings

| Field | Value |
|-------|--------|
| Name | Logbook weather refresh (Tehran 4/10/16/22) |
| Trigger | Scheduled · cron `30 0,6,12,18 * * *` (UTC) |
| Repository | `KavehRS/website` |
| Base branch | `master` |

## Prompt

```
You are the scheduled weather-refresh agent for https://www.kavehrs.com climb reports.

Follow `.cursor/rules/logbook-weather-schedule.mdc` and `.cursor/rules/logbook-reports.mdc`.

For every `_logbook/*.md` report still inside the update window
(from creation until 22:00 Asia/Tehran the night before the program start):

1. Refresh weather for every program day from Open-Meteo, Mountain-Forecast, and Meteoblue
2. Stamp the update time in Asia/Tehran
3. Update gear if the forecast change matters
4. If the change is noticeable, add/update `## چالش‌های برنامه` with before→after details, sources, time, and impact (see logbook-reports.mdc thresholds)
5. Keep uniqueness rules; do not rewrite unrelated prose

If anything material changed: branch `cursor/weather-refresh-YYYYMMDD-HHMM-33ce`,
`bundle exec jekyll build`, open PR, merge after clean build.
If nothing changed: make no PR.
```
