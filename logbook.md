---
layout: default
title: گزارش صعود
permalink: /logbook/
---

<h1>گزارش صعود</h1>
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