---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その6 Row オブジェクトのカスタマイズ
---
{% include JB/setup %}

こんばんはこんばんは。

[YAPC::Asia](http://yapcasia.org/2012/)も無事に終了しましたねー。

さて、YAPC でお話させていただいた、 [Perl と SQL のいろいろ](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)
は公式サイトにプレゼン資料・動画ともどもアップされております！見たかったけど見逃した方はチェックすべし！(自分は恥ずかしくて動画みてないけどな！)

(※ここまでテンプレ)

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。今日は Row オブジェクトのカスタマイズについてです。

{% include kappa_template/mokuji %}

## 事前準備
テーブルを作っておきましょう。そういえば、SQLite には memory というエンジンがあります。(ファイル名を「:memory:」とする。)
終了時にデータが勝手に消えてくれるので、テストとかお試し用ならこっちのほうがいいかもしれませんね。

今回は2テーブル作ります。なお、設定上、1探偵1トイズという制限は無いと思われる(複数持っても良いと思われる)
のですが、説明が面倒くさくなるので細かいことは気にしないで。

あ、ちなみに、トイズっていうのは、探偵(または怪盗)が持っているある種の超能力のことです。今回は名称のみデータとして持つことにします。

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

スキーマは分かりますよね？ detective.toys_id = toys.id で結合します。

データも入れましょう。今回からテーブル構造変わった上、メモリ上にテーブルを作っているため、
前回入れた人もデータを入れる必要があります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
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

## Row オブジェクトのカスタマイズの前に
アプリを作成する場合、どのようなソフトウェア構成にしていますか？

Web アプリでフレームワークを使っている場合は、フレームワークの規約にしたがうのが良いでしょう。
そうでない場合は、CPAN モジュールと同じレイアウトにしておくのがおすすめです。(なお、Web Application Framework を使う
場合も、大抵の場合 CPAN レイアウトになっているはずです。)

CPAN レイアウトを作るには、pmsetup とか Module::Starter とか Module::Setup とかそのへんのツールを使えば簡単にできます。
僕は Module::Setup を使っています。

- [Module::Setup でらくらくモジュール作成](http://perl-users.jp/articles/advent-calendar/2009/hacker/19.html)

さて、CPAN レイアウトを取っていると、プロジェクト(アプリケーション)で使うライブラリは lib というディレクトリに入れているかと
思います。カスタマイズした、Row オブジェクトも lib 配下に置くことになります。

Row オブジェクトの命名規則は、たとえばプロジェクト名が MyProj だとしたら、「MyProj::DB::Row::テーブル名」 みたいな感じにすると分かりやすくて
よいのではないか、と思います。命名規則は、いつかまた解説すると思います。

## カスタマイズ方法
では実際に Row オブジェクトのカスタマイズをします。プロジェクト名は仮に MilkyHolmes としておきましょうか。detective テーブルの Row オブジェクト
を拡張します。

ファイル名でいうと、lib/MilkyHolmes/DB/Row/detective.pm。 パッケージ名でいうと、MilkyHolmes::DB::Row::detective となります。お気に入りの開発ツール
(僕は emacs を使っています)で、ファイルを開きましょう。

Kappa は FK とかをみて、つながっているテーブルのデータを引っ張る機能とかが**ありません**。(まあ今回の例では FK 張ってませんが)
ですので、Row オブジェクトを拡張して、detective の Row オブジェクトから toys の name(トイズの名前)を引く、
toys_name というメソッドを付けてみましょう。

{% highlight perl %}
package MilkyHolmes::DB::Row::detective;
use parent qw(Kappa::Row);
use strict;
use warnings;

sub toys_name {
    my($self) = @_;
    my $toys_row = $self->db->select_row('toys', { id => $self->toys_id })	;
    return '' if ( !defined $toys_row );
	return $toys_row->name;
}

1;
{% endhighlight %}

Row オブジェクトの db メソッドを呼ぶと、Kappa (呼び出し元)のオブジェクトが取れるのでした。
これを用いて、toys テーブルの行を取得し、toys.name の値を返しています。(なお、Kappa には透過キャッシュとかないので、
処理が重くなったり、重そうだったら必要に応じてキャッシュを入れる必要があります。)

## カスタマイズした Row オブジェクトの使い方
このままでは、定義した Row オブジェクトを使うことができません。Kappa に Row オブジェクトがどこにあるかを教えてあげる
必要があります。Kappa の new にオプションとして、row_namespace というオプションをわたします。

{% highlight perl %}
use Kappa;
# 
# コンストラクタで row_namespace を指定
#
my $db = Kappa->new($dbh, { row_namespace => 'MilkyHolmes::DB::Row' });
{% endhighlight %}

こうすることで、Row オブジェクトの定義が 「MilkyHolmes::DB::Row::テーブル名」 にあることが Kappa さんに伝わります。

## 共通の Row オブジェクト
テーブルに依存せず、すべての Row オブジェクトに共通の処理を定義したい場合もあるかと思います。
Kappa は Row オブジェクトの定義を、

+ 「row_namespace::テーブル名」 で定義された、テーブル名ごとの Row オブジェクト
+ row_namespace
+ Kappa::Row (基本機能)

の順に検索します。ですので、共通処理は row_namespace におきます。今回の例だと、
MilkyHolmes::DB::Row(ファイル名だと lib/MilkyHolmes/DB/Row.pm )におきます。たとえば CSVの出力ができるような
csv\_output というメソッドを付けてみましょう。


{% highlight perl %}
package MilkyHolmes::DB::Row;
use parent qw(Kappa::Row);
use strict;
use warnings;

sub csv_output {
    my ($self) = @_;
	# これは説明用の超テキトウな実装なので、ちゃんとやるときは Text::CSV 系のモジュールを使ってください。
	my %row_value = $self->row_value;
	return join(',', sort values %row_value);
}

1;
{% endhighlight %}

カスタマイズした Row オブジェクト(detective テーブルのもの)からも使えるように、親クラスを変更しておきます。

{% highlight perl %}
package MilkyHolmes::DB::Row::detective;
use parent qw(MilkyHolmes::DB::Row); #親クラスを変更
# ...以降は前と同じ
{% endhighlight %}

## サンプル

[動作するサンプル](https://github.com/tsucchi/Kappa-Example/zipball/2012-10-09-kappa_customized_row_object-rev02)を作成しました。
bin ディレクトリの customized\_row\_object.pl が今回のサンプルです。lib/MilkyHolmes/Row 配下も実装してありますので、確認してみてください。

## まとめ
今回は Row オブジェクトのカスタマイズ方法について解説しました。次回はテーブルクラスの拡張方法について解説します。
なんとなく、読者の方が Teng とか Skinny とか使っているのを想定して、先に Row オブジェクトについて解説しましたが、
実は Kappa においては、テーブルクラスのほうが重要です。(と、僕は考えています)

ではでは。また次回。

