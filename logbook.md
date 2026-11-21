---
layout: default
title: گزارش صعود
description: >-
  آرشیو گزارش‌های واقعی صعود کوهنوردی، کوهنوردی فنی، ارتفاع بالا و صعود زمستانه
  در البرز؛ از مسیر و شرایط هوا تا تجهیزات، تیم و تجربهٔ اجرا.
permalink: /logbook/
lang: fa-IR
dir_attr: rtl
---

<h1>گزارش صعود</h1>
<p>آرشیو گزارش برنامه‌های اجراشده اینجاست: قله‌های مرتفع، تیغه‌ها، کمپ‌های آموزشی برفچال و برنامه‌های زمستانه. هر گزارش مسیر، هوا، تجهیزات و جزئیات همان اجرا را می‌نویسد. معرفی این دفتر را در <a href="{{ '/' | relative_url }}">خانه</a> بخوانید.</p>
{% include hub-filter.html toolname="filter_ascent_reports" tooldescription="Filter the published mountaineering ascent reports listed on this page by title or summary text." %}
<ul data-hub-list>
  {% assign reports = site.logbook | where_exp: "post", "post.layout != 'redirect'" | sort: "date" | reverse %}
  {% for post in reports %}
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
