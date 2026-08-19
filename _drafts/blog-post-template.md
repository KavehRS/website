---
# DRAFT TEMPLATE — not published
# چهارچوب استاندارد یادداشت فنی وبلاگ
# هنگام ساخت پست جدید: این سکشن‌ها را نگه دار، متن را از نو بنویس.
layout: null
title: "قالب یادداشت وبلاگ — درفت"
published: false
sitemap: false
noindex: true
lang: fa-IR
dir_attr: rtl
---

<!--
USAGE (agent-only — do not copy this comment block into published pages)
0) This template is used by the blog-post agent
   (.cursor/automations/blog-post-prompt.md + .cursor/skills/blog-post/SKILL.md)
1) Copy structure into `_blog/YYYY-MM-DD-<slug>.md`
   - Zero-pad month and day (2026-08-15-not-2026-8-15)
   - Do not rename old posts; their live URLs must stay
2) Front matter required:
   layout: post
   title, lang: fa-IR, dir_attr: rtl
   description (unique, ~120–160 chars, not keyword-stuffed)
   date: YYYY-MM-DD (Gregorian for machines; UI shows Jalali)
   tags: [YAML array] — never a single unquoted string
   kind: omit or `note` for یادداشت; `news` is a different template (`_drafts/news-post-template.md`)
3) Optional:
   related: [{ title, url }] for a series (manual list wins over tag matching)
   image: only a real photo/diagram for THIS note
   # comment image out until the owner provides the file
4) Images for new posts: `assets/blog/YYYY-MM-DD-<slug>/` matching `/blog/YYYY-MM-DD-<slug>/`
   Reference as `/assets/blog/YYYY-MM-DD-<slug>/<file>` with a Persian alt
5) Related UI is selected by `page.related` or shared tags.
   Public heading: «یادداشت‌های مرتبط :» + flat list only
6) Hub `/blog/` is chronological by date (newest first) and lists notes only — news items (`kind: news`) go to `/news/`
7) Write as the author (من). Never publish agent notes, JSON-LD asides, or «این بند برای SEO»
8) Do not invent commands, version numbers, IPs, or results the user did not give
9) If the note is version-dated (e.g. Zabbix 5, GOPATH-era Go), say so in the lead
10) Never paste this template prose unchanged into a published post
11) Reader-facing dates: Jalali via `_includes/jalali-date.html`
12) Before publish: unique title vs existing `_blog/*`; fill related from real sibling posts
-->

**{{عنوان_یادداشت}}**

{{یک پاراگراف شروع: این یادداشت چیست، برای چه کسی، روی چه نسخه/تاریخ}}


## پیش‌نیاز

- {{سیستم‌عامل / ابزار / دانش قبلی — فقط اگر لازم است}}


## {{بخش اصلی ۱}}

{{متن}}

```bash
{{دستور — فقط اگر کاربر داده یا از منبع نام‌دار است}}
```


## {{بخش اصلی ۲}}

{{متن}}


## نکته‌ها

- {{محدودیت نسخه، دام، چیزهایی که در آن تاریخ فرق داشت}}


<!-- related is usually front matter; body need not repeat the list -->
