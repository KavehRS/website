---
layout: default
title: گزارش صعود
permalink: /logbook/
---

<h1>گزارش صعود</h1>
<ul>
  {% for post in site.logbook %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span>{{ post.date | persian_date: "%Y/%m/%d" }}</span>
    </li>
  {% endfor %}
</ul>