---
layout: post
category: perl
tags: perl Windows
title: Active Directory の pwdLastSet を取り扱う
---
{% include JB/setup %}

Active Directory に LDAP 経由でアクセスした際に入っている pwdLastSet という属性が欲しいのですが、
この数字、「1601-01-01 から始まる 100nsec 単位の秒数」とかいう、何というかセンスがないというか、
取扱いにくいことこの上ないデータだな、と思うのですが、使う必要があったので、取り出し方をいろいろ試した。

結果、下記のようなコードが良さげ
{% highlight perl %}
#!perl
use strict;
use warnings;
use utf8;
use DateTime;
use DateTime::Format::Strptime qw(strptime);

my $strp = DateTime::Format::Strptime->new(pattern => '%Y/%m/%d %H:%M:%S');

my $pwd_last_set = '129852668787146250'; # この変数に AD から取った値が入ったつもり
my $pwd_last_set_epoch = $strp->parse_datetime('1601/01/01 00:00:00');
my $unix_time_epoch = $strp->parse_datetime('1970/01/01 00:00:00');
my $sec = $pwd_last_set / 10 / 1000 /1000 ; #100nsec なので秒に変換
my $sec_dt = DateTime->from_epoch( epoch => $sec );
my $real_sec = $sec_dt->epoch + $pwd_last_set_epoch->epoch + $unix_time_epoch->epoch;

my $real_sec_dt = DateTime->from_epoch( epoch => $real_sec );
warn $real_sec_dt->strftime('%Y/%m/%d %H:%M:%S');
{% endhighlight %}

Time::Piece のほうが軽くてわかりやすくて、僕は好きなのですが、1601 年渡したらダメだったみたいなので、
DateTime にしました。あとは最初にかいたロジックどおりに変換かけてるだけです。$real_sec の算出時に $pwd_last_set_epoch を
足してるところは、「引き算じゃないの？」って最初思ってたのですが、$pwd_last_set_epoch が負数になるので足し算でいいっぽいです。
うーん、なんかこの辺バッドノウハウくさい、というか怪しい、というか、32bit/64bit とかで計算結果変わったりしそうで嫌だな。
(一応変わらなかったみたいなのですが)

