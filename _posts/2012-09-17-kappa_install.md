---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その2 インストールとかのお話
---
{% include JB/setup %}

こんにちはこんにちは。
もうすぐ「Perl のお祭り」こと [YAPC::Asia](http://yapcasia.org/2012/)ですね！皆様、見る方も発表する方も準備は万全でしょうか？

(私？お察しください。。。)

ここで宣伝。[Perl と SQL のいろいろ](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)
というタイトルでお話させていただきます。裏番組がどちらも大変なビッグネームなので恐縮なのですが、初中級者くらい向けに Perl と SQL にまつわる話を
させていただこうと思っております。

(ここまでテンプレ)

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。今日はインストール編です

## 目次
- [その1 開発の背景のお話](/kappa/2012/09/15/kappa_background)
- [その2 インストールとかのお話](/kappa/2012/09/17/kappa_install)

## インストール
### インストールの前提
Perl と cpanm はもちろん入ってますよね？なければ入れといてください。良く分からなければ perlbrew とか cpanm とかで
ググってみてください。

DBMS(Oracle とか MySQL とか PostgreSQLとか)がインストールされていて、ドライバ(クライアント)が入っていることが必要です。

Ubuntu で MySQL なら libmysqlclient-dev ってやつを入れるらしいです。(ほかの OS や DBMS についてはググってね)

{% highlight tcsh %}
$ sudo apt-get install libmysqlclient-dev
{% endhighlight %}

で、DBD を入れます。(DBD::Oracle/mysql/pg など)

MySQL なら
{% highlight tcsh %}
$ cpanm DBI DBD::mysql
{% endhighlight %}

で、インストールなのですが、多分コケますw。なんか DB つないでアレコレするテストが入ってるみたいなんですよね。
(コレなんとかならないんですかねー。。。author test でもいいと思うんだけどなー。。。)

ちゃんとしたやり方もあるかもしれませんが、めんどいので --force つけて入れます。

{% highlight tcshell %}
$ cpanm --force DBD::mysql
{% endhighlight %}

SQLite ならこんな感じ。(クライアント無くてもたしか大丈夫だったと思う)

{% highlight tcsh %}
$ cpanm DBI DBD::SQLite
{% endhighlight %}

普通の開発なら、MySQL とかポスグレ使うと思いますが、以降の説明では SQLite を使うので、DBD::SQLite も入れといてくださいね。

### DBI/DBD の動作確認
まずは DBI 使って、ちゃんとテスト用の SQL を発行してみるのが良いかもしれませんね。こんな感じ。

{% highlight perl %}
#!perl
use strict;
use warnings;
use DBI;
use Data::Dumper;

my $dbfile = 'a.db';
unlink $dbfile if ( -e $dbfile );


my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile",'','');
# テスト用のテーブル作って。。。
$dbh->do("
CREATE TABLE test_dayo (
  id     INT PRIMARY KEY,
  value  TEXT
);
");

# テストデータ入れます
my $sth = $dbh->prepare("INSERT INTO test_dayo(id, value) values (?,?)");
$sth->execute(123, 'aaa');
$sth->execute(456, 'bbb');

# select して、データが入ってるのを確認
my $rows_aref = $dbh->selectall_arrayref("SELECT * FROM test_dayo", { Slice => {} } );

warn Dumper($rows_aref);
#こんな結果が返れば OK
# $VAR1 = [
#           {
#             'value' => 'aaa',
#             'id' => 123
#           },
#           {
#             'value' => 'bbb',
#             'id' => 456
#           }
#         ];
{% endhighlight %}

### インストール
ここまでくれば環境的な問題はクリアできているので、インストールはラクラクです。

Kappa ですが、github と Dropbox の共有フォルダにしか置いてません。(CPAN に無いので、cpanm で入りません)

github からインストールできる様な猛者なら、こんな説明いらないと思いますので、ここでは Dropbox から
入れる方法を紹介します。

まず、[Kappa の共有フォルダ](https://www.dropbox.com/sh/2a8u7yq1w41z4fv/DdRxaovfxw/Kappa)にアクセスします。
で、ここから最新のバージョンのものをダウンロードします。現時点では 0.12 ですね。(0.12 はちょっと色々手を入れたので、
0.11 のほうがもしかしたら安定してるかもです。)

で、/tmp とか /var/tmp とかホームディレクトリのどっかに置いてから、

{% highlight tcsh %}
$ tar zxvf Kappa-バージョン番号.tar.gz
$ cd Kappa-バージョン番号
$ cpanm --install-deps .
$ perl Makefile.PL
$ make test
$ make install
{% endhighlight %}

してみて、特にエラーがなければ OK です。

### テストプログラムの実行
さっきのテストプログラムを Kappa を使って書き換えてみましょう。

{% highlight perl %}
#!perl
use strict;
use warnings;
use DBI;
use Data::Dumper;
use Kappa;

my $dbfile = 'a.db';
unlink $dbfile if ( -e $dbfile );


my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile",'','');
# テスト用のテーブル作って。。。
$dbh->do("
CREATE TABLE test_dayo (
  id     INT PRIMARY KEY,
  value  TEXT
);
");

# テストデータ入れます
my $db = Kappa->new($dbh);
$db->insert('test_dayo', { id => 123, value => 'aaa'});
$db->insert('test_dayo', { id => 456, value => 'bbb'});

$db->row_object_enable(0);

# select して、データが入ってるのを確認
my @rows = $db->select('test_dayo');

warn Dumper(\@rows);
#こんな結果が返れば OK
# $VAR1 = [
#           {
#             'value' => 'aaa',
#             'id' => 123
#           },
#           {
#             'value' => 'bbb',
#             'id' => 456
#           }
#         ];
{% endhighlight %}

ORM とか DBI に慣れてる人なら、だいたい雰囲気分かるかもですが、詳しい説明は次回以降していきます。
