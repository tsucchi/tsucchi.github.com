---
layout: page
title: 最近の記事
---
{% include JB/setup %}

{% for post in site.posts limit :20 %}


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

<div class="fb-like" data-href="http://tsucchi.github.io{{ post.url }}" data-send="true" data-width="450" data-show-faces="true"></div><br>
<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://tsucchi.github.io{{ post.url }}" data-via="tsucchi" data-lang="ja">ツイート</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

{% endfor %}

