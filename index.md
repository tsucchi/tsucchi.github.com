---
layout: page
title: 最近の記事
---
{% include JB/setup %}

{% for post in site.posts limit 20 %}


<h1>{{ post.date | date: "%Y-%m-%d"  }} <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h1>

{% unless post.tags == empty %}
<div class="pull-right">
{% assign tags_list = post.tags %}
{% include JB/tags_list %}
</div>
<br>
{% endunless %}  

{{ post.content }}

---

{% endfor %}

