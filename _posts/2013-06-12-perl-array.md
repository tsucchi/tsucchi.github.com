---
layout: post
category: perl
tags: perl
title: コンパイルエラーになると思ってた
---
{% include JB/setup %}
今日、ちょっとだけビックリしたことメモ。

こんな感じ(↓)の物体を書いてたんだけど、

```perl
#!/usr/bin/perl
use strict;
use warnings;
use feature qw(say);

my @aaa = '';

push @aaa, 'something1';
push @aaa, 'something2';
say join ',', @aaa;
```

これ、出力どうなると思います？ってか、そもそもコンパイル通るとおもいます？

結果

```
tsucchi@immature[522]$ perl a.pl
,something1,something2
```

なんとびっくり(あれ？頭にカンマついてるぞ、なんだこれ？)

```
my @aaa = '';
```

が

```
my @aaa = ('');
```

として解釈されてるっぽいんですよね。Deparse かけると、

```
my(@aaa) = '';
```

となっていた。うーん、良く分からん。

まああんま気にしなくてもいいのかもしれないけど、@aaa 相当の物体は、元々 scalar で、「あれ？やっぱ配列じゃね？」と思って書き換えたら、こんな感じでミスったのでした。気をつけよう。。。

### 追記
- [gfxさん](http://b.hatena.ne.jp/gfx/20130612#bookmark-150075722)より、

```
スカラ値をリストコンテキストで評価すると要素一つのリストになるので、@a = ('') と解釈されるんですよ。
```

むー、そういうことか。やっぱ罠だなー。。。

### 追記2

- [toku_bassさん](https://twitter.com/toku_bass/status/344835407931920384)より、

<blockquote class="twitter-tweet" lang="ja"><p>@<a href="https://twitter.com/tsucchi">tsucchi</a> これってreturn undef;せずにreturnだけ書けってのと同じやつですね。</p>&mdash; toku_bassさん (@toku_bass) <a href="https://twitter.com/toku_bass/status/344835407931920384">2013年6月12日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ですね。戻り値の時は意識してたけど、代入の時は考慮してなかった。。。
