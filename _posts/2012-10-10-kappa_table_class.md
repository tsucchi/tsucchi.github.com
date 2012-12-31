---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その7 テーブルクラスとそのカスタマイズ
---
{% include JB/setup %}

こんばんはこんばんは。YAPC も(ry もういいか。ずいぶん経つもんね。

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。
今日はテーブルクラスとそのカスタマイズ方法についてです。

{% include kappa_template/mokuji %}

## 事前準備
前回と同じものを使います。

{% highlight perl %}
use DBI;
my $dbh = DBI->connect("dbi:SQLite:dbname=:memory:",'','');
$dbh->do("
CREATE TABLE detective (
  id      INT PRIMARY KEY,
  toys_id INT, /* toys.id */
  name    TEXT
);
");

$dbh->do("
CREATE TABLE toys (
  id    INT PRIMARY KEY,
  name  TEXT
);
");

{% endhighlight %}

スキーマは分かりますよね？ detective.toys_id = toys.id で結合します。(前回と同じ)

メモリ上にテーブルを作っているため、前回入れた人もデータを入れる必要があります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh, { row_namespace => 'MilkyHolmes::DB::Row' });
$db->insert('toys', { id => 1, name => 'サイコキネシス' });
$db->insert('toys', { id => 2, name => 'ダイレクトハック' });
$db->insert('toys', { id => 3, name => 'トライアセンド' });
$db->insert('toys', { id => 4, name => 'ハイパーセンシティブ' });

$db->insert('detective', { id => 1, toys_id => 1, name => 'シャーロック・シェリンフォード' });
$db->insert('detective', { id => 2, toys_id => 2, name => '譲崎　ネロ' });
$db->insert('detective', { id => 3, toys_id => 3, name => 'エルキュール・バートン' });
$db->insert('detective', { id => 4, toys_id => 4, name => 'コーデリア・グラウカ' });

# ここより後ろに試したいコードを書きます

{% endhighlight %}

## テーブルクラスって何？
Kappa には model() というメソッドがあります。これを呼ぶと、テーブルクラスのインスタンスが返ります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
my $model_detective = $db->model('detective');#detective テーブルのテーブルクラスのインスタンスが返る

{% endhighlight %}

テーブルクラスはデフォルトのインスタンス(ここでは $db)とほとんど同じですが、自分自身のテーブル名を知っているため、
select/insert/update などの各メソッドを使う際に、テーブル名を省略できるようになります。

{% highlight perl %}
my $db = Kappa->new($dbh);
my $model = $db->model('detective');
my $row = $model->select({ id => 1 });
$model->update({ toys_id => undef }, { id => 1 });# トイズがなくなってダメダメにw
# ...
{% endhighlight %}

また、テーブルごとにカスタマイズしたメソッドを持てるようになります。

あと、以前 Row オブジェクトの説明で、Row オブジェクトの db() は Kappa のインスタンスと大体同じ、と説明しましたが、
厳密には、この model() メソッドで取り出したインスタンスと同じです。Row オブジェクトは(たいてい)テーブル名を知っている
ため、そのようになっています。

## カスタマイズ方法
ではテーブルクラスのカスタマイズをします。プロジェクトは前回同様 MilkyHolmes を使います。detective テーブルをカスタマイズ
します。

ファイル名でいうと、lib/MilkyHolmes/DB/Table/detective.pm。 パッケージ名でいうと、MilkyHolmes::DB::Table::detective となります。

前回と似てますが、detective.id を引数にとって、toys.name (トイズの名前)を返す、toys\_name\_from\_detective\_id という
メソッドをつけてみましょう。

{% highlight perl %}
package MilkyHolmes::DB::Table::detective;
use parent qw(Kappa);
use strict;
use warnings;

sub toys_name_from_detective_id {
    my($self, $id) = @_;
    #detective テーブルはテーブル名を省略できる。
    my $row = $self->select_row({ id => $id });
	return '' if ( !defined $row );
	return $row->toys_name;# 前回作った toys_name を呼ぶ
}

1;
{% endhighlight %}

テーブルクラス内では、拡張しているテーブル自身(今回の例では detective)を省略することができます。
つまりテーブルクラス定義内の $self は Kappa のインスタンスではなく、$db->model('テーブル名') したものに
なります。

## カスタマイズしたテーブルクラスの使い方
Row オブジェクトの場合と同様、このままでは、定義したテーブルクラスを使うことができません。
Kappa に テーブルクラスの定義がどこに置いてあるかを教えてあげる
必要があります。Kappa の new にオプションとして table_namespace というオプションをわたします。

{% highlight perl %}
use Kappa;
# 
# コンストラクタで table_namespace を指定
#
my $db = Kappa->new($dbh, { 
    row_namespace   => 'MilkyHolmes::DB::Row',   #これは前回していしたやつ
	table_namespace => 'MilkyHolmes::DB::Table', #テーブルクラスの定義場所を指定
});
{% endhighlight %}

こうすることで、テーブルクラスの定義が 「MilkyHolmes::DB::Table::テーブル名」 にあることが Kappa さんに伝わります。
これにより、カスタマイズしたメソッドが呼べるようになります。

{% highlight perl %}
my $model = $db->model('detective');
$model->toys_name_from_detective_id(1); # => 'サイコキネシス'
{% endhighlight %}

## 共通のメソッドをテーブルクラスに定義したい
テーブルに依存せず、すべてのテーブルクラスに共通の処理を定義したい場合もあるかと思います。
Row オブジェクトの場合と同じように、Kappa は テーブルクラスの定義を、

+ 「table_namespace::テーブル名」 で定義された、テーブル名単位のもの
+ table_namespace
+ Kappa (基本機能)

の順に検索します。ですので、共通処理は table_namespace におきます。今回の例だと、
MilkyHolmes::DB::Table(ファイル名だと lib/MilkyHolmes/DB/Table.pm )におきます。

たとえば、insert したあとに、id を返す insert\_and\_last\_insert\_id を実装してみます。

{% highlight perl %}
package MilkyHolmes::DB::Table;
use parent qw(Kappa);
use strict;
use warnings;

sub insert_and_last_insert_id {
    my ($self, @args) = @_;
    $self->insert(@args);
	#移植性がないのが微妙ですね。。。laset_insert_id 使っても微妙だし。。。
	return $self->dbh->sqlite_last_insert_rowid();
}

1;
{% endhighlight %}

カスタマイズしたテーブルクラス(detective テーブルのもの)からも使えるように、親クラスを変更しておきます。

{% highlight perl %}
package MilkyHolmes::DB::Table::detective;
use parent qw(MilkyHolmes::DB::Table); #親クラスを変更
# ...以降は前と同じ
{% endhighlight %}


ただし、table_namespace に定義した場合、Kappa のインスタンスからは利用できないので、かなり微妙です。
ですので、共通機能は、もう一つ上の、「プロジェクト名::DB」に置くことの方が多いです。(この例では MilkyHolmes::DB)。

{% highlight perl %}
package MilkyHolmes::DB;
use parent qw(Kappa);
use strict;
use warnings;

# MilkyHolmes::DB::Table から移動
sub insert_and_last_insert_id {
    my ($self, @args) = @_;
    $self->insert(@args);
	#移植性がないのが微妙ですね。。。laset_insert_id 使っても微妙だし。。。
	return $self->dbh->sqlite_last_insert_rowid();
}

1;
{% endhighlight %}

で、table_namespace のほうは、この拡張したクラスを継承するようにします。こんな感じ。

{% highlight perl %}
package MilkyHolmes::DB::Table;
use parent qw(MilkyHolmes::DB);# 親クラス変更
use strict;
use warnings;

1;
{% endhighlight %}


で、インスタンス化する対象を Kappa のインスタンスではなく、「プロジェクト名::DB」のインスタンスにします。

{% highlight perl %}
use MilkyHolmes::DB;
# 前は Kappa を new してたところ
my $db = MilkyHolmes::DB->new($dbh, { 
    row_namespace   => 'MilkyHolmes::DB::Row', #これは前回していしたやつ
	table_namespace => 'MilkyHolmes::DB::Table',#テーブルクラスの定義場所を指定
});
{% endhighlight %}

また、都度 row\_namespace や table\_namespace を指定するのはだるいので、コンストラクタをオーバーライドするのが
おすすめです。

{% highlight perl %}
package MilkyHolmes::DB;
use parent qw(Kappa);
use strict;
use warnings;

sub new {
    my ($class, $dbh, $option_href) = @_;
	$option_href->{row_namespace}   = 'MilkyHolmes::DB::Row';
	$option_href->{table_namespace} = 'MilkyHolmes::DB::Table';
	my $self = $class->SUPER::new($dbh, $option_href);
	bless $self, $class;
}

# ...
1;
{% endhighlight %}

こうすると、先ほどの呼び出しは、

{% highlight perl %}
use MilkyHolmes::DB;
# 前は Kappa を new してたところ
my $db = MilkyHolmes::DB->new($dbh);
{% endhighlight %}

とシンプルに書けるようになります。

## なぜテーブルクラスが重要か
テーブルクラス内では、自分自身のテーブル名を省略できる、というのが最大のポイントです。

テーブル名が省略されていない呼び出しを見つけると、「あれ？この部分はメソッドに切り出して、
省略できるように他のクラスに移動した方がいいんじゃないかな？」と思うようになります。
(そして、その移動したメソッドは他のクラスからも再利用できるかもしれない、ってか出来ることが多い)

DB設計の時点でミスるとダメかもしれませんが、基本的には、テーブル名を省略できるように書いていくだけで、
ある程度キレイな API が作れるようになっています。(Row オブジェクトを上手に作っても多分実現できるのですが、
テーブルクラスでやるほうがずっと簡単です。)

ですので、Kappa においては、Row オブジェクトよりもテーブルクラスのほうが重要な訳です。


## サンプル

今回も[動作するサンプル](https://github.com/tsucchi/Kappa-Example/zipball/2012-10-10-kappa_table_class-rev02)を作成しました。
bin ディレクトリの customized\_table\_class.pl が今回のサンプルです。lib/MilkyHolmes/ 配下も実装してありますので、確認してみてください。

## まとめ
今回はテーブルクラスと、そのカスタマイズ方法を解説しました。これで伝わってるのかだいぶ微妙なのですが、
もうちょっと書いていこうと思います。次回は雑多な話をしようかな。多分最終回です。

なにかリクエストや疑問や文句などあれば、twitter(@tsucchi) とかこのブログのコメント欄(使ったこと無いから使えるか分らんけど)とか、はてブとか、
その辺で連絡してみてください。Kappa 自体の要望とかバグなどあれば、@tsucchi か github issue(日本語でいいです。ってか日本語のがいいです)まで。

ではでは。また次回。

