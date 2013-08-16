---
layout: post
category: perl
tags: perl sql
title: SQL::Abstract とか SQL::Maker で空の配列リファレンスを渡した場合
---
{% include JB/setup %}

SQL::Maker や SQL::Abstract に配列リファレンスを渡すと、IN検索相当(orでの検索)になります。

んで、空の配列リファレンスを渡すと、どうなるかというと...

```perl
use strict;
use warnings;
use SQL::Abstract;
use SQL::Maker;
use feature qw(say);
 
my $ab = SQL::Abstract->new();
my ($ab_sql, @ab_binds) = $ab->select('hoge', ['*'], { id => [] });
 
my $mk = SQL::Maker->new(driver=>'mysql');
my ($mk_sql, @mk_binds) = $ab->select('hoge', ['*'], { id => [] });
 
say "SQL::Abstract: $ab_sql";
say "SQL::Maker   : $mk_sql";

```


こんな感じです。

```
$ perl a.pl
SQL::Abstract: SELECT * FROM hoge WHERE ( 0=1 )
SQL::Maker   : SELECT * FROM hoge WHERE ( 0=1 )
```

ちょい前の Rails の ActiveRecord でこんなクエリ見たなぁ、とか思いました。

ちなみに、名状しがたいくらい古いバージョンの SQL::Abstract だと

```
SQL::Abstract: SELECT * FROM hoge WHERE ( )
```

こんな感じのパースできない SQL が生成されて、泣く事になります。(主に僕が)
