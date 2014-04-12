パーサーのはなし(?)
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ ミルキィホームズの新曲「冒険☆ミルキィロード!!」4/30発売予定！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

で、今回のテーマについて
---
+ 何でしたっけ？

パーサーだっけ？
---

パーサーについて
---
+ ○○社が送付するクソのような PS ファイルをパースする話とか...
+ △△社が送付するクソのような Excel ファイルをパースする話とか...

してもいいですが、炎上したりすると困るので、最近の話をします
---

Reply の話
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

Reply is MORE 便利
---
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

Reply を More More 便利に使うための Tips
---
+ `no strict 'vars'`
    + スクリプト書くときは strict 指定するのは基本ですが、Reply だと若干うざい
+ `[LoadClass]`
    + use しなくても`よしな`にロードしてくれる物体

Reply を More More More 便利に使うための Tips
---
+ [Reply::Plugin::Otogiri](https://github.com/papix/Reply-Plugin-Otogiri)
    + Otogiri の関数が使える(papix氏作)
	+ もっとジェネリックな Reply::Plugin::ORM ってのも作ってるっぽいので期待
+ [Reply::Plugin::DataDumperAutoEncode](http://tsucchi.github.io/perl/2014/04/04/reply-plugin-datadumper-autoencode)
    + 出力を自動エンコードしてくれる物体(俺氏作)
+ [Reply::Plugin::StandardPrompt](http://tsucchi.github.io/perl/2014/04/10/reply-plugin-standardprompt)
    + シェルみたいなカスタマイズ可能なプロンプトを提供する(俺氏作)
+ [Otogiri::Plugin::DeleteCascade](http://tsucchi.github.io/perl/2014/02/27/otogiri-plugin-deletecascade)
    + 外部キーを無視して DELETE できる最高のツール(俺氏作)


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

StandardPrompt
---
+ Reply 本体に付属する FancyPrompt というプラグインがあるが、あんまファンシーじゃない
+ bash でいうと下記相当

```
export PS1="\!> "
```

StandardPrompt
---
+ StandardPrompt を使うとプロンプトをカスタマイズできる


```
[StandardPrompt]
prompt='reply@' . Show_dbname() . "[$history_count]> "
```

```
reply@myservice[10]> 
```

+ [Reply::Plugin::StandardPrompt ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/10/reply-plugin-standardprompt/)

Otogiri::Plugin::DeleteCascade
---
+ Reply とは直接関係ないんだけどね

Otogiri::Plugin::DeleteCascade
---
+ Reply とは直接関係ないんだけどね
+ 僕が Reply と ORM の組み合わせ運用始めるにあたって欲しかったので頑張って書いたツール
+ FK のあるテーブルに対して、親を消すと依存する子も一緒に消してくれる

Otogiri::Plugin::DeleteCascade
---
```perl
use Otogiri;
use Otogiri::Plugin;
 
Otogiri->load_plugin('DeleteCascade');
 
my $db = Otogiri->new( connect_info => $connect_info );
$db->insert('parent_table', { id => 123, value => 'aaa' });
$db->insert('child_table',  { parent_id => 123, value => 'bbb'}); # child.parent_id referes parent_table.id(FK)
 
$db->delete_cascade('parent_table', { id => 123 }); # both parent_table and child_table are deleted.
```


まとめ
---
+ Reply 便利なので、使うと良いです
+ 設定を工夫すると色々便利なので、やってみると良いと思います
+ プラグイン書くのもそんなに大変じゃないので、やってみると良いと思います

まとめ
---
+ `冒険☆ミルキィロード!!買いましょう！`

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>




おしまい
===
