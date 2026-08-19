---
# DRAFT TEMPLATE — not published
# چهارچوب خبر کوتاه وبلاگ (kind: news)
# هنگام ساخت خبر جدید: این سکشن‌ها را نگه دار، متن را از نو بنویس.
layout: null
title: "قالب خبر وبلاگ — درفت"
published: false
sitemap: false
noindex: true
lang: fa-IR
dir_attr: rtl
---

<!--
USAGE (agent-only — do not copy this comment block into published pages)
0) News items live in `_blog/` with front matter kind: news
   Template for notes is `_drafts/blog-post-template.md` — do not mix the two
1) Copy structure into `_blog/YYYY-MM-DD-<slug>.md` (zero-pad month and day)
2) Front matter required:
   layout: post
   kind: news
   permalink: /news/:path/
   title, lang: fa-IR, dir_attr: rtl
   description (unique, ~120–160 chars, not keyword-stuffed)
   date: YYYY-MM-DD (Gregorian for machines; UI shows Jalali)
   tags: [YAML array]
3) Optional related: [{ title, url }] only to other news items when they exist
   image: only a real photo for THIS item; comment out until the file exists
4) Images: `assets/news/YYYY-MM-DD-<slug>/` matching `/news/YYYY-MM-DD-<slug>/`
5) Related public UI: «اخبار مرتبط :» + flat list
6) Hub `/news/` is chronological (newest first). `/blog/` must not list news.
7) Write as the author (من). Short: what happened, why it matters, optional link
   to an existing `/logbook/` report or `/blog/` note — do not clone a climb report
8) Do not invent events, dates, or team names the user did not give
9) Never paste this template prose unchanged into a published post
-->

{{یک پاراگراف: این خبر چیست و چرا الان نوشته شده}}

{{جزئیات کوتاه — فقط واقعیت‌هایی که کاربر داده}}

<!-- optional: لینک به گزارش صعود یا یادداشت موجود -->
