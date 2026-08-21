---
layout: default
title: یادداشت‌های شخصی
description: "یادداشت‌های شخصی کاوه‌ رضائی‌شیراز؛ روایت‌ها و تجربه‌های غیر فنی."
permalink: /notes/
lang: fa-IR
dir_attr: rtl
---

<h1>یادداشت‌های شخصی</h1>
<p>اینجا چیزهایی را می‌نویسم که گزارش فنی یا آموزش ابزار نیستند.</p>
{% include hub-filter.html toolname="filter_personal_notes" tooldescription="Filter personal notes listed on this page by title or summary text." %}
<ul data-hub-list>
  {% assign personal = site.blog | where: "note_kind", "personal" | sort: "date" | reverse %}
  {% for post in personal %}
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
