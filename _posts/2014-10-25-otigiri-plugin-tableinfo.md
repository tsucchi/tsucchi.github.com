---
layout: post
category: perl
tags: perl Otogiri orm
title: Otogiri::Plugin::TableInfo 0.02 をリリースしました
---
{% include JB/setup %}

気がつけば一ヶ月以上更新してなかった。お久しぶりです。

表記の通り、Otogiri::Plugin::TableInfo 0.02 をリリースしました。
Otogiri::Plugin::TableInfo というのは、[このへん](http://tsucchi.github.io/perl/2014/04/24/otogiri-plugin-tableinfo/)に細かい話を書いておりますが、
MySQL でいうところの、`show tables` とか `show create table` っぽいデータ(つまりテーブルの一覧と、テーブル定義)を見れる感じの物体です。

今回のリリースでは、`show_create_view`というメソッドを足しています。名前の通り、View の定義が見れる感じになっております。

[Otogiri::Plugin::TableInfo](http://search.cpan.org/~tsucchi/Otogiri-Plugin-TableInfo-0.02/lib/Otogiri/Plugin/TableInfo.pm)

Enjoy!
