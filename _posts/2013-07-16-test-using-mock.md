---
layout: post
category: perl
tags: perl db test
title: パッケージ名が良くわからない物体をテストする
---
{% include JB/setup %}

表記の通りなんですが、たとえば、DBI->connect したときに返ってくるやつ(いわゆる $dbh)なんだっけ？とか、さらに $dbh->prepare したときにかえってくるやつ(通称$sth)もわかんねーなーとか、
あるいは DBIC の ResultSet ってそのまま ResultSet でいいんだっけ？とか、内製のアプリで、まだあんま中身理解してないから、かえってくるパッケージの型が良くわかんない、とか
そういう色んな事情があって、「テストしたいんだけど、戻ってくる型が良くわからない。いや調べれば分かるんだろうけど、そういうのめんどくさい」って事たまにありませんか？

最近そんな事があったので、Test::MockObject 使ったダックタイピングでテストをやってみた。

まずテストされ側

```perl
package OreoreORM;
use strict;
use warnings;
sub new {
    my ($class, $dbh) = @_;
    my $self = {
        dbh => $dbh,
    };
    bless $self, $class;
}

# こいつがテストしたいメソッドとします
sub single {
    my ($self, $id) = @_;
    my $dbh = $self->{dbh};
    my $sth = $dbh->prepare('SELECT * FROM aaa WHERE id = ? LIMIT 1');
    $sth->execute($id);
    my $row = $sth->fetchrow_hashref;
    $sth->finish;
    return $row;
}
```

とりあえず、ORM 的な物体です。select 投げるだけです。このくらいの簡単な物体なら、いくらでもテストのやりようはあると思いますが、
例、ということで。

んで、テストコードはこんな感じ。

```perl
use Test::More;
use Test::MockObject;

my $sth = Test::MockObject->new();
$sth->mock('execute', sub { });
$sth->mock('fetchrow_hashref', sub { return { id => 100, value => 'hoge' } });
$sth->mock('finish',  sub { });

my $dbh = Test::MockObject->new();
$dbh->mock('prepare', sub { return $sth });

my $db = OreoreORM->new($dbh);
is_deeply( $db->single(100), { id => 100, value => 'hoge'} );

done_testing;
```

こっちもそんなに難しくないですが、Test::MockObject だと、こんな感じで無名のオブジェクトにモック(正確にはスタブ)した
メソッドをぶっ込めるので、わりと簡単にテストできます。この例では、実質何もテストしてない感じになってますが、mock 化した
サブルーチン側に is とか ok とかの検証メソッドぶっ込んだり、$call_count みたいなやつを仕込んで、意図通りメソッドが呼ばれてるか
確認したりして、テストします。

「Test::MockObject って重いよねー」ってのはその通りだと思うので、もっと軽量なやり方で可能なら、教えてください。
