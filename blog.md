---
layout: default
title: وبلاگ
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