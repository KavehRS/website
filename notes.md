---
layout: default
title: یادداشت‌ها
description: "یادداشت‌های شخصی و گزارش‌های صعود کاوه‌ رضائی‌شیراز در یک فهرست."
permalink: /notes/
lang: fa-IR
dir_attr: rtl
---

<h1>یادداشت‌ها</h1>
<p>یادداشت‌های شخصی و گزارش‌های صعود اینجا در یک فهرست هستند.</p>
{% include hub-filter.html toolname="filter_notes" tooldescription="Filter notes and climb reports listed on this page by title or summary text." %}
<ul data-hub-list>
  {% assign notes = site.blog | where_exp: "post", "post.layout != 'redirect'" | sort: "date" | reverse %}
  {% for post in notes %}
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
