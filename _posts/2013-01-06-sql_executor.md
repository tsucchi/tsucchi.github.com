---
layout: post
category: cpan
tags: perl cpan db
title: SQL::Executor 0.14 をリリースしました。もしくは ORM とか関連モジュールはこれでいいんじゃね？という話。
---
{% include JB/setup %}

表記のとおり、[SQL::Executor 0.14](http://search.cpan.org/~tsucchi/SQL-Executor-0.14/lib/SQL/Executor.pm)をリリースしました。

今回、connect() という DBI っぽいコンストラクタを付けました。んで、connect 経由でインスタンス作ると、内部で[DBIx::Handler](http://search.cpan.org/dist/DBIx-Handler/)を生成して、コネクション管理をしてもらったり、コレを使ったトランザクション管理ができるようになります。

ちょい前に、[こんなん](https://github.com/tsucchi/p5-DBIx-Decorator)書いてみたりして、dbh をいい感じに拡張できたらいい感じになるんじゃね？と思ってたのですが、めんどい割には得るものが少なそうで、今現在、DBIx::Handler っていう良いものがあるんだから、そっち使った方が幸せかな、という結論に至りました。

まだ、コレ使ったコネクション/トランザクション管理への移行は済ませてないので、バグあるかもです。月曜以降ちょいちょい試してみたいと思います。

先走って試しちゃってバグ見つけたりしたら、cpan RT or github issue or @tsucchi あたりで連絡いただければ、と思います。
