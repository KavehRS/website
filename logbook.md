---
layout: default
title: گزارش برنامه صعود کوهنوردی، سنگ‌نوردی و یخ‌نوردی
description: "آرشیو گزارش برنامه‌های صعود به تفکیک کمپ آموزشی، برفچال، یخچال، آبشار یخی، صعود زمستانه، کوهنوردی مرتفع، کوهپیمایی، سنگ‌نوردی و دیواره‌نوردی."
permalink: /logbook/
lang: fa-IR
dir_attr: rtl
---

{% assign discipline_order = site.data.logbook_disciplines.order %}
{% assign discipline_labels = site.data.logbook_disciplines.labels %}

<h1>گزارش برنامه صعود</h1>
<p>گزارش‌ها بر اساس نوع برنامه تفکیک شده‌اند: کمپ آموزشی، برفچال، یخچال، آبشار یخی، صعود زمستانه، کوهنوردی مرتفع (بالای ۴۰۰۰ متر)، کوهپیمایی، سنگ‌نوردی و دیواره‌نوردی.</p>


{% for disc in discipline_order %}
  {% assign disc_posts = '' | split: '' %}
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
