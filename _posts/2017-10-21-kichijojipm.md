---
layout: post
category: perl
tags: perl kichijojipm
title: 吉祥寺.pm12 で発表してきました
---
{% include JB/setup %}

[吉祥寺.pm12](https://kichijojipm.connpass.com/event/64456/) に行ってきました。

## 自分の発表について

[以前予告した通り](http://tsucchi.github.io/perl/2017/09/14/kichijoji-pm-yokoku)、ジョブキューの移行の話をしました。

発表資料はこちら(スペースか矢印キーで移動できます)

+ [今までの(名状しがたい)ジョブキュー(のようなもの)と、これからのジョブキュー](http://tsucchi.github.io/slides/kichijojipm/12/index.html#/title)

ざっくり見たい場合は、原稿(スライドを生成する元ネタ)の Markdown のほうが見やすいかもしれません。

+ [markdown の方](https://github.com/tsucchi/tsucchi.github.com/blob/master/slides/kichijojipm/12/index.md)

## 発表してみて、あと資料の補足

発表後 [@charsbar](https://twitter.com/charsbar) さんに言われてハッとしたのだけど、Gearman と Schwartz を併用するのが悪いわけではありません。適材適所というものがあり、それに応じて使い分けるのは重要です。

今回の例で言えば、[veryblue](https://twitter.com/veryblue0416) さんがやっているような、自作Webアクセスログの受付なんかは Gearman でやるのに適任でしょう(速度がある程度求められ、時間指定が必要なく、多少データロストがあっても許される)。

僕のところの場合、データロストが許されない(ので、Gearman のやつは DB を併用していた。これは話さなかったけど)、時間指定もやりたい、なのに Gearman を使っていることが問題で、これは当時の技術選定のミスだと思います。あと、Gearman と Schwartz を行ったり来たりするのは意味がわからない。まじ辛かった。(とは言え、発表の時にも言ったけど、歴史的経緯で変なことになるのは仕方がない。直すのが大事)

ウチの場合は資料にも書いた通り、Schwartz 的な「時間指定ができる、DBバックエンド」の普通のジョブキューがあればよかったのです。

## 発表してみて。「世界はジョブキューをそんなに必要としていない」という話

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">やっぱり話してみたからこそ分かることってあるなぁ、と思っていて、今回すごく思ったのは「世界はそんなにジョブキューを必要としていないし、みんなジョブキューのことはあんまり知らない」</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/921417871409811456?ref_src=twsrc%5Etfw">2017年10月20日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

懇親会とかで話してみて思ったのけど、使っている人は当たり前にジョブキューを使っているけど、使ってない人はイマイチ、どう使うのかイメージできないみたいでした。そう言えば前職はジョブキュー入れてなかったもんなぁ。

ジョブキューを無理に使う必要は全然なくて、小規模で負荷の小さいなシステムならジョブキュー使わないほうが幸せだと思います。(ジョブキューのワーカーの監視が必要になったりするので、シンプルで済むならそのほうが管理は楽だから)

とは言え、どういう時に使うと嬉しいか、もう少しイメージできると良いかな、と思ったので、こんな例を考えてみましたがどうでしょう。

### ジョブキューを使う場合の例

まず、話を単純にするために、1プロセスだけで動くアプリケーションがあるとします。で、クライアントからは10秒に1回程度の頻度でアクセスがあるとします。アプリケーションは1秒程度で処理ができるとします。

この場合は、(とても運が悪いと詰まって1,2秒待つかもしれませんが)ジョブキューは一切必要ありません。

で、ここにメールを1000通送るボタンをつけたとします。メール1000通なので、1分かかるとしましょうか。

こうなると、メールを送ってる間は、他のアクセスは1分待たされることになります。普段1秒で終わるものが1分待たされる(しかも他人のせいで)というのは、許容できないでしょう。

こういう場合、メール送信処理をジョブキューに回します。ジョブキューのワーカーでメールを送るようにして、アプリケーションはジョブキューへの登録が済んだらすぐに処理を終わらせます。すると、他と同様、1分かかっていた処理は1秒程度で返せるようになるでしょう。(代わりにジョブキューのワーカーが1分間処理することになる)

メールを10万通送りたい場合も、受付だけなので、すぐにレスポンスを返せます。

ただ、こうなると今度はワーカーが大変です。(10万通はさすがにめっちゃ時間がかかる)。こういう場合は、メールを送るサイズを1ワーカーあたり1000通とかに分割して並列で送ったりします。1サーバで処理しきれなければ、ワーカーが動くサーバを増やすことでスケールアップも可能になったりします。これがジョブキューを使うメリットです。

以上、ジョブキューを使うと良いかもしれない例でした。

## 感想

だいたい書いてた。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">吉祥寺.pm 今回のセミのディープラーニングとか、以前の Excel のとか、他ではあまり聞けないすごいのが出てきてとても面白い</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/921415801952800768?ref_src=twsrc%5Etfw">2017年10月20日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">すごい人が普通に話してたり、すごい人が普通に話さずに聴講者だったりする一方で、とても話しやすくて、初めて発表する人も沢山いるっていうのは、とてもいい空間だと思う</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/921416162230935552?ref_src=twsrc%5Etfw">2017年10月20日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

と、いうわけで、blog を書くまでが 吉祥寺.pm (?) ですので、僕の 吉祥寺.pm はこれにておしまいです。主催の[magnoliak](https://twitter.com/magnolia_k_)さん、お疲れ様でした。とても楽しかった。


