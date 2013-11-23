---
layout: post
category: programming
tags: programming 雑談
title: get_ メソッドを使いたい病
---
{% include JB/setup %}
メソッドとか変数の名前って、いつも結構悩みますよね？

んで、最近 get_ みたいなメソッド名使いたいなーって思う事があるんですよ。

fetch でも search でも retrieve でもない、「いや、ちょっと引くだけだから get_ で良くね？」って思うんですよね。

正直なところ、 get も set も本来だったら使ってもいいんじゃないかな、と思うんですよ。でも、Java とかがアクセッサメソッドの規約みたいな感じで
get/set を使うようにしちゃったせいで、それ以外の局面で get/set を使うと、「なんか違くね？」みたいな感じになったりするんですよね。

と、いう話を某チャットでしていたら、「bring がいいっすよ」みたいな指摘を頂いたので、ここに共有しときます。「get_ 使いたい病」を発症した際は、
「bring」の使用を検討してみると、もしかしたら幸せになれるかもしれません。

### 追記
そんむーさんは、retrieve 使ってるとのこと。

<blockquote class="twitter-tweet" lang="ja"><p>なんかそういう場合、僕はretrieve使ってますね / “get_ メソッドを使いたい病 - tsucchi の日記 2nd season” <a href="http://t.co/dNi7y9Fk6x">http://t.co/dNi7y9Fk6x</a></p>&mdash; songmu (@songmu) <a href="https://twitter.com/songmu/statuses/403936148348600320">2013, 11月 22</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

語彙が増えると分かりやすいコード書けるので日々研鑽ですね。
