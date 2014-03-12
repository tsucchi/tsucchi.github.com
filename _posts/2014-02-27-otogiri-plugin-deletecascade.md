---
layout: post
category: perl
tags: perl db orm Otogiri
title: Otogiri::Plugin::DeleteCascade ってのを書いてみた
---
{% include JB/setup %}

多分下記の続きみたいな話。

+ [Otogiri という ORM のご紹介 と Otogiri::Plugin](http://tsucchi.github.io/perl/2013/12/24/otogiri-and-plugin/)
+ [「SQL アンチパターン」を読んだ](http://tsucchi.github.io/sql/2013/04/21/sqlap/)

FK 貼っているテーブルにテストデータをぶっ込んだり、データを何度か入れ直しするのってめんどくさいですよね？

前職では、(Fixture ではなく、)ファクトリ使ってテストデータをぶっ込む仕組みを作っていたので、FK のあるテーブルの
データを入れるのは大変でした。(ゴミデータをちゃんと消さないと、外部キーの不整合でエラーになる)。今はモックでテストしてるので、
テストコードでは困ってませんが、普通にデータ入れ直しするときとか、やっぱメンドクサイんですよ。

で、「SQL で親から順番に消してくれる特殊構文とかあればいいのに」と思ったんですが、そういうの無いんですよね。。。(FK に CASCADE オプション
つければ出来るけどつけてないから出来ない)

なので、DB のメタデータを引っ張って、FK 検出して、親データを DELETE すると子のデータも一緒に消えるような物体を作ってみた。

+ [Otogiri::Plugin::DeleteCascade](https://github.com/tsucchi/p5-Otogiri-Plugin-DeleteCascade)

例によってSYNOPSIS 丸写しですが、こんな感じ。

```perl
use strict;
use warnings;
use Otogiri;
use Otogiri::Plugin;

Otogiri->load_plugin('DeleteCascade');

my $db = Otogiri->new( connect_info => $connect_info );
$db->insert('parent_table', { id => 123, value => 'aaa' });
$db->insert('child_table',  { parent_id => 123, value => 'bbb'}); # child.parent_id referes parent_table.id(FK)

$db->delete_cascade('parent_table', { id => 123 }); # both parent_table and child_table are deleted.
```

child_table.parent_id -> parent_table.id という FK があるとして、parent_table を消すと、一緒に child_table のデータも
消えてくれる君です。

DBIx::Inspector で FK の情報が引っ張っているので、対応してる DBMS(MySQL, PostgreSQL, SQLiteあたり)なら動くと思います。

アプリで使うってよりも、開発環境でちょっとデータメンテしたい、とかテストデータのロードする前にクリーンアップしたい、とかそういう
用途を想定してる感じです。(というか、多分この物体はアプリで使ってはいけない)

<del>気が向いたら CPAN にアップするかもです。</del>

### 2014-03-12 追記
気が向いたので、CPAN にアップしました。

+ [Otogiri::Plugin::DeleteCascade - Otogiri Plugin for cascading delete by following FK columns](https://metacpan.org/release/Otogiri-Plugin-DeleteCascade)



