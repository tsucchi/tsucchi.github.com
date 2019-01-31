---
layout: post
category: perl
tags: perl ミルキィホームズ
title: つながる、広がる、Acme モジュールの輪
---
{% include JB/setup %}

ちょっと面白かったので、メモがてらブログを書きます。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Acme::PriPara思い出深いモジュールの1つで， YAPC::Kansaiの時に伊丹から移動のバスのなかで, CodeHexさんにオブジェクト指向の事を聞きながら，これのロジックを使ってAcme::MadokaMagicaをリリースしたんだよなぁ...</p>&mdash; 八雲アナグラ (@AnaTofuZ) <a href="https://twitter.com/AnaTofuZ/status/1090616794488791043?ref_src=twsrc%5Etfw">2019年1月30日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">そしてAcme::PriParaはAcme::MilkyHolmesを参考に作られています。誰かの思い出に残ることができて嬉しい。 <a href="https://t.co/uV6L5AxNLJ">https://t.co/uV6L5AxNLJ</a></p>&mdash; たかはし (@htk291) <a href="https://twitter.com/htk291/status/1090618145948102656?ref_src=twsrc%5Etfw">2019年1月30日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">つながる Acme モジュールの輪w (こんなことになってたの知らなかった Acme::MilkyHolmes の作者)</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1090620707568926720?ref_src=twsrc%5Etfw">2019年1月30日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

たかはしさんが、拙作の[Acme::MilkyHolmes](https://metacpan.org/pod/Acme::MilkyHolmes)を参考にワイワイやっていたのは知っていたけど、その続きがあったのは知らなかったw てか、今調べたら、[Acme::HidamariSketch](https://metacpan.org/pod/Acme::HidamariSketch) でも言及されてたw

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr">Acme::MilkyHolmes は割と実装は独自なんですけど、もちろん Acme::PrettyCure とか Acme::MorningMusume とかの影響を受けているわけであります</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1090621019168038918?ref_src=twsrc%5Etfw">2019年1月30日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この tweet した時は忘れてたけど、Acme::MomoiroClover とかも。

で、この類のAcme モジュール作ってみるの、めっちゃ良いと思っていて、

- クラスビルダーを使ったり、ちゃんとしたオブジェクト使う文法を覚えられる
- 機能の作り込み次第だけど、クラス以外の基本的な文法もだいたい使える
- サイズ感的にちょうど良く、実装上難しい場所がない

といった感じで、モジュール作る練習台としてはとても良い課題だと思っています。あと、当たり前のことですが、自分の推しをコンピューター上で動かすことができるのは最高の体験です。それに、僕のような一般人でも「巨人の肩に乗る」体験だけでなく、巨人として乗られる(?)事までできると言うのは、なかなか得難いことで、面白かったしとても良い気分になりました。

と、言うわけで、皆さんも自分の推しを Acme モジュールとして表現してみませんか？ではでは。

