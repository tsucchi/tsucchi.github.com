---
layout: post
category: perl
tags: perl cpan
title: 僕はもうちょっと Module::Install を使った方が良いのではないかと考えている、というお話
---
{% include JB/setup %}

最近ちょっと話題だった、[CPANモジュールのパッケージングの歴史](http://www.songmu.jp/riji/archives/2013/02/cpan.html) とか、あと twitter とか blog とか色々見てて思ったこと。

「Module::Install って、Plugin があるのがいいとこなんだけど、どのプラグインでどの関数が使えるのか分かんなくてハマるよね」、とか、「他にも罠多いし、その辺考えると、最近だと Module::Build 使った方が良くね？」ってのは、多分正論なんだけど、僕はちょっと違うんでないかな、と思っているという話。

Module::Install の長所は、「プラグイン」と「DSL」と言われることが多いのですが、僕は一番の利点は、「M::I 本体をインストールしなくても対象のモジュールをインストールできること」だと思います。この長所はコアモジュールである ExtUtils::MakeMaker と同じなのですが、EU::MM よりは分かりやすく、書きやすいので、僕は M::I を使っています。

あ、だから僕が考える M::I の長所は「コレ単体でインストールできること」と「DSL」かな。

inc に依存モジュール(test_requires に入れるようなやつ)を突っ込むことも出来ますが、僕はこの使い方は良くないと思っていて、inc に入れるのは M::I 本体と Makefile の生成に必要なプラグインだけにしとくべきだし、実際そうしています。

んで、Module::Build です。ぶっちゃけ僕は使って無いのであんま分かって無いのですが、M::B の一番のデメリットは、「Perl 5.8ではコアモジュールではないこと」(5.10 から標準)だと思います。つまり、5.8 以前だと、「コレ単体でインストール」できません。M::B を使ってるモジュールをインストールする場合は、M::B 本体をインストールする必要があるわけです。

で、世の中には、 CPAN にダイレクトで繋がらない不幸なネットワークも結構存在します。そういうときは、CPAN 繋がる場所から local::lib に入れたり carton 使って入れたり、CPAN から tar 拾って手で入れたりします。

で、5.8環境でモジュールを手で入れるときに、Module::Build 使ってるモジュールを入れようとして、ハマりました。。。

Module::Build 自体の依存モジュールが結構多いんですよね。。。Module::Install も依存モジュール多いのですが、M::I は inc に入れることができるから気にならない。でも M::B はコレ自体をインストールしないと使えない。「一体いくつモジュール入れればいいんだよー」って感じで、泣きそうになりました。入れたいモジュール自体は依存モジュール 2,3 個だったんだけどなー。。。

と、いうわけで、Perl 5.8 がオワコンになるまでは、Module::Install 使った方がいいのではないか、と考えてる次第です。まあ WAF とか ORM とか依存モジュールが多いやつは、Module::Build 含めて好きなものを使えばいいんじゃない、と思うけど。

Perl 5.6 はオワコンですが、同じように 5.8 がオワコンと言えるようになるのはいつですかねー。。。個人的には CentOS 5系が EOL になればいいかな、と思っていますが。


あと、この辺の話、twitter でつぶやいたのだけど反響なさすぎて悲しかった。

<blockquote class="twitter-tweet" lang="ja"><p>僕は「もうちょい M::I でいいんじゃね？」派なんだけど、少数派みたいだな。</p>&mdash; tsucchiさん (@tsucchi) <a href="https://twitter.com/tsucchi/status/301543697076600832">2013年2月13日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="ja"><p>cpan 使えない環境の 5.8 で M::B 使ってるモジュールインストールしようとして、つらい目にあったのがそのおもな理由</p>&mdash; tsucchiさん (@tsucchi) <a href="https://twitter.com/tsucchi/status/301543972675919872">2013年2月13日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="ja"><p>なので、依存関係がクソおおいモジュールはべつにどうでも良いけど、そうじゃない場合は、5.8 死ぬまで M::I のほうが良くね？と思っております。5.8 がいつになったら死んだとみなすか、ってのが難しい問題ではありますが。Cent OS 5系が居なくなったら、かな。</p>&mdash; tsucchiさん (@tsucchi) <a href="https://twitter.com/tsucchi/status/301544622373613569">2013年2月13日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

長々書いたけど、だいたいこの 3ツイートと変わらないですねw
