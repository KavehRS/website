---
name: daily-seo-audit
description: Daily SEO audit for personal notes on kavehrs.com (/notes/ only)
---

# Daily SEO audit skill

Run this every 24 hours (Cursor Automation or GitHub Action → Cloud Agent API).

## Mission

Keep https://www.kavehrs.com a clear Persian site of **personal notes**. Published notes live on `/notes/` only. Do not recreate `/tech/`, do not require `note_kind`, and do not republish `_drafts/`.

Climb reports are on https://logbook.rocks/logbook/ — this site only **redirects** `/logbook/:path/` there. Do not republish report bodies here.

`/notes/` is chronological and lists every document in `site.blog`. Related blocks stay a flat `یادداشت‌های مرتبط :` list matched by shared tags. Reader-facing dates stay Jalali (`_includes/jalali-date.html`).

Every published note should be crawlable, have unique title/description, correct `lang`/`dir`, valid canonical, and useful structured data. Do not keyword-stuff.

## Step 0 — Fresh guidance

Fetch and skim the latest public docs (prefer primary sources):

- Google Search Central (SEO starter, meta tags, robots, sitemaps, structured data / rich results, [AI features](https://developers.google.com/search/docs/appearance/ai-features))
- Bing Webmaster Guidelines + IndexNow
- schema.org types relevant to articles, software, how-to notes (`BlogPosting`, `TechArticle` only when it matches the page)
- AI citation surfaces: [llms.txt](https://llmstxt.org/), OpenAI `OAI-SearchBot`, Anthropic `Claude-SearchBot` (training bots may stay disallowed)
- Any material change vs previous run → note it in the PR body

Do not invent “SEO tips” from random blogs when they conflict with primary docs.
Do not rewrite published `_blog/` bodies during SEO work unless the owner asked to edit that file.

## Step 1 — Live crawl snapshot

Inspect:

1. `https://www.kavehrs.com/`
2. `https://www.kavehrs.com/notes/`
3. `https://www.kavehrs.com/blog/`
4. `https://www.kavehrs.com/robots.txt`
5. `https://www.kavehrs.com/sitemap.xml`
6. Every indexed HTML URL in the sitemap (or build output if live fetch fails)

Confirm `https://www.kavehrs.com/tech/` is gone. Do not add the page back.

Record: title, meta description, canonical, `lang`/`dir`, H1 count, OG/Twitter tags, JSON-LD validity, obvious broken images/links.

Confirm `/logbook/` still redirects to logbook.rocks (not a crawlable report body).

## Step 2 — Repo audit checklist

For each `_blog/*.md` and key pages (`index.md`, `notes.md`, `blog.md`):

- [ ] Unique `title` and `description` (≈120–160 chars for description when practical)
- [ ] `lang` / `dir_attr` correct
- [ ] Listings include the note without requiring `note_kind`
- [ ] `image` points to a real note asset when available (not only the logo)
- [ ] `image` alt available when using object form supported by theme/includes
- [ ] Internal links: related notes that share tags + hub `/notes/`
- [ ] Headings: single H1, logical H2+
- [ ] Images: meaningful `alt` in Markdown
- [ ] Notes stay people-first (version/date in the lead when a how-to is old)

Technical site-wide:

- [ ] `jekyll-seo-tag` + `jekyll-sitemap` still enabled
- [ ] `robots.txt` points at sitemap
- [ ] Noindex pages stay out of ranking intent (archive, projects, 404, `/logbook/` redirects)
- [ ] Favicons / social image resolve (HTTP 200)
- [ ] Structured data for notes (`BlogPosting` / CollectionPage); no Mountain schema on this site
- [ ] Performance proxies: oversized images in new posts, missing compression

## Step 3 — Decide what to change today

Priority order:

1. Broken crawl/index blockers (404 assets, bad canonical, accidental noindex on `/notes/` or notes)
2. Weak hub/meta on `/notes/` and published note URLs
3. Internal linking gaps among notes that share tags
4. Hub page (`/notes/`) lists every published `_blog` file
5. Incremental content SEO (titles/descriptions) without rewriting unique narratives
6. Only then: broader template/CSS SEO hygiene

Skip low-value churn (renaming CSS classes, speculative keyword density edits).

If nothing material is wrong, **make no PR**.

## Step 4 — Implement

- Branch: `cursor/seo-daily-YYYYMMDD-33ce` (or similar kebab + `-33ce`)
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

- `/notes/` and published note URLs have complete meta + useful JSON-LD
- `/tech/` stays absent; hub is personal notes (not گزارش صعود)
- No duplicate thin pages
- Sitemap only contains indexable URLs (no climb-report bodies)
- Each new improvement compounds; avoid oscillating rewrites day-to-day
