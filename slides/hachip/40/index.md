非同期のはなし(?)
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ 最近は `Acme::MilkyHolmes` という素敵なモジュールの開発をしています

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

で、今回のテーマについて
---
+ 何でしたっけ？

非同期だっけ？
---

非同期処理について
---
+ `Reply でバックグラウンドのジョブを走らせる君`が欲しいので誰か書いてください

以上！
---

Reply の話(2)
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>

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
    + 「a.pl 書いてお試し」、みたいなのが無くなった
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

色々便利な物体があるので、試してみてください
---
+ [Reply::Plugin::Otogiri](https://github.com/papix/Reply-Plugin-Otogiri)
    + Otogiri の関数が使える(papix氏作)
	+ Reply::Plugin::ORM ってのも最近できた！(ごめん、まだ試してない)
+ [Reply::Plugin::DataDumperAutoEncode](http://tsucchi.github.io/perl/2014/04/04/reply-plugin-datadumper-autoencode)
    + 出力を自動エンコードしてくれる物体(俺氏作)
+ [Reply::Plugin::StandardPrompt](http://tsucchi.github.io/perl/2014/04/10/reply-plugin-standardprompt)
    + シェルみたいなカスタマイズ可能なプロンプトを提供する(俺氏作)
+ [Otogiri::Plugin::DeleteCascade](http://tsucchi.github.io/perl/2014/02/27/otogiri-plugin-deletecascade)
    + 外部キーを無視して DELETE できる最高のツール(俺氏作)


本題
---
+ SQL 投げたりして、DB のシェルみたいに使ってるから、テーブル定義見たい気がする

よし、作ろう
---
+ [Otogiri::Plugin::TableInfo](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo)

地獄の話
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


まずは DBMS 毎にどのようにテーブル定義を取得するか見てみましょう
---

MySQL
---
+ 下記でパツイチ。最高！

```perl
my ($create_table_ddl) = $self->search_by_sql("SHOW CREATE TABLE $table_name");
```

SQLite
---
+ 下記で取れる。楽勝！

```perl
my $inspector = DBIx::Inspector->new(dbh => $self->dbh);
my $table = $inspector->table($table_name);
my $create_tabl_ddl =  $table->{SQLITE_SQL};
```

PostgreSQL
---
+ そんなものはない！

え？まじ？
---
+ 探せばコマンドあるっしょ？
+ 多分あんま知られてないAPIとかあって、pg\_admin3 とか pg\_dump とかはそれ叩いてるんでしょ？

そんなものは無かった orz
---
+ ぐぐっても `pg_dump` 叩けとかそんなんばかり
+ ひどいのだと、`\d テーブル名` とか書いてあるけど、それテーブル定義じゃねーだろ！

そしてトドメ
---
+ pgadmin3-1.18.1/pgadmin/schema/pgDatabase.cpp

```c++
sql = wxT("-- Database: ") + GetQuotedFullIdentifier() + wxT("\n\n")
      + wxT("-- DROP DATABASE ") + GetQuotedIdentifier() + wxT(";")
      + wxT("\n\nCREATE DATABASE ") + GetQuotedIdentifier()
      + wxT("\n  WITH OWNER = ") + qtIdent(GetOwner())
      + wxT("\n       ENCODING = ") + qtDbString(GetEncoding());

```

無ければつくるしかない
---
+ [最初の実装](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/blob/fe3b45bcdc1b7321e6628ffc7fac1d93b5c59417/lib/Otogiri/Plugin/TableInfo/Pg.pm#L40-L66)
    + `pg_dump` を叩いて結果を成形する、というめっちゃ雑な実装
	+ とはいえ、機能としては十分なので、最初の1週間くらいはコレを使ってた

無ければつくるしかない
---
+ [作業ブランチ](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/commits/desc)
    + ちょっと荒れ気味のコミットメッセージとどうでも良い知見が得られる
        + index 定義は pg_dump は何故か加工してるっぽい(DBから取れるのに)とか
        + 一意制約貼るとき、名前が index かそうじゃないかで、何故か表示が変わるっぽい(機能は多分同じ)とか

工夫したこと
---
+ 最終的な実装は DBIx::Inspector で解析したカラム情報を元に CREATE TABLE 文を組み立ててるので、変な事にならないようにテストを頑張る
    + `pg_dump` で出したやつと比較して一致するか
	+ 結構アレな実装なのに、カバレッジ96%ある
+ [eg/compare.t](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/blob/master/eg/compare.t)
    + 実テーブルを使って比較するためのスクリプト


まとめ
---
+ 結構大変だったけど、その後沢山使ってるので、苦労には見合ったかな、と思う
+ 地獄っぽいけどやる事はシンプルなので、何とかなった感じ

まとめ
---
+ `冒険☆ミルキィロード!! まだ買ってない方は是非買ってください`

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>




おしまい
===
