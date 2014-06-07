---
layout: post
category: perl
tags: perl
title: 五反田 Perl に参加してきました
---
{% include JB/setup %}

表記のイベントに参加してきましたよ、ということで。

五反田 Perl というのは、いわゆる「もくもく会」というやつ(らしい僕も初参加だった)で、特に何をする、というわけでもなく、
参加者が黙々と作りたいものを作ったり、やりたい勉強をする会、らしいです。

まー、もくもくすぎて

<blockquote class="twitter-tweet" lang="ja"><p>会場入りしました。めっちゃもくもくしてる。 <a href="https://twitter.com/search?q=%23%E4%BA%94%E5%8F%8D%E7%94%B0Perl&amp;src=hash">#五反田Perl</a></p>&mdash; かるぱねるら (@karupanerura) <a href="https://twitter.com/karupanerura/statuses/475145989276172288">2014, 6月 7</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="ja"><p>声出したら負けなのかな。</p>&mdash; かるぱねるら (@karupanerura) <a href="https://twitter.com/karupanerura/statuses/475146167701868544">2014, 6月 7</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

と、途中からきたかるぱねるらさんが思う位だったのですがw

僕は何をしていたかというと、

+ [Acme::MilkyHolmes のリリース](http://tsucchi.github.io/perl/2014/06/07/acme-milkyholmes-released/)
    + コードはいじっていなくて、どちらかというとリリース前の確認と、リンク先のこの記事を書くっていう作業をしてた
+ Otogiri::Plugin::DeleteCascade を最新の Otogiri に依存する形式に
+ Otogiri::Plugin のドキュメント整理
    + 前から「プラグインの書き方とか書いた方がいいよねー」と思って放置していたのだけど、それをようやくやった感じ
	+ で、この対応してたら travis がコケたので、その問題(DBD::SQLite の依存が抜けてた)を直したりとか

あとはこの blog とかプレゼンツールの見直しをしたいと思ってて、ちょっと調べてたんだけど、それは成果が出なかった感じ。

Acme::MilkyHolmes も Otogiri 関連も、いつかやらなきゃいけないと思いつつ、普段の業務には直接関係しないから
なかなか時間が取れなくて先延ばしになっていたタスクだったので、ここでちゃんと消化できたのは本当に良かったと思う。

その後の飲み会はミルキィホームズとかの話をしてた。

つーことで、楽しかったし、やらなきゃ行けないけどちょっと放置ぎみだったタスクが片付いてだいぶ気分が良くなったので、
また次回も参加できたらいいなぁ、と思いますです。
