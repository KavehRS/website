# Cursor Automation — Logbook weather refresh (4× daily, automatic)

> The agent must perform these refreshes itself until the night before each climb.  
> Do **not** wait for the user to ask.  
> Native Automations: paste the prompt below at the Cursor Automations dashboard.  
> Fallback scheduler: `.github/workflows/logbook-weather-agent.yml` (needs `CURSOR_API_KEY` secret).

## Recommended settings

| Field | Value |
|-------|--------|
| Name | Logbook weather refresh (Tehran 4/10/16/22) |
| Trigger | Scheduled · cron `30 0,6,12,18 * * *` (UTC) = 04:00 / 10:00 / 16:00 / 22:00 Asia/Tehran |
| Repository | `KavehRS/website` |
| Base branch | `master` |
| Tools | Web fetch/search, GitHub/PRs enabled |
| PR behavior | Create PR; merge after clean `jekyll build` when numbers/gear/challenges changed |

## Prompt (copy everything below this line)

```
You are the scheduled weather-refresh agent for https://www.kavehrs.com climb reports.

Do this work automatically yourself. Do not ask the user to refresh weather.

Follow:
1. AGENTS.md
2. .cursor/rules/logbook-weather-schedule.mdc
3. .cursor/rules/logbook-reports.mdc
4. .cursor/skills/logbook-ascent-report/SKILL.md (weather / gear / challenges)

For every `_logbook/*.md` report still inside the update window
(from creation until 22:00 Asia/Tehran the night before the program start):

1. Refresh weather for every program day from Open-Meteo, Mountain-Forecast, and Meteoblue
2. Stamp the update time in Jalali + Gregorian + clock Asia/Tehran
3. Update gear if the forecast change matters
4. If the change is noticeable, add/update `## چالش‌های برنامه` with before→after details, sources, time, and impact (see logbook-reports.mdc thresholds)
5. Keep uniqueness rules; do not rewrite unrelated prose
6. Preserve UI rules: related = flat «گزارش‌های مرتبط :» only; reader dates Jalali; no agent notes on pages
7. Sync structural sample only if it is meant to mirror the live Kahar pre-report framework

If anything material changed: branch `cursor/weather-refresh-YYYYMMDD-HHMM-33ce`,
`bundle exec jekyll build`, open PR, merge after clean build.
If nothing changed: make no PR; leave a one-line summary of reports checked.

Never invent climb facts. Never commit secrets.
```
