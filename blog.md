---
layout: default
title: یادداشت‌ها
description: "یادداشت‌های کاوه‌ رضائی‌شیراز: کوهنوردی و یخ‌نوردی، به‌همراه آموزش‌های فنی برنامه‌نویسی، لینوکس و مانیتورینگ."
permalink: /blog/
lang: fa-IR
dir_attr: rtl
---

<nav class="crumbs" aria-label="مسیر صفحه" style="margin-bottom: 0.75rem;">
  <small><a href="{{ '/' | relative_url }}">خانه</a> · یادداشت‌ها</small>
</nav>

<h1>یادداشت‌ها</h1>
<p>اینجا هم روایت برگشت به کوهستان را می‌نویسم، هم آموزش‌هایی که هنگام کار ثبت کرده‌ام: برنامه‌نویسی، لینوکس و مانیتورینگ.</p>
{% include hub-filter.html toolname="filter_notes" tooldescription="Filter the published notes listed on this page by title or summary text." %}
<ul data-hub-list>
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
