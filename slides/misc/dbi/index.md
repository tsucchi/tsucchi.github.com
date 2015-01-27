DBプログラミングにおけるイテレータと配列の話
==========

O/R Mapper の select のインターフェース
---
+ イテレータを取るものと配列を取るものがある
+ 例) [Teng の場合](http://perl-users.jp/articles/advent-calendar/2011/teng/8)
+ 「どちらが優れている」とかではなく、使い分けが重要

イテレータの場合
---
```perl
my $itr = $teng->search('user', +{name => 'nekokak'}, +{order_by => 'id'});
while ( my $row = $itr->next() ) {
    # $row を使ってアレコレする
}
```

配列の場合
---
```perl
my @rows = $teng->search('user', +{name => 'nekokak'}, +{order_by => 'id'});
# Row object の配列が返る
```

それぞれの特徴
---
+ 早さはあんまり変わらない(はず)
+ イテレータを使うほうがメモリ使用量が少ない(うまく書けば。後述)
+ 配列のほうが分かりやすいことが多そう

使い分け
---
+ 基本はイテレータ
+ マスタを一度に引く場合とかは配列が便利

使い分け(2)
---
+ 行にフォーカスする処理の場合はイテレータ

```perl
while ( my $row = $itr->next() ) {
    do_something_with_row($row);
	$row->nanika_suru();
}
```

+ データ全体にフォーカスする場合は配列

```perl
my @rows = $teng->search('user', +{name => 'nekokak'}, +{order_by => 'id'});
$self->important_shori(@rows);
```

イテレータを使う場合の注意
---
```perl
my @array = ();
my $itr = $teng->search('user', +{name => 'nekokak'}, +{order_by => 'id'});
while ( my $row = $itr->next() ) {
    # $row を使ってアレコレする
	push @array, $some_data; # これだと行数分 @array が作られるので意味がない
}
```

おしまい
===
