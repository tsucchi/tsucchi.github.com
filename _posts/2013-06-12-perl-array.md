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
tsucchi@immature[522]$ perl ../a.pl
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
