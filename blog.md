---
layout: default
title: یادداشت‌ها
description: "یادداشت‌ها و آموزش‌های فنی کاوه‌ رضایی‌شیراز درباره برنامه‌نویسی، مانیتورینگ و ابزارهای لینوکس."
permalink: /blog/
lang: fa-IR
dir_attr: rtl
---

<h1>یادداشت‌ها</h1>
<ul>
  {% for post in site.blog reversed %}
  <li style="margin-bottom: 15px; list-style: none; border-bottom: 1px solid #eee; padding-bottom: 10px;">
    <a href="{{ post.url }}" style="font-size: 1.2rem; font-weight: bold; text-decoration: none;">{{ post.title }}</a>
    {% if post.date %}
    <p class="meta" style="margin: 4px 0 0; color: #777; font-size: 0.9rem;">
      <time datetime="{{ post.date | date_to_xmlschema }}">{% include jalali-date.html date=post.date %}</time>
    </p>
    {% endif %}
    {% if post.description %}
    <p style="margin: 5px 0 0; color: #555; font-size: 0.95rem;">{{ post.description }}</p>
    {% elsif post.excerpt %}
    <p style="margin: 5px 0 0; color: #555; font-size: 0.95rem;">{{ post.excerpt | strip_html | truncatewords: 22 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
