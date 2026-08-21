---
layout: default
title: یادداشت‌های فنی
description: "یادداشت‌های فنی کاوه‌ رضائی‌شیراز: برنامه‌نویسی، لینوکس، مانیتورینگ و ابزارها."
permalink: /tech/
lang: fa-IR
dir_attr: rtl
---

<h1>یادداشت‌های فنی</h1>
<p>آموزش‌ها و یادداشت‌هایی که هنگام کار با ابزار و زیرساخت نوشته‌ام.</p>
{% include hub-filter.html toolname="filter_technical_notes" tooldescription="Filter technical notes listed on this page by title or summary text." %}
<ul data-hub-list>
  {% assign technical = site.blog | where: "note_kind", "technical" | sort: "date" | reverse %}
  {% for post in technical %}
  <li style="margin-bottom: 15px; list-style: none; border-bottom: 1px solid #eee; padding-bottom: 10px;">
    <a href="{{ post.url }}" style="font-size: 1.2rem; font-weight: bold; text-decoration: none;">{{ post.title }}</a>
    {% if post.date %}
    <p class="meta" style="margin: 4px 0 0; color: #777; font-size: 0.9rem;">
      <time datetime="{{ post.date | date_to_xmlschema }}">{% include jalali-date.html date=post.date %}</time>
    </p>
    {% endif %}
    {% if post.description %}
    <p style="margin: 5px 0 0; color: #555; font-size: 0.95rem;">{{ post.description }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
