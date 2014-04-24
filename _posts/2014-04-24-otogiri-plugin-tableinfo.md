---
layout: post
category: perl
tags: perl db orm Otogiri PostgreSQL
title: Otogiri::Plugin::TableInfo ってのを書いてみた
---
{% include JB/setup %}
ちょいちょいこの blog に書いてますが、最近 [Otogiri::Plugin::TableInfo](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo)っていう物体を
書きました。

こんな感じで使える物体です。

```perl
use Otogiri::Plugin::TableInfo;
my $db = Otogiri->new( connect_info => [ ... ] );
$db->load_plugin('TableInfo');
my @table_names = $db->show_tables(); # => DB 上にあるテーブル名一覧が返る
my @filtered_table_name = $db->show_tables(qr/^user/); # => 「user」で始まるテーブル名一覧が返る
my $create_table_ddl = $db->desc('user'); # => user テーブルの CREATE TABLE 文が返る

```

とまあ大体こんな感じになっています。

DBMS は PostgreSQL, MySQL, SQLite に対応しています。MySQL と SQLite は DBI というか、DBIx::Inspector から
CREATE TABLE 文が拾えるので割と楽なのですが、PostgreSQL はそういうの無いので、カラム情報や FK の情報などを組み合わせて
気合いで構築しています。(僕はお仕事で PostgreSQL を使っているので泣きながら実装したのです)

[ここが地獄の一丁目](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/blob/master/lib/Otogiri/Plugin/TableInfo/Pg.pm)です。
興味がある方は見てみると良いです。(見ないで済む生き方を選べるなら、きっとその方が幸せです)

最近いくつか紹介してる、Reply と組み合わせると便利シリーズの一環ですね。まーそこそこ便利だと思うので、興味がある方は使ってみると良いです。

+ [Otogiri::Plugin::TableInfo](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo)

「Otogiri 以外でも使ってみたい」って人がいたら、ここのコメントとか [@tsucchi](http://twitter.com/tsucchi) とか github issue とかに
リクエストしてもらえれば対応するかもしれないし、気が向いたら対応するかもです。
