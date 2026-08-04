---
layout: default
title: گزارش برنامه صعود کوهنوردی، سنگ‌نوردی و یخ‌نوردی
description: "آرشیو گزارش برنامه‌های صعود کوهنوردی، سنگ‌نوردی و یخ‌نوردی؛ قلل البرز، مسیرها، شرایط هوا و جزئیات اجرای برنامه."
permalink: /logbook/
lang: fa-IR
dir_attr: rtl
---

<h1>گزارش برنامه صعود</h1>
<p>گزارش‌های صعود کوهنوردی، سنگ‌نوردی و یخ‌نوردی — از مشخصات قله و مسیر تا شرایط برنامه و تیم اجرا.</p>

<ul>
  {% for post in site.logbook reversed %}
    <li style="margin-bottom: 15px; list-style: none; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <a href="{{ post.url }}" style="font-size: 1.2rem; font-weight: bold; text-decoration: none;">
        {{ post.title }}
      </a>

      {% if post.excerpt %}
        <p style="margin: 5px 0 0 0; color: #555; font-size: 0.95rem;">
          {{ post.excerpt | strip_html | truncatewords: 20 }}
        </p>
      {% endif %}
    </li>
  {% endfor %}
</ul>