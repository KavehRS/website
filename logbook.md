---
layout: default
title: گزارش صعود
description: >-
  آرشیو گزارش‌های واقعی صعود کوهنوردی، سنگ‌نوردی، دیواره‌نوردی و صعود زمستانه
  در البرز؛ از مسیر و شرایط هوا تا تجهیزات، تیم و تجربهٔ اجرا.
permalink: /logbook/
lang: fa-IR
dir_attr: rtl
---

{% assign discipline_order = site.data.logbook_disciplines.order %}
{% assign discipline_labels = site.data.logbook_disciplines.labels %}

<h1>گزارش صعود</h1>
<p>اینجا روایت صعودهای اجراشده جمع شده است: قله‌های مرتفع، تیغه‌ها، کمپ‌های آموزشی برفچال و برنامه‌های زمستانه. هر گزارش مسیر، هوا، تجهیزات و جزئیات اجرا را برای کوهنوردانی می‌نویسد که پیش از برنامه به منبع دقیق نیاز دارند.</p>

{% for disc in discipline_order %}
  {% assign has_posts = false %}
  {% for post in site.logbook reversed %}
    {% assign post_cats = post.categories | default: post.disciplines %}
    {% if post_cats contains disc %}
      {% assign has_posts = true %}
    {% endif %}
  {% endfor %}
  {% if has_posts %}
<section style="margin: 2rem 0 2.5rem;" aria-labelledby="disc-{{ disc }}">
  <h2 id="disc-{{ disc }}" style="font-size: 1.25rem; margin-bottom: 0.75rem;">{{ discipline_labels[disc] }}</h2>
  <ul>
    {% for post in site.logbook reversed %}
      {% assign post_cats = post.categories | default: post.disciplines %}
      {% if post_cats contains disc %}
      <li style="margin-bottom: 12px; list-style: none; border-bottom: 1px solid #eee; padding-bottom: 8px;">
        <a href="{{ post.url }}" style="font-size: 1.1rem; font-weight: bold; text-decoration: none;">{{ post.title }}</a>
        {% if post.excerpt %}
        <p style="margin: 4px 0 0; color: #555; font-size: 0.95rem;">{{ post.excerpt | strip_html | truncatewords: 18 }}</p>
        {% endif %}
      </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
  {% endif %}
{% endfor %}

{% assign uncategorized = false %}
{% for post in site.logbook %}
  {% assign post_cats = post.categories | default: post.disciplines %}
  {% assign known = false %}
  {% for disc in discipline_order %}
    {% if post_cats contains disc %}
      {% assign known = true %}
    {% endif %}
  {% endfor %}
  {% if known == false %}
    {% assign uncategorized = true %}
  {% endif %}
{% endfor %}

{% if uncategorized %}
<section style="margin: 2rem 0;" aria-labelledby="disc-other">
  <h2 id="disc-other" style="font-size: 1.25rem;">سایر گزارش‌ها</h2>
  <ul>
    {% for post in site.logbook reversed %}
      {% assign post_cats = post.categories | default: post.disciplines %}
      {% assign known = false %}
      {% for disc in discipline_order %}
        {% if post_cats contains disc %}
          {% assign known = true %}
        {% endif %}
      {% endfor %}
      {% if known == false %}
      <li style="margin-bottom: 12px; list-style: none; border-bottom: 1px solid #eee; padding-bottom: 8px;">
        <a href="{{ post.url }}" style="font-size: 1.1rem; font-weight: bold; text-decoration: none;">{{ post.title }}</a>
      </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
{% endif %}
