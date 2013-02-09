---
layout: post
category: perl
tags: perl test
title: Test::Mock::ExternalCommand を CPAN に ship しました
---
{% include JB/setup %}
ちょっと前の話なのですが、[Test::Mock::ExternalCommand](http://search.cpan.org/dist/Test-Mock-ExternalCommand/)というモジュールを CPAN に ship しました。

外部コマンドを置き換えるモジュールです。記事は前にも書いてたな。

- [Test::Mock::ExternalCommand というモジュールを書いてみた](http://d.hatena.ne.jp/tsucchi1022/20100822/1282489706)

このモジュール、まあまあ便利に使ってたのですが、最近は Nagios プラグイン書いていなかったのと、バッククォート文字列で変数展開するために、[Variable::Expand::AnyLevel](http://search.cpan.org/dist/Variable-Expand-AnyLevel/) というモジュールを書いて、それを使ってるのですが、こいつがだいぶマジカルで(単なる PadWalker のラッパーといえばそれまでなんだけど)、「これ CPAN に上げるの微妙だなー」と思って放置していました。

そしたら、ちょい前に [@y_uuki_ ](https://twitter.com/y_uuki_)さんから、
<blockquote class="twitter-tweet" lang="ja"><p>@<a href="https://twitter.com/tsucchi">tsucchi</a> こんにちはこんにちは。突然で失礼なのですが，Test::Mock::ExternalCommandってCPANにアップするご予定ありますか？外部コマンドをいい感じにスタブできるものが他になくてぜひ使わせていただきたいと思っています。</p>&mdash; ゆううきさん (@y_uuki_) <a href="https://twitter.com/y_uuki_/status/295430104102866946">2013年1月27日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

と言われまして、今回 CPAN に上げた次第です。

なお、バッククォート文字列でのコマンド実行を置き換えるために、readpipe という関数をオーバーライドしてるのですが、これが可能なのが Perl 5.10 以降なので割と新しい Perl 使ってくださいな。
