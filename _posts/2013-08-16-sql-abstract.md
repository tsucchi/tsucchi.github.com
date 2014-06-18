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
my ($mk_sql, @mk_binds) = $mk->select('hoge', ['*'], { id => [] });
 
say "SQL::Abstract: $ab_sql";
say "SQL::Maker   : $mk_sql";

```


こんな感じです。

```
$ perl a.pl
SQL::Abstract: SELECT * FROM hoge WHERE ( 0=1 )
SQL::Maker   : SELECT *
FROM `hoge`
WHERE (0=1)
```

ちょい前の Rails の ActiveRecord でこんなクエリ見たなぁ、とか思いました。

ちなみに、名状しがたい古いバージョンの SQL::Abstract だと

```
SQL::Abstract: SELECT * FROM hoge WHERE ( )
```

こんな感じのパースできない SQL が生成されて、泣く事になります。(主に僕が)

### 2014-06-18 追記
元の記述、というかサンプルコードが間違ってました orz。

この記事書いていた頃だと、SQL::Maker だと、「名状しがたい古いバージョンの SQL::Abstract」
と同じような動作をして、変な SQL を吐いて死にます。ただ、この SQL::Maker の不具合はバージョン 1.14 で
修正されています。

[Changes - SQL::Maker](http://cpansearch.perl.org/dist/SQL-Maker/Changes)

```
1.14 2014-03-04T23:39:17Z

    - `{x => []}` generates `1=0`
      (karupanerura)
    - Add options for the DELETE ... USING statement.
      (Gelu Lupas)
```

もしサンプルコードがバグってなければ、この修正が入るよりずいぶん前に気づくことができたので、
勿体ない事をしたなぁ、と思う。
