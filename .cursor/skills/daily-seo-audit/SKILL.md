---
name: daily-seo-audit
description: Daily SEO audit and update workflow for kavehrs.com climb-report ranking
---

# Daily SEO audit skill

Run this every 24 hours (Cursor Automation or GitHub Action → Cloud Agent API).

## Mission

Improve discoverability of Persian **گزارش برنامه صعود** content for the disciplines in `_data/logbook_disciplines.yml`:

- کمپ‌های آموزشی · برفچال · یخچال · آبشار یخی · صعود زمستانه
- کوهنوردی مرتفع (بالای ۴۰۰۰ متر) · کوهنوردی فنی · کوهپیمایی · سنگ‌نوردی · دیواره‌نوردی
- plus یخ‌نوردی / DryTooling where relevant in report content

Hub `/logbook/` is chronological. Related blocks must stay a flat `گزارش‌های مرتبط :` list (no agent blurbs / category subheads on the page).

Primary hub: `/logbook/` · Site: `https://www.kavehrs.com`

## Step 0 — Fresh guidance

Fetch and skim the latest public docs (prefer primary sources):

- Google Search Central (SEO starter, meta tags, robots, sitemaps, structured data / rich results)
- Bing Webmaster Guidelines
- schema.org types relevant to articles, places, mountains, sports/activities
- Any material change vs previous run → note it in the PR body

Do not invent “SEO tips” from random blogs when they conflict with primary docs.

## Step 1 — Live crawl snapshot

Inspect:

1. `https://www.kavehrs.com/`
2. `https://www.kavehrs.com/logbook/`
3. `https://www.kavehrs.com/robots.txt`
4. `https://www.kavehrs.com/sitemap.xml`
5. Every indexed HTML URL in the sitemap (or build output if live fetch fails)

Record: title, meta description, canonical, `lang`/`dir`, H1 count, OG/Twitter tags, JSON-LD validity, obvious broken images/links.

## Step 2 — Repo audit checklist

For each `_logbook/*.md` and key pages (`index.md`, `logbook.md`, blog index):

- [ ] Unique `title` and `description` (≈120–160 chars for description when practical)
- [ ] `lang` / `dir_attr` correct
- [ ] `image` points to a real climb asset when available (not only the logo)
- [ ] `image` alt available when using object form supported by theme/includes
- [ ] Categories use `_data/logbook_disciplines.yml` slugs (training-camp, snowfield, glacier, icefall, winter-ascent, high-altitude, technical-mountaineering, hiking, rock-climbing, wall-climbing) plus place/peak tags
- [ ] Upcoming reports still follow weather schedule + challenge-on-significant-change rules when weather text is edited

- [ ] Peak front matter (`peak.name`, elevation, lat/lon) present when known → feeds JSON-LD
- [ ] Internal links: related climbs + hub `/logbook/`
- [ ] No duplicate body text vs another report of the same peak
- [ ] Headings: single H1, logical H2+
- [ ] Images: meaningful `alt` in Markdown

Technical site-wide:

- [ ] `jekyll-seo-tag` + `jekyll-sitemap` still enabled
- [ ] `robots.txt` points at sitemap
- [ ] Noindex pages stay out of ranking intent (archive, projects, 404, legacy redirects)
- [ ] Favicons / social image resolve (HTTP 200)
- [ ] Structured data includes climb Place/Mountain when `page.peak` exists
- [ ] Performance proxies: oversized images in new posts, missing compression

## Step 3 — Decide what to change today

Priority order:

1. Broken crawl/index blockers (404 assets, bad canonical, accidental noindex on logbook)
2. Missing/weak logbook metadata and structured data
3. Internal linking gaps on climb reports
4. Hub page (`/logbook/`) clarity for target queries
5. Incremental content SEO (titles/descriptions) without rewriting unique narratives
6. Only then: broader template/CSS SEO hygiene

Skip low-value churn (renaming CSS classes, speculative keyword density edits).

If nothing material is wrong, **make no PR**.

## Step 4 — Implement

- Branch: `cursor/seo-daily-YYYYMMDD-33ce` (or similar kebab + `-33ce`)
- Keep uniqueness rules from `.cursor/rules/logbook-reports.mdc`
- Prefer includes/layouts/`_config.yml` for systemic fixes over one-off hacks
- Update `_seo/daily-log.md` with a short dated entry (what checked, what changed, sources consulted)

## Step 5 — Verify & ship

```bash
bundle exec jekyll build
test ! -e _site/drafts
test ! -e _site/cursor
```

Then: commit → push → open PR → merge after clean build (high-confidence technical SEO).  
If a change is editorial/controversial, leave as draft PR and summarize for the owner instead of merging.

## Success metrics (track qualitatively in `_seo/daily-log.md`)

- Logbook URLs have complete meta + useful JSON-LD
- Hub page ranks thematically for گزارش صعود / برنامه کوهنوردی
- No duplicate thin pages
- Sitemap only contains indexable URLs
- Each new improvement compounds; avoid oscillating rewrites day-to-day
