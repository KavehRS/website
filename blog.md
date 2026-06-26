---
layout: default
title: یادداشت‌ها
permalink: /blog/
---

<h1>یادداشت‌ها</h1>
<ul>
  {% for post in site.blog %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>