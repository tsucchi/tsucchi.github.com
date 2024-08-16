---
layout: page
title: 最近の記事
---
{% include JB/setup %}

{% for post in site.posts limit :10 %}


<h1>{{ post.date | date: "%Y-%m-%d"  }} <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h1>

{% unless post.tags == empty %}
<div class="pull-right">
{% assign tags_list = post.tags %}
{% include JB/tags_list %}
</div>
<br>
{% endunless %}  

{{ post.content }}

<hr>
<div class="fb-like" data-href="http://tsucchi.github.io{{ post.url }}" data-send="true" data-width="450" data-show-faces="true"></div>
<br>
<div class="twitter-button">
  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-text="{{ post.title }} - {{ site.title }}" data-url="{{ site.production_url }}{{ post.url }}" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

{% endfor %}

