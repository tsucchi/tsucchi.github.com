ゆるふわデータマッパーの話
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
    + [探偵歌劇ミルキィホームズTD](http://milky-holmes-anime.com/)が放送終了で悲しい難民です
    + [みるみるミルキィ](http://milky-holmes.com/unit/mirumiru/)は好評放送中なので、見ましょう！
    + 挿入歌CD「Treasure Disc」が好評発売中なので、買うと良いです

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00T1WXA00&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


背景
---
+ 最近お仕事作ったクラス設計がいい感じだったのでその共有
+ 昔こういうの見たことあるんだけど...
    + Hibernate とか流行り始める前の Java とかこんな感じだったような記憶

データマッパー
---
+ [こんな感じの仕組みらしい](http://d.hatena.ne.jp/asakichy/20120622/1340316281)
+ 真面目に作るとすごく面倒くさそう、という印象
+ 金融系とか面倒くさい基幹系システムだとこういうの、必要なのかもね...

Web アプリのDB層について(主にコンシューマ向け?)
---
+ Teng とか DBIC とか、下手すると生SQLのほうが取り回しが良くて便利だったりとか
+ ロジックの複雑さはあまり考慮する必要がない
    + 諸説あります(複雑なのも、もちろんある)
+ どちらかというとパフォーマンス重視

業務系とか、業務系っぽい Web アプリのDB層について
---
+ パフォーマンスはあんまりいらない
    + 諸説あります(必要なのも、もちろんある)
+ ロジックは複雑になりがち
    + 10年モノとかザラですし...
+ 複雑なロジックに立ち向かう仕組みがある程度必要

良くある O/R Mapper を使ってて困ること
---
+ [クラステーブル継承](http://d.hatena.ne.jp/asakichy/20120806/1344204583)みたいな構造を作りたいのだけど、これができない
    + できないわけじゃないんだけど、いろいろ不便
    + ORM のクラスを継承しちゃっていいのかよくわからない、というかダメな気がする

サンプル
---
+ みなさんご存知のテーブルを使いましょう

```sql
CREATE TABLE person ( /* 人間 */
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT    NOT NULL,
);

CREATE TABLE detective ( /* 探偵 */
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id INTEGER NOT NULL,
  toys      TEXT  NOT NULL,
  FOREIGN KEY(person_id) REFERENCES person(id)
);

CREATE TABLE police ( /* 警察 */
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  person_id INTEGER NOT NULL,
  iq        INTEGER,
  FOREIGN KEY(person_id) REFERENCES person(id)
);
```

テーブルとふつうにマッピングすると困ること(1)
---
+ なにも考えてないと、親の情報が取れない

```perl
my $row = $db->single('detective', { person_id => 100 });
$row->name; #これは無理(name は親テーブル person にあるから)
```

テーブルとふつうにマッピングすると困ること(2)
---
+ Factory とかでちょっと凝った生成とかできない
    + できなくもないのかも、だけどあんまやらない
+ ので、ポリモーフィズムが使えない
    + 使えるのかもだけど、あんまやらない

```perl
my $row = $db->create({ id => 100 }); # id=100が探偵さんだとして
$row->toys; #これができない(あるいはちょっとめんどい)
```

解決策
---

ゆるふわデータマッパー
---

やりかた
---
+ テーブルと対になるクラスを用意する
    + 基本はこれだけ
+ ロジックが複雑じゃなければ、作らなくてもいい
+ 逆に複雑な場合は別の中間層が必要になることもある
    + あるいはそれが必要になって、「テーブル足りなくね？」みたいなことに気づくことも
+ 例) 「探偵チーム」が必要になって、クラスかテーブルを追加する

こんな感じ(1)
---
+ DB 層のクラスからは独立してるので、Mouse とか使うのもアリ
+ 継承するのも自由(というか、それが一番やりたい)

```perl
package Detective;
use Mouse;
extends 'Person';
...
```

こんな感じ(2)
---
+ コンストラクタ(new)は単純にフィールドに値をセットするだけにしておく
+ ファクトリメソッド(create)を別途作成する
    + ファクトリメソッドの時は DB を引く
	+ 必要に応じて、サブクラスを返す仕組みにしたりとか
+ テストコードでは、基本 new を使うようにしておくと楽
+ 子でも使用する親クラスの情報は渡しておくと楽

こんな感じ(3)
---
```perl
package Person
use Mouse;
...
sub create {
	my ($class, $id) = @_;
	# 区分を親側で持っておいて、親の$row を子に渡して、
	# 子側で自分のテーブルを引く方が使いやすくてオススメではあります。下記のは説明用
	my $person_row = db->single('person', { id => $id });
	my $detective_row = db->single('detective', { person_id => $id });
	if ( defined $detective_row ) { #探偵が返る。name も引ける
        return Detective->create($person_row->name, $detective_row);
    }

	my $police_row = db->single('police', { person_id => $id });
    if ( defined $police_row ) { #警察が返る
	    return Police->create($person_row->name, $police_row);
    }
    die "探偵でも警察でもないのはダメダメですー"
}
```

更新とか
---
+ 適当にメソッド生やして随時やる
+ トランザクションも随時
+ それゆえの「ゆるふわ」
+ 全体的にきちんと管理したいなら、それなりの仕組みを用意したほうがよさそう


結論
---
+ 割と使いやすくて、実装も面倒ではなくていい感じです
+ これの名称知ってる方います？

おしまい
===


