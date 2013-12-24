---
layout: post
category: perl
tags: perl db orm Otogiri
title: Otogiri という ORM のご紹介 と Otogiri::Plugin
---
{% include JB/setup %}

ハロー。今日はクリスマスイブだ。今日は僕からみんなに素敵なプレゼントをお届けしようと思う。

...
...
...

ふぅ。こんな感じで書こうと思ったけど、このキャラ無理だわ。普通に書きます。

## Otogiriとは
[Otogiri](http://search.cpan.org/dist/Otogiri/lib/Otogiri.pm) という ORM(?)があります。これは[@ytnobody](https://twitter.com/ytnobody)さんが作ったやつで、
Synopsis 丸写しするとこんな感じの物体です。

```perl
use Otogiri;
my $db = Otogiri->new(connect_info => ['dbi:SQLite:...', '', '']);

my $row = $db->insert(book => {title => 'mybook1', author => 'me', ...});
print 'Title: '. $row->{title}. "\n";

my @rows = $db->select(book => {price => {'>=' => 500}});
for my $r (@rows) {
    printf "Title: %s \nPrice: %s yen\n", $r->{title}, $r->{price};
}

$db->update(book => [author => 'oreore'], {author => 'me'});

$db->delete(book => {author => 'me'});

### insert without row-data in response
$db->fast_insert(book => {title => 'someone', ...});
```

ORM の後ろに「?」がついてるのは、オブジェクトではなく、hashref の配列(singleの場合はhashref)が返ってくるからです。

insert/update/select/delete を Perl からカジュアルに叩ける感じですね。コードもすごく短くて、
[SQL::Maker](http://search.cpan.org/dist/SQL-Maker/)と[DBIx::Sunny](http://search.cpan.org/dist/SQL-Maker/)をくっつけた
非常にシンプルな作りになってて見通しが良いです。

テストデータ入れる時とか、ちょっとしたデータメンテやる時に使っています。こういう用途では、DBI でも機能的には全然問題ないのですが、
こっちのほうがずっと書きやすくて最高便利です。

Row Object が必要ないならプロダクションで使っても問題無いんじゃないかなぁ、と思います。

## Otogiri::Plugin
で、Otogiri 便利だけど、機能が足りないときに厳しいかなぁ、と思ったので、TengとかSQL::Makerが持ってるようなプラグイン機構を入れようと思って、
Teng/SQL::Maker から load_plugin を<del>パクり</del>移植しました。

[Otogiri::Plugin](http://search.cpan.org/dist/Otogiri-Plugin/)(予定地。さっきshipしたのでもうじきアップされるはず)

Plugin の書き方は Teng と同じです。(説明になってない)

例としてはこんな感じ。


[Otogiri::Plugin::InsertOnDuplicate](https://github.com/tsucchi/p5-Otogiri-Plugin-InsertOnDuplicate/blob/master/lib/Otogiri/Plugin/InsertOnDuplicate.pm)

```perl
package Otogiri::Plugin::InsertOnDuplicate;
use 5.008005;
use strict;
use warnings;
use Otogiri;
use Otogiri::Plugin;
use SQL::Maker;

our $VERSION = "0.01";

our @EXPORT = qw(insert_on_duplicate);

SQL::Maker->load_plugin('InsertOnDuplicate');

sub insert_on_duplicate {
    my ($self, $table_name, $insert_value, $update_value) = @_;
    $insert_value = $self->_deflate_param($table_name, $insert_value);
    $update_value = $self->_deflate_param($table_name, $update_value);
    my ($sql, @binds) = $self->maker->insert_on_duplicate($table_name, $insert_value, $update_value);
    $self->dbh->query($sql, @binds);
}
```

Otogiri::Plugin:: 配下にパッケージ作ってメソッド書いて、@EXPORT に登録するだけ！カジュアル！

使うときはこんな感じ

```perl
use Otogiri;
use Otogiri::Plugin
Otogiri->load_plugin('InsertOnDuplicate');
my $db = Otogiri->new( connect_info => [$dsn, $user, $pass, { RaiseError => 1, PrintError => 0 }] );
$db->insert_on_duplicate('member', { name => 'mimorin' }, { name => 'izusama' }); #load_plugin したのでこのメソッドが生えてくる
```

試してないけど、Otogiri 継承してサブクラスにしても多分動くはず(Teng は動くから)。その場合はこんな感じ。

```perl
package My::Cool::DB;
use parent qw(Otogiri);
use Otogiri::Plugin
__PACKAGE__->load_plugin('InsertOnDuplicate');

sub some_benri_method {
    my ($self, $table_name, $insert_param, $update_param) = @_;
	...
	$self->insert_on_duplicate($table_name, $insert_param, $update_param); #plugin をロードしたので使えるようになる
	...
}
```

カジュアル！

## 今後の展開
名前付きプレースホルダで SQL なげるやつ(Teng の search_named)とか、Row オブジェクト生成してより ORM っぽく使えるプラグインとか書いたら面白いんじゃないかなー、と思ってます。

## まとめ
Otogiri 便利なので使ってみよう！機能が足りなかったらプラグイン書こう！


### 余談
僕も同様な事ができる[SQL::Executor](http://search.cpan.org/dist/SQL-Executor)というモジュールを作ってたのですが、Otogiri のがシンプルだし、
DBIx::Sunny がくっついてるのがいいなー、と思って最近はこっちを使っています。

Sunny がくっついていると、例えば

```sql
INSERT /* /Users/tsucchi/git/p5-Otogiri-Plugin-InsertOnDuplicate/lib/Otogiri/Plugin/InsertOnDuplicate.pm line 20 */ INTO `member`
(`name`, `id`)
VALUES ('mimorin', '1')
ON DUPLICATE KEY UPDATE `name` = 'izusama'
```

こんな感じで、コメントでSQLの出所を入れてくれるので、スローログとかエラーログとかを見るときに嬉しいです。
