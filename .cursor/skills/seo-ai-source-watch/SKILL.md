---
name: seo-ai-source-watch
description: Every 45 minutes, watch official SEO and AI-citation guidance and apply technical site changes only — never rewrite published logbook or blog prose
---

# SEO + AI-source watcher

Run every **45 minutes** (Cursor Automation and/or GitHub Action). This is **not** a Google rank poll and **not** a harvest of other clubs’ climb reports.

## Mission

1. Watch **primary** materials about:
   - Search SEO (Google Search Central, Bing Webmaster Guidelines, schema.org)
   - Being listed / cited as a **source** by AI systems (llms.txt, search/citation crawlers such as OAI-SearchBot and Claude-SearchBot, Content-Signal `ai-input`, WebMCP, IndexNow)
2. **Apply** only technical, additive site changes that help crawlers and agents find existing pages.
3. **Do not damage or change published copy.**

## Hard limits (always)

Do **not** edit the body, title, description, tags, or categories of existing `_blog/*.md` or `_logbook/*.md` files.

Do **not** keyword-stuff, invent climbs, paste competitor reports, or add guessed coordinates/species.

Allowed apply targets:

- `robots.txt`, `/llms.txt`, `/webmcp-catalog.json`, IndexNow key page
- Layouts / includes / `_config.yml` crawl signals (canonical, JSON-LD includes, `rel=describedby`)
- Cloudflare headers / Content-Signal when they do not alter page prose
- Unpublished notes in `_seo/` (`watch-inbox.md`, `daily-log.md`, `guidance-fingerprint.txt`)

If guidance does not require a site change: **no PR**.

## Step 0 — Fingerprint official sources

Read `_seo/guidance-sources.yml`. Fetch each URL. Compare the combined hash to `_seo/guidance-fingerprint.txt`.

Also skim (do not apply random blogs):

- Google Search Central, especially AI features / crawlers / robots
- Bing Webmaster Guidelines + IndexNow
- schema.org `Article` / `BlogPosting` / `Mountain` / `BreadcrumbList`
- [llms.txt spec](https://llmstxt.org/) (v2: `rel=describedby`, markdown alternates)
- OpenAI crawlers: allow **OAI-SearchBot** for ChatGPT Search citations; **GPTBot** may stay disallowed for training
- Anthropic: allow **Claude-SearchBot** for citations; **ClaudeBot** may stay disallowed for training
- Cloudflare Content Signals: `search=yes`, `ai-input=yes` (live answers / grounding), `ai-train=no`, `use=reference`

## Step 1 — Live checks (no content rewrite)

- `https://www.kavehrs.com/llms.txt` exists, starts with `#`, lists current hubs
- `https://www.kavehrs.com/robots.txt` still allows Googlebot / Bingbot / OAI-SearchBot / Claude-SearchBot / PerplexityBot
- `https://www.kavehrs.com/webmcp-catalog.json` and `/sitemap.xml`
- HTML `<link rel="describedby" href="…/llms.txt">` on pages
- Do not fight Cloudflare managed `Disallow` for training bots (GPTBot, Google-Extended, ClaudeBot) unless the owner asks to allow training

## Step 2 — Apply or skip

Apply a technical diff only when official guidance changed in a way this site does not yet follow.

Update `_seo/watch-inbox.md` with: Jalali+Gregorian stamp, URLs read, before→after of any technical change, and “published bodies untouched”.

Update `_seo/guidance-fingerprint.txt` when the run finishes (even if no site diff), so the next 45-minute job can no-op.

## Step 3 — Verify

```bash
bundle exec jekyll build
test ! -e _site/drafts
test ! -e _site/cursor
test -f _site/llms.txt
```

Confirm `_site/llms.txt` has no HTML wrapper and `_drafts/` / `.cursor/` / `_seo/` are unpublished.

Ship on `cursor/<descriptive-name>-33ce` only when files actually changed.
