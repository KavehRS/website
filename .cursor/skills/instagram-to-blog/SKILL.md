---
name: instagram-to-blog
description: Instagram agent conversion skill — turn the owner’s Instagram posts (imkavehrs) into Persian `_blog/` notes from an official export or pasted captions; never invent posts. Use with the Instagram agent and the blog-post skill.
---

# Instagram → blog skill

This is the **Instagram agent** conversion skill. Use when the user asks to convert Instagram posts into blog notes (`پست‌های اینستاگرام را به بلاگ تبدیل کن` / Instagram → `_blog/` / import IG archive / `/instagram`).

Account: `imkavehrs` → https://www.instagram.com/imkavehrs/

Agent: `.cursor/agents/instagram.md`  
Agent rule: `.cursor/rules/instagram-agent.mdc`  
Conversion rule: `.cursor/rules/instagram-to-blog.mdc`  
Related skill (required): `.cursor/skills/blog-post/SKILL.md` (`_blog/` file shape)  
Template: `_drafts/instagram-blog-post-template.md`  
Automation: `.cursor/automations/instagram-to-blog-prompt.md`  
Parser: `.cursor/scripts/parse-instagram-export.py`  
Import ledger: `_data/instagram_imports.yml`

This is **not** the logbook ascent-report agent. Climb photos become `_blog/` field notes unless the user explicitly asks for a full `گزارش صعود`.

## Always read first

1. `AGENTS.md`
2. `.cursor/agents/instagram.md`
3. `.cursor/rules/instagram-agent.mdc`
4. `.cursor/rules/instagram-to-blog.mdc`
5. `.cursor/skills/blog-post/SKILL.md` (required — `_blog/` file shape, assets, related UI)
6. `.cursor/rules/blog-posts.mdc`
7. `_drafts/instagram-blog-post-template.md`
8. `_data/instagram_imports.yml` (skip already-imported ids)
9. Existing `_blog/*.md` and `_logbook/*.md` (do not duplicate)

Follow the blog-post skill for `_blog/` file shape. Use this skill for Instagram sources, parser, ledger, and caption rewrite.

## Source order (do not invent)

Use the first source that actually contains **this account’s** posts:

1. Official Instagram export (2026: **Meta Account** or **Accounts Center** → **Your information and permissions** → **Export your information** → **Create export** → **Export to device** → format **JSON**, date range all time) unzipped under `_drafts/instagram-export/` — see `_drafts/instagram-export/README.md`
2. Files the user attached in the chat (ZIP / JSON / photos + captions)
3. Captions, dates, and URLs the user pasted
4. A public Instagram URL that fetches without a login wall

If none of these exist: **stop**. Do not scrape login-walled Instagram, do not use anonymous viewer mirrors, and do not fabricate captions, dates, or photos. Tell the owner to drop the official export (see `_drafts/instagram-export/README.md`) and re-run this skill.

## Parse the export

```bash
python3 .cursor/scripts/parse-instagram-export.py \
  --input _drafts/instagram-export \
  --out _drafts/instagram-export/parsed.json
```

The script writes one object per feed post (photos, carousels, reels). It skips stories without a caption. Read `parsed.json`; do not commit the ZIP, media binaries, or `parsed.json`.

## Convert each post

For every item **not** already in `_data/instagram_imports.yml`:

1. Gregorian date from `creation_timestamp` (Asia/Tehran calendar date) → filename `YYYY-MM-DD-<slug>.md` (zero-padded)
2. Slug: short Persian-topic kebab-case in ASCII (`kahar-ridge`, `khalleno-camp`) or `ig-<shortcode-or-id>` if the caption has no usable topic
3. File: `_blog/YYYY-MM-DD-<slug>.md`
4. Front matter:
   - `layout: post`, `lang: fa-IR`, `dir_attr: rtl`
   - unique `title` + `description` (~120–160 chars)
   - `date: YYYY-MM-DD`
   - `tags: [YAML array]` from real topics in the caption (strip spam hashtags)
   - `source: instagram`
   - `instagram_url` / `instagram_shortcode` when known
   - `image:` only after a real file is copied into `assets/blog/<slug>/`
5. Copy **that post’s** images only into `assets/blog/YYYY-MM-DD-<slug>/` (cover = first still). Persian `alt`. Video: still poster if present; do not invent a frame.
6. Rewrite the caption as the author (من). Expand into a short note. Do not dump raw hashtag lists. Do not add unsourced elevations, coordinates, or species.
7. Optional last line: `[پست در اینستاگرام](https://www.instagram.com/p/<shortcode>/)` — only with a real shortcode
8. If a `_logbook/` report already covers the same peak and program date, write a short note that links to that report. Do not republish the climb report as a blog clone.
9. Skip caption-less items (photo only, no title/location). List skips in the PR body.
10. Append the id to `_data/instagram_imports.yml`

Related: `related:` only to real sibling `_blog/` URLs (same series or shared tags). Public UI stays `یادداشت‌های مرتبط :` + flat list.

## Do not

- Put Instagram imports in `_logbook/` unless the user asked for a full ascent report
- Invent posts, captions, dates, or photos
- Commit the export ZIP, `parsed.json`, or Instagram session cookies
- Keyword-stuff titles
- Publish agent/USAGE comments on the live page
- Rename old `_blog/` files

## Ship

1. `bundle exec jekyll build` must succeed
2. `_drafts/` and `.cursor/` must not appear in `_site/`
3. Branch `cursor/<descriptive-name>-33ce` (or the suffix this run requires)
4. Open a PR; merge after a clean verified build
