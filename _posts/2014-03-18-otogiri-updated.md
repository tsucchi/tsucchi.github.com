---
layout: post
category: perl
tags: perl db orm Otogiri
title: Otogiri-0.09 がリリースされました
---
{% include JB/setup %}

表記のものをリリースしました。

+ [Otorigi-0.09](http://search.cpan.org/~tsucchi/Otogiri-0.09/)

ポスグレ使っている人以外は全然関係ないのですが、PostgreSQL って last_insert_id を取得する際に、
シーケンスの名前を指定しないと取れないんですよ。

で、一方で、MySQL の LAST_INSERT_ID() みたいな振る舞いをする、LASTVAL() って関数もあります。
なので、これ使って便利にしたいなー、と思って改修してみました。


[前回書いたように](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri/)、最近 Otogiri + REPL の環境で DB を触っているのですが、

```perl
$db->last_insert_id(undef, undef, undef, { sequence => 'some_table_id_seq' });
```

とか書かないと SERIAL の ID が取れなくて、めっちゃダルかったのが、

```perl
$db->last_insert_id();
```

と一発で取れるようになって、大変カジュアルで便利だなー、と思う次第です。

もちろん、シーケンス名を指定した場合も従来通り普通にとれます。
