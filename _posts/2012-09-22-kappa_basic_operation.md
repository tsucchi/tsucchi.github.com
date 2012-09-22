---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その3 基本操作
---
{% include JB/setup %}

こんにちはこんにちは。
もうすぐ「Perl のお祭り」こと [YAPC::Asia](http://yapcasia.org/2012/)ですね！皆様、見る方も発表する方も準備は万全でしょうか？

(私？お察しください。。。今日はちょっとだけ資料書いたよ！)

ここで宣伝。[Perl と SQL のいろいろ](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)
というタイトルでお話させていただきます。裏番組がどちらも大変なビッグネームなので恐縮なのですが、初中級者くらい向けに Perl と SQL にまつわる話を
させていただこうと思っております。

(※ここまでテンプレ)

[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。今日は基本操作です。

{% include kappa_template/mokuji %}
## 事前準備
テーブルを作っておきましょう。

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


## 基本操作
### インスタンスの生成
インスタンスの生成はこんな感じです。

{% highlight perl %}
use Kappa;
use DBI;
my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile",'','');
my $db = Kappa->new($dbh);
{% endhighlight %}

DBI のデータベースハンドラ($dbh)を作成して、それを第1引数に渡します。第2引数は、hashref として色々渡せるものがあるのですが、これについてはそのうち解説します。

それから、この例のように Kappa のインスタンスをそのまま生成することは実はあんまりなくて、継承してプロジェクト毎にカスタマイズされた物体を作るような使い方を想定しているのですが、それは今後解説します。

以降は、$db(Kappa のインスタンス)が作成されている前提で説明していきます。

### insert
insert メソッドは INSERT 文を実行します。

{% highlight perl %}
$db->insert('detective, { id => 1, name => 'シャーロック・シェリンフォード'});
{% endhighlight %}

第1引数はテーブル名、第2引数は hashref で、値を指定します。この例だと、

{% highlight mysql %}
INSERT INTO detective (id, name) VALUES(1, 'シャーロック・シェリンフォード');
{% endhighlight %}

と等価です。もっというと、[SQL::Maker](http://search.cpan.org/dist/SQL-Maker/)というモジュールの、insert メソッドで生成される SQL
の実行結果と等価です。戻り値はありません。最後に INSERT した ID(mysql_insertid とか)は「返さない」ので、$dbh から自前で拾ってください。

### update
update メソッドは UPDATE 文を実行します。

{% highlight perl %}
$db->update('detective, { name => '譲崎　ネロ' }, { id => 1 }); #主役交代(?!)
{% endhighlight %}

第1引数はテーブル名、第2引数は hashref で、UPDATE する値を指定します。第3引数も hashref でこれは UPDATE に使うキーです。
この例だと、

{% highlight mysql %}
UPDATE detective SET name = '譲崎　ネロ' WHERE id = 1;
{% endhighlight %}

と等価です。もっというと、[SQL::Maker](http://search.cpan.org/dist/SQL-Maker/)というモジュールの、select メソッドで生成される SQL 
の実行結果と等価です。戻り値はありません。

主役が変わっちゃうと困るので戻しておきましょう。

{% highlight perl %}
$db->update('detective, {  name => 'シャーロック・シェリンフォード' }, { id => 1 });
{% endhighlight %}


### select
select メソッドは SELECT 文を実行します。

{% highlight perl %}
my $row = $db->select('detective', { id => 1 });
{% endhighlight %}

第1引数はテーブル名、第2引数は hashref で、条件を指定します。
この例だと、

{% highlight mysql %}
SELECT * FROM detective WHERE id = 1 LIMIT 1;
{% endhighlight %}

と等価です。もっというと、[SQL::Maker](http://search.cpan.org/dist/SQL-Maker/)というモジュールの、select メソッドで生成される SQL 
の実行結果に「LIMIT 1」をつけたものと等価です。戻り値ですが、Kappa の row\_object\_enable という内部変数の状態によって変わります。デフォルトは 1(TRUE)で、Row オブジェクトが有効になっています。この場合、

{% highlight perl %}
my $row = $db->select('detective', { id => 1 });
$row->id;   # => 1
$row->name; # => 'シャーロック・シェリンフォード'
{% endhighlight %}

みたいな感じで、フィールド名がメソッドになる Row オブジェクトが返ります。Row オブジェクトの詳細はそのうち説明します。
で、row\_object\_enable に 0(FALSE)を指定すると、

{% highlight perl %}
$db->row_object_enable(0);
my $row = $db->select('detective', { id => 1 });
$row->{id};   # => 1
$row->{name}; # => 'シャーロック・シェリンフォード'
{% endhighlight %}

こんな感じで、Row オブジェクトの代わりに hashref が返るようになります。

結果が複数欲しい場合は、リストコンテキストで受ければ大丈夫です。その前に、複数行返るように2件目以降のデータも入れておきましょう。
{% highlight perl %}
$db->insert('detective', { id => 2, name => '譲崎　ネロ' });
$db->insert('detective', { id => 3, name => 'エルキュール・バートン' });
$db->insert('detective', { id => 4, name => 'コーデリア・グラウカ' });
$db->insert('detective', { id => 5, name => '明智　小衣' });
{% endhighlight %}


{% highlight perl %}
my @rows = $db->select('detective', { }); # 条件指定していないから複数の結果が返ります。
$rows[0]->id;   # => 1
$rows[0]->name; # => 'シャーロック・シェリンフォード'
$rows[1]->id;   # => 2
$rows[1]->name; # => '譲崎　ネロ'
# ...
{% endhighlight %}

リストを受けると、row\_object\_enable が有効なら Row オブジェクトの配列、無効なら hashref の配列が返ります。

### コンテキストに応じない select
select メソッドはコンテキストに応じて、1行分(スカラーコンテキストの場合)か全行分(リストコンテキストの場合)を返すのですが、
戻り値をそのまま渡すような使い方をすると、ちょっと分かりにくくなります。

こういう場合は、用途に応じて、メソッドを使い分けるのがおすすめです。

1行だけ返す場合、select_row を使います。

{% highlight perl %}
my $row = $db->select_row('detective', { id => 1 });
$row->id;   # => 1
$row->name; # => 'シャーロック・シェリンフォード'
{% endhighlight %}

対象行すべてが欲しい場合、select_all を使います。

{% highlight perl %}
my @rows = $db->select_all('detective', { }); # 条件指定していないから複数の結果が返ります。
$rows[0]->id;   # => 1
$rows[0]->name; # => 'シャーロック・シェリンフォード'
$rows[1]->id;   # => 2
$rows[1]->name; # => '譲崎　ネロ'
# ...
{% endhighlight %}

select 系のメソッドはもっと色々あるので、それは今後紹介していきたいと思います。

### delete
delete メソッドは DELETE 文を実行します。一人だけ探偵じゃない人が混ざっているので、消しておきましょう。

{% highlight perl %}
$db->delete('detective', { id => 5 });# 小衣ちゃんは探偵ではない
{% endhighlight %}

第1引数はテーブル名、第2引数は hashref で、値を指定します。この例だと、

{% highlight mysql %}
DELETE FROM detective WHERE id = 5;
{% endhighlight %}

と等価です。もっというと、[SQL::Maker](http://search.cpan.org/dist/SQL-Maker/)というモジュールの、delete メソッドで生成される SQL
の実行結果と等価です。戻り値はありません。

### まとめ
今回は基本操作を紹介しました。次回は select 系のメソッドとか Row オブジェクトまわりを紹介しようかな、と思っております。

それから今回の例が若干おかしいのは仕様です。最近マイブームなのです。
