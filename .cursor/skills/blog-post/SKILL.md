---
name: blog-post
description: Agent skill for Persian یادداشت وبلاگ — new/update technical notes in `_blog/` with the default template, Jalali UI dates, YAML tags, related notes
---

# Blog post skill

Use when the user asks for a **پست جدید وبلاگ** / یادداشت جدید / technical blog note / update to an existing `_blog/` post.

Template: `_drafts/blog-post-template.md`  
Rule: `.cursor/rules/blog-posts.mdc`  
Automation prompt: `.cursor/automations/blog-post-prompt.md`

## Always read first

1. `AGENTS.md`
2. `.cursor/rules/blog-posts.mdc`
3. `_drafts/blog-post-template.md`
4. Existing `_blog/*.md` (titles, tags, related URLs — do not duplicate)

## New post deliverables

1. `_blog/YYYY-MM-DD-<slug>.md` (zero-padded date; slug lowercase kebab-case)
2. Front matter: `layout: post`, `lang: fa-IR`, `dir_attr: rtl`, unique `title` + `description`, Gregorian `date:`, `tags: [array]`
3. Optional `related:` with real `/blog/.../` URLs for a series
4. `image:` only when a real asset exists; otherwise comment it out until the owner adds files
5. Images in `assets/blog/YYYY-MM-DD-<slug>/` matching the URL path (`.gitkeep` if photos come later)
6. Body from the template sections — rewrite all prose; never ship placeholders like `{{عنوان}}`
7. Hub `/blog/` stays chronological; related UI = `یادداشت‌های مرتبط :` + flat list
8. Homepage `/` always lists the **4 newest** `_blog/` and `_logbook/` items via `_includes/home-latest.html` — do **not** hardcode teasers in `index.md`
9. If `image:` is set, the post layout shows it at the top of the note (and as OG cover)
10. `bundle exec jekyll build` must succeed; `_drafts/` must not appear in `_site/`

## Voice and facts

- Published copy is the author’s note (من), not an editor or agent
- Do not invent install steps, IPs, version support dates, or command output
- If the user gives only a title/topic, ask nothing if they already provided enough to draft; leave gaps omitted rather than faked
- Version-specific guides must say which version/date the steps belong to

## Do not

- Put blog notes in `_logbook/`
- Use logbook `categories` / `peak` / weather blocks on blog posts
- Rename old `_blog/` files (live URLs must stay)
- Keyword-stuff titles
- Publish agent/USAGE comments into the live page
