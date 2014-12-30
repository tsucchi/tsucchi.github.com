---
layout: post
category: perl
tags: perl db PerlBeginners
title: Perl Beginners &#35;16 で DB の自動再接続の話をしました
---
{% include JB/setup %}
当日に LT 枠が余っていたっぽいので、急遽スライドを仕立てて、最近気になっていた ORM やウェブアプリで DB の自動再接続を
する際の注意点について話しました。

スライドはこちら(↓)

+ [DBの自動再接続の話](http://tsucchi.github.io/slides/pb/2014-12-22-auto_reconnect/)

全然ビギナー向けっぽくなくて、ちょっと申し訳ない感じではありますが、スライドにも書いたのですが、この情報を見つつ、Teng の自動再接続周りの
コードを読むと何やってるか理解できて勉強になるんじゃないかな、と思います。

Otogiri の自動再接続対応は、遅くともお正月休み中、できれば年内にはやってしまいたいなー、と思っておりますので、乞うご期待！

### 2014-12-30 追記
この記事を書いた後、このへんに造詣の深い [@nihen](https://twitter.com/nihen) さんから tweet もらいました

<blockquote class="twitter-tweet" lang="ja"><p>自動再接続の話だとあとは DBIx::Connector をみるとよいとおもいます。see also: <a href="https://t.co/MoVr7bdi16">https://t.co/MoVr7bdi16</a> <a href="https://t.co/m8yceDnGCr">https://t.co/m8yceDnGCr</a> / “Perl Beginne…” <a href="http://t.co/1U6F7MVhvi">http://t.co/1U6F7MVhvi</a></p>&mdash; Masahiro Chiba (@nihen) <a href="https://twitter.com/nihen/status/547369141636575233">2014, 12月 23</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

と、いうわけで、[DBIx::Connector](http://search.cpan.org/dist/DBIx-Connector/) や Teng の issue なんかをいろいろ見てみました。

Teng は一時期は DBIx::Connector を参考にした fixup reconnect をサポートしていた(?ブランチだけ?)のだけど、そういうののハンドリングはアプリでやった方が良さそう、
ということで、今の実装(トランザクションの対応と fork/prefork の対応)になってるっぽい感じですね。

あと、[Otogiri の対応もとりあえずやった](https://github.com/tsucchi/p5-Otogiri-Plugin-AutoReconnect/tree/fork_and_transaction_support)。けれども、めっちゃ自信ないので、
しばらく様子をみて問題なさそうならマージするかなー、と思ってます。

