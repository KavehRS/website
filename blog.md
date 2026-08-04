---
layout: default
title: یادداشت‌ها
description: یادداشت‌ها و آموزش‌های فنی کاوه‌ رضایی‌شیراز درباره برنامه‌نویسی، مانیتورینگ و ابزارهای نرم‌افزاری.
permalink: /blog/
---

<h1>یادداشت‌ها</h1>
<ul>
  {% for post in site.blog reversed %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>