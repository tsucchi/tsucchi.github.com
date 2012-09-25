---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その4 select 系いろいろ
---
{% include JB/setup %}

こんばんはこんばんは。
今週末は「Perl のお祭り」こと [YAPC::Asia](http://yapcasia.org/2012/)ですね！皆様、見る方も発表する方も準備は万全でしょうか？

(私？お察しください。。。資料はちょっとずつ書いてるよ！)

ここで宣伝。[Perl と SQL のいろいろ](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)
というタイトルでお話させていただきます。裏番組がどちらも大変なビッグネームなので恐縮なのですが、初中級者くらい向けに Perl と SQL にまつわる話を
させていただこうと思っております。

(※ここまでテンプレ)

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。今日は select にまつわる色々です。

{% include kappa_template/mokuji %}
## 事前準備
テーブルを作っておきましょう。前回作ってれば作らなくていいです。

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

データも入れといてくださいね。(これも前回入れてる人は入れなくていいです。)

{% highlight perl %}
use Kappa;
my $db = Kappa->new($dbh);
$db->insert('detective', { id => 1, name => 'シャーロック・シェリンフォード' });
$db->insert('detective', { id => 2, name => '譲崎　ネロ' });
$db->insert('detective', { id => 3, name => 'エルキュール・バートン' });
$db->insert('detective', { id => 4, name => 'コーデリア・グラウカ' });
{% endhighlight %}

## select 系のいろいろ
select 系は、メソッドがいっぱいありますが、一定のルールになっているので、慣れれば分かるようになると思います。基本的には、4タイプの戻り値指定と、4タイプの select 方法の組み合わせです。

### 戻り値指定の4タイプ
- select
- select_row
- select_all
- select_itr

戻り値指定は上記の4種があります。

select はコンテキストに応じて 1レコード or 全レコードを返します。

{% highlight perl %}
my $row  = $db->select('detective', { id => 1 }); #この場合だと 1レコード
my @rows = $db->select('detective', { });         #この場合だと全レコード
{% endhighlight %}

で、select_row系 は、この1レコードを返すタイプです。前回もちょっとだけ説明しましたが、1レコード分の値は row\_object\_enable が TRUE なら Row オブジェクトが返り、FALSE なら hashref(fetchrow\_hashref の値)が返ります。

{% highlight perl %}
$row = $db->select('detective',     { id => 1 }); 
$row = $db->select_row('detective', { id => 1 }); #この2つは同じ
{% endhighlight %}

select_all系 は全レコードを返すタイプです。配列が返り、配列の1要素は、row の場合と同じです。(row\_object\_enable に応じて変わります。)

{% highlight perl %}
@rows = $db->select('detective',     { });
@rows = $db->select_all('detective', { }); #この2つは同じ
{% endhighlight %}

select_itr系 はイテレータを返します。イテレータは next() ってメソッドだけが使えます。next を呼ぶと、1行分データ(Row オブジェクト or hashref)が
返ります。

{% highlight perl %}
my $itr = $db->select_itr('detective',     { });
while ( my $row = $itr->next() ) {
   # $row をつかってあんなことやこんなことをします。
}
{% endhighlight %}

### select 方法の4タイプ
- select
- select\_*\_with_fields
- select\_*\_by_sql
- select\_*\_named

一番シンプルな select はとくに説明しなくても分かるかと思います。テーブル名と条件を指定します。

with\_fields は select と似てますが、引数に select 対象のカラムを指定できます。たとえば、select\_row\_with\_fields だと
こんな感じです。

{% highlight perl %}
my $row = $db->select_with_fields('detective', ['id'], { id => 1 }); # id だけ取る
{% endhighlight %}

この例だと、id だけ取るので、name は取れません。ビューとかに select する場合にハイコストな計算が走る行を除外したい時とかに
使うと良いと思います。

by\_sql は、テーブル名ではなく、SQL を指定します。プレースホルダを使います。

{% highlight perl %}
my @rows = $db->select_all_by_sql('SELECT * FROM detective WHERE id = ?', [1]);
{% endhighlight %}

第2引数は配列ではなく、配列リファレンスで bind する値を指定します。(配列ではなく、配列リファレンスなのは、第3引数としてテーブル名を指定したい
ためです。テーブル名は Row オブジェクトの紐付けに使うので重要です。)

named なやつは、by\_sql に似ていますが、名前つきプレースホルダが使えます。(これもテーブル名ではなく、SQL を指定するタイプです)

{% highlight perl %}
my $row = $db->select_row_by_sql('SELECT * FROM detective WHERE id = :id', { id => 1 } );
{% endhighlight %}

何となくわかったでしょうか？

たとえば select\_itr\_named なら、「イテレータを返して、名前つきプレースホルダの SQL を使うやつ」です。select\_all\_by\_sql なら、「配列を返して、(名前なしの)プレースホルダの SQL を使うやつ」です。select\_row\_with_fields なら、「1行を返して、指定したテーブルの、指定したフィールドを返すやつ」です。

### まとめ
今回は select 系のメソッドを紹介してみました。探偵さんの名前は覚えましたか？これは重要なファクターですよ！
(このネタ、どこまでどの程度通じてるのかよく分かりませんが、マイブームなので続けますよ！)

次回は Row オブジェクトを紹介しようかなー。


