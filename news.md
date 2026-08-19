---
layout: default
title: اخبار
description: "اخبار کوتاه کاوه‌ رضائی‌شیراز درباره برنامه‌های کوهنوردی، انتشار گزارش صعود و یادداشت‌ها."
permalink: /news/
lang: fa-IR
dir_attr: rtl
---

<h1>اخبار</h1>
<p>اینجا خبرهای کوتاه را می‌نویسم: اعلام برنامه، انتشار گزارش صعود، یا نکته‌ای که یادداشت فنی نیست.</p>
{% assign news_posts = site.blog | where_exp: "post", "post.kind == 'news'" | sort: "date" | reverse %}
{% if news_posts.size == 0 %}
<p>هنوز خبری در این بخش منتشر نشده است.</p>
{% else %}
{% include hub-filter.html toolname="filter_news" tooldescription="Filter the published news items listed on this page by title or summary text." %}
<ul data-hub-list>
  {% for post in news_posts %}
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
{% endif %}
