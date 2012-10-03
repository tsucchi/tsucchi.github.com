---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その5 Row オブジェクトの基本
---
{% include JB/setup %}

こんばんはこんばんは。
[YAPC::Asia](http://yapcasia.org/2012/)も無事に終了しましたねー。超楽しかった。

この連載(?)は、YAPC 開催前に宣伝も兼ねて(?)書いてたのですが、間に合いませんでしたw
まあでも読者の方がちゃんといることが分ったので(こういうの超重要。すごいうれしいですよ。まじで。)
連載つづけます。

YAPC でお話させていただいた、 [Perl と SQL のいろいろ](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)
は公式サイトにプレゼン資料もアップされております。そろそろ動画も公開されると思う(1日目のは公開されてるみたい)ので、
見たかったけど見逃した方はチェックすべし！

(※ここまでテンプレ)

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。今日は select したときに返ってくる Row オブジェクトの話です。

{% include kappa_template/mokuji %}

## 事前準備
テーブルを作っておきましょう。前回 or 前々回に作ってれば作らなくていいです。

{% highlight perl %}
use DBI;
my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile",'','');
$dbh->do("
CREATE TABLE detective (
  id    INT PRIMARY KEY,
  name  TEXT
);
");
{% endhighlight %}

データも入れといてくださいね。(これも前回 or 前々回に入れてる人は入れなくていいです。)

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
$db->insert('detective', { id => 1, name => 'シャーロック・シェリンフォード' });
$db->insert('detective', { id => 2, name => '譲崎　ネロ' });
$db->insert('detective', { id => 3, name => 'エルキュール・バートン' });
$db->insert('detective', { id => 4, name => 'コーデリア・グラウカ' });
{% endhighlight %}

## 戻り値指定と Row オブジェクトの関係
前回の復習になりますが、select 系は戻り値の返り方ごとに、下記 4 タイプがあります。

- select : コンテキストに応じて 1レコード or 全レコードを返します
- select_row : 1レコードを返します
- select_all : 全レコードを返します。配列が返り、配列の1要素は、row の場合と同じです
- select_itr : イテレータを返します。イテレータの next() を呼ぶと、1行分データが返ります。

つまり、Row オブジェクトは、

- select_row の戻り値
- select_all の戻り値の配列の一要素
- select_itr の戻り値のイテレータで、next() を呼んだときの値

です。ただし、一部例外があります。

- 該当レコードがない場合
- row\_object\_enable に 0 がセットされている場合

該当レコードがない場合、select\_row は undef, select\_all は空の配列 が返ります。select_itr は 1回もイテレートできないものが返ります。
select\_row 系で undef が返るのがちょっと微妙だなー、と思うのですが、もう今さら変えられないです。。。

row\_object\_enable については、次節で紹介します。

## row_object_enable
row\_object\_enable に 0 (FALSE になる値）をセットすると、Row オブジェクトが生成されなくなります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
$db->row_object_enable(0);
my $row = $db->select('detective', { id => 1 });
# => { id => 1, name => 'シャーロック・シェリンフォード'}
# こんな感じの hashref が返るようになります。

$db->row_object_enable(1);#1(TRUE)にもどすと
# 元通り Row オブジェクトが返ります
{% endhighlight %}

row\_object\_enable に 0 を設定すると、Row オブジェクトのかわりに hashref が返るようになります。
Row オブジェクト生成すると遅いとか、hashref のほうが取扱いしやすい場合(変数として渡ってきたキー名を使って
データを取り出したいときとか)に使うとよいです。ですが、今の状態が分からなくなると面倒なので、次節に説明する
ガード付きのやつを僕は良く使っています。

## ガードつきの row_object_enable
row\_object\_enable の現在の状態を知る方法が、そういえばありませんw(作らなきゃダメだな)

また、プログラムの途中で状態を変更してしまうと、row\_object\_enable の状態が意図しないものに
なってしまう可能性があります。

ですので、戻り値を指定して、row\_object\_enable を呼ぶと、戻り値の変数のスコープを抜けたタイミングで、
以前の値に戻すようになっています。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
{ #スコープ定義
    my $guard = $db->row_object_enable(0); #ここで戻り値指定で呼ぶ
    my $row = $db->select('detective', { id => 1 });
	# ここでは Row オブジェクトが無効になっている
    # => { id => 1, name => 'シャーロック・シェリンフォード'}
} 

# スコープを抜けると。。。
# row_object_enable がデフォルト(1)に戻る
{% endhighlight %}

大変便利な機能なのですが、0.11 までのバージョンでは不具合がありましたorz

今もおかしい部分もあるかもしれませんので、使ってみておかしなところを見つけた場合はご報告いただけるとありがたいです。
(twitter でも github issues でもなんでもいいです)

## Row オブジェクトでできること
デフォルトの Row オブジェクトは、まずカラムの情報をとるメソッドがあります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
my $row = $db->select('detective', { id => 1 });
$row->id;   # => 1
$row->name; # => 'シャーロック・シェリンフォード'
{% endhighlight %}

あとは、親のハンドルを返すメソッド(db)があります。(厳密にはちょっと違うのですが、現時点ではその違いは説明できません。)
Row オブジェクトをカスタマイズすることができるのですが、その際に使われます。(次回説明します)。

呼び出し元のテーブル名を返す、table_name というのもあります。(これはあんまり使わないかも)

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
my $row = $db->select('detective', { id => 1 });
$row->db;         # $db と同じものが返る
$row->table_name; # => 'detective'
{% endhighlight %}

また、get\_columns(), row\_value() というメソッドがあります。get\_columns() は row\_object\_enable が 0 のときに返るような
hashref が返ります。row\_value は hashref ではなく、hash が返ります。

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
my $row = $db->select('detective', { id => 1 });
my $row_href = $row->get_columns; # => { id => 1, name => 'シャーロック・シェリンフォード' }
my %row_value = $row->row_value;  # => ( id => 1, name => 'シャーロック・シェリンフォード' )
{% endhighlight %}

## まとめ
今回は Row オブジェクトの基本的な機能を紹介しました。そういえば、サンプルコードの探偵さんは YAPC本編でも一部使ったのですが、
特にツッコミもなく寂しい限り(?)です。(あ、でも一瞬反応あったかな？)。

次回は多分 Row オブジェクトのカスタマイズ方法について説明します。せっかくなので、探偵さんのデータも拡充しますよ！


