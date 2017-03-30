---
layout: post
category: perl
tags: perl cpan
title: WebService::PivotalTracker::Simple ってモジュールをリリースした
---
{% include JB/setup %}

<blockquote class="twitter-tweet" data-lang="ja"><p lang="it" dir="ltr">WebService-PivotalTracker-Simple-0.01 by TSUCCHI <a href="https://t.co/AAB54HVgH8">https://t.co/AAB54HVgH8</a></p>&mdash; CPAN New Modules (@cpan_new) <a href="https://twitter.com/cpan_new/status/847441955785068544">2017年3月30日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

仕事ではアジャイル開発のチケット管理として[PivotalTracker](https://www.pivotaltracker.com/)を使っています。
PivotalTracker はなかなかよくできたツールで、WebUIも申し分ないですし、API もシンプルでわかりやすい REST API を持っていて、極端な話、シェルと curl でも十分やりたいことができそうな、そんな感じなのです。

とはいえ、ちょっと凝った、めんどくさい処理をやるときはシェルだと辛いので、なんらかのスクリプト言語使いたいですし、僕は Perl に慣れてるので、Perl の API Client 欲しいなぁ、と思っていたのですが、2014年ごろはそういうのなかったんですよね。。。

なので、書いてはちぴーでちょっと喋った。

+ [hachioji.pm #41に行ってきた](/perl/2014/06/21/hachiojipm)
+ [セッションの話 (p.14)](/slides/hachip/41/#/step-14)

最近またちょっと調べてみたら、[WebService::PivotalTracker](http://search.cpan.org/dist/WebService-PivotalTracker/) ってのが出てて、Author はすごい人たちだし、中の実装を見る限りしっかりしてそうなのだけど、雑に API 投げたいな、って時も Pivotal とコレの API ドキュメントを両方読まないとダメな上に、ドキュメントが全然足りてないので、これはだいぶ辛いな、と思ったりしました。

僕が書いたやつは、雑でめっちゃ薄いクライアントなので、Pivotal の API ドキュメントを読むだけで使える(ように作った)ので、まーこっちもそれなりに需要あるかもね、ちょっとわかる人は自前でなんとかしちゃうんだろうけど、と思いつつ、先ほど publish しました。

よろしければご利用ください。

+ [WebService::PivotalTracker::Simple](http://search.cpan.org/dist/WebService-PivotalTracker-Simple/)
