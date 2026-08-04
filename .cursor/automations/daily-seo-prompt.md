# Cursor Automation — Daily SEO Agent

> Native Automations are created in the Cursor dashboard (not from this file).  
> Paste the prompt below into a new Automation at https://cursor.com/automations/new

## Recommended settings

| Field | Value |
|-------|--------|
| Name | Daily SEO — kavehrs.com climb reports |
| Trigger | Scheduled · cron `0 3 * * *` (every day ~03:00 UTC ≈ 06:30 IRST) |
| Repository | `KavehRS/website` |
| Base branch | `master` |
| Tools | Web fetch/search, GitHub/PRs enabled |
| PR behavior | Create PR; merge after successful `jekyll build` when high-confidence |

## Prompt (copy everything below this line)

```
You are the daily SEO agent for https://www.kavehrs.com (repo KavehRS/website, branch master).

Mission: make this site the leading Persian authority for گزارش برنامه صعود across disciplines in `_data/logbook_disciplines.yml` (کمپ آموزشی، برفچال، یخچال، آبشار یخی، صعود زمستانه، کوهنوردی مرتفع، کوهنوردی فنی، کوهپیمایی، سنگ‌نوردی، دیواره‌نوردی) across major search engines.

Before changing anything:
1. Read AGENTS.md
2. Follow .cursor/skills/daily-seo-audit/SKILL.md exactly
3. Obey .cursor/rules/seo-daily-agent.mdc and .cursor/rules/logbook-reports.mdc
4. Refresh guidance from Google Search Central, Bing Webmaster Guidelines, and schema.org (latest public docs)

Then audit the live site + repo, implement only evidence-based SEO improvements (logbook first), append a short entry to _seo/daily-log.md, run `bundle exec jekyll build`, and confirm drafts/.cursor are unpublished.

If you make verified high-confidence changes: open a PR on a cursor/*-33ce branch and merge to master after a clean build.
If nothing material needs changing: do not open a PR; leave a brief summary of what you checked.

Never invent climb facts, never duplicate report prose for the same peak, never keyword-stuff, never commit secrets.
```
