Otogiri の話 応用(?)編
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ いつもはココでミルキィホームズの新曲とか紹介してるのですが
    + 今日は時間ないし、新発売なモノが無いので省略で


Otogiri について
---

Otogiri について
---
+ 僕も昔似たようなやつを作ってた
    + [SQL::Executor](http://search.cpan.org/dist/SQL-Executor/)
+ 出来る事は結構似ている
    + SQL::Maker ベースで insert/update/select/delete を簡単にできる感じの物体
    + 自作の ORM のベースクラスにしていたので、無駄に複雑だったりする
	+ DBIx::Sunny ベースじゃない
+ SQL::Executor を拡張するのを頑張ってもよかったのだけど、Otogiri 良さそうだったから乗っかってみた


Otogiri::Plugin について
---

Otogiri::Plugin
---
+ コアが小さいのが Otogiri の良さだと思う
+ けど、機能が足りないのはやっぱつらい
+ 足りないものは足せばよい
+ よし、プラグインだ！


プラグインについて
---
+ 例) [Otogiri::Plugin::DeleteCascade](http://search.cpan.org/dist/Otogiri-Plugin-DeleteCascade)
    + FK をたどって、親を消すと子も一緒に削除する `delete_cascade()` というメソッドが使えるようになる

```perl
use Otogiri;
use Otogiri::Plugin;

my $db = Otogiri->new( connect_info => ["dbi:SQLite:dbname=$dbfile", '', '', { RaiseError => 1, PrintError => 0 }] );
$db->load_plugin('DeleteCascade');

$db->delete_cascade('person', { id => $person_id }); # delete_cascade が使えるようになる
```

プラグインの仕組み
---
+ Teng 等と同じように、Otogiri のネームスペースにメソッドが生える仕組み
+ Plugin の書き方は Teng とか SQL::Maker と同じ
+ というか、Teng とか SQL::Maker の実装をパク(ry


プラグインの書き方
---
+ 実際のプラグインを見た方がよいかも
+ [Otogiri::Plugin::DeleteCascade](https://metacpan.org/source/TSUCCHI/Otogiri-Plugin-DeleteCascade-0.04/lib/Otogiri/Plugin/DeleteCascade.pm)
+ `use Otogiri::Plugin;` して、@EXPORT に提供したいメソッド名を書いて、それを実装するだけ


便利な Plugin とか
---
+ [Otogiri::Plugin::DeleteCascade](https://metacpan.org/pod/Otogiri::Plugin::DeleteCascade)
    + さっき紹介したやつ
	+ FK をたどって親からデータ削除ができる
+ [Otogiri::Plugin::TableInfo](https://metacpan.org/pod/Otogiri::Plugin::TableInfo)
	+ MySQL で言う所の、show create table とか show tables みたいなやつ
	+ PostgreSQL の実装が大変で泣いた => [hachioji.pm のスライド](http://tsucchi.github.io/slides/hachip/40/)
+ [Otogiri::Plugin::BulkInsert](https://metacpan.org/pod/Otogiri::Plugin::BulkInsert)
    + バルクインサートができるやつ
+ [Otogiri::Plugin::QueryWithNamedPlaceholder](https://github.com/tsucchi/p5-Otogiri-Plugin-QueryWithNamedPlaceholder)
    + 名前付きプレースホルダを使って、SQL を投げれるやつ(`search_named`/`do_named`)
	+ 作ってみたけど、使ってないので github 止まりになっている


Otogiri と Reply との組み合わせ
---

Reply との組み合わせ
---
+ Reply(REPL)と組み合わせると、めっちゃ便利です

Reply について
---
+ [Reply is awesome!](http://blog.64p.org/entry/2013/06/07/180316)
+ 知らない方のために簡単に説明すると、「irbみたいなやつ」です

```
tsucchi@surreal[620]$ reply
reply@surreal.local[0]> 
reply@surreal.local[1]> 1 + 1
$res[0] = '2'

reply@surreal.local[2]> $a = 123
$res[1] = '123'

reply@surreal.local[3]> $b = 456
$res[2] = '456'

reply@surreal.local[4]> $a + $b
$res[3] = '579'

reply@surreal.local[5]> rand()
$res[4] = '0.0647113826862586'

reply@surreal.local[6]> exit
```

Reply is 便利
---
+ 結構便利
    + 「a.pl 書いてお試し」、みたいなのが減った
+ ORM と組み合わせると最高便利っぽい
    + [REPLでORMを使えるようにすると、めっちゃ便利だ、という話](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri/)

```
% reply-service1
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'シャーロック・シェリンフォード',
    age => 15,
    toys => 'サイコキネシス',
    birthday => '3/31',
}
```

ORM との組み合わせの前に、ちょっと紹介
---
+ [Reply::Plugin::DataDumperAutoEncode](https://metacpan.org/pod/Reply::Plugin::DataDumperAutoEncode)
+ [Reply::Plugin::DataDumperAutoEncode ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/04/reply-plugin-datadumper-autoencode/)

DataDumperAutoEncode
---
こういうのが...

```
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => "\x{30b7}\x{30e3}\x{30fc}\x{30ed}\x{30c3}\x{30af}\x{30fb}\x{30b7}\x{30a7}\x{30ea}\x{30f3}\x{30d5}\x{30a9}\x{30fc}\x{30c9}",
    age => 15,
    toys => "\x{30b5}\x{30a4}\x{30b3}\x{30ad}\x{30cd}\x{30b7}\x{30b9}",
    birthday => '3/31',
}
```

DataDumperAutoEncode
---
こうなる。超便利！

```
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'シャーロック・シェリンフォード',
    age => 15,
    toys => 'サイコキネシス',
    birthday => '3/31',
}
```

Reply::Plugin::ORM
---
+ この人がつくったやつ

<img src="./papix.jpg" width="50%" height="50%">

Reply::Plugin::ORM
---
+ Reply の環境で、Otogiri や Teng が使えるようになるプラグイン
+ Demo

便利な所
---
+ Oracle みたいにデフォルトの CLI がつらい場合(僕は Oracle 使ってないけど)
+ delete_cascade で開発環境の変なデータを掃除したり
+ inflate を定義して、base64 とかバイナリとか、DB から見づらいデータを見えるようにしたり


Otogiri::Plugin の良くない所
---
+ どのメソッドがどこに定義されてるか分からなくなる
+ Otogiri の内部を知っていないと書けない

僕が考える Otogiri の今後
---
1. Plugin からコアに引き上げれるものが出てくると、いい感じかなぁ、と思う
2. 「Web アプリではこの Plugin」、「DBA が使うのはこの Plugin」みたいな感じでグルーピングできるとよさそう
3. 良いものなので、ユーザが増えるといいなぁ

まとめ
---
+ Otogiri::Plugin を使うといい感じに拡張できます
+ 拡張しなくても Otogiri 自体が結構便利なので、使うと良いです
+ Reply と組み合わせるとめっちゃ便利なので、試してみると良いです


おしまい
===
