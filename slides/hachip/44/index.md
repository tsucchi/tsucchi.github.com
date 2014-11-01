○○のはなし
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ ニューシングル「オーバードライブ！」11/23 発売です！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00NODGU0E&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>



で、今回のテーマについて
---
+ 何でしたっけ？

本当になんでしたっけ？
---

実はあんまりネタないんだよね...つーことで
---


雑談
==========
さいきん作ったものとかの話をします

<address>[@tsucchi](http://twitter.com/tsucchi)</address>

Otogiri::Plugin::TableInfo
---
+ こんな感じでテーブルの一覧とか、テーブル定義とか見れる物体

```perl
use Otogiri::Plugin::TableInfo;
my $db = Otogiri->new( connect_info => [ ... ] );
$db->load_plugin('TableInfo');
my @table_names = $db->show_tables();
```

Otogiri::Plugin::TableInfo
---
+ Viewは？

Otogiri::Plugin::TableInfo
---
+ 見れませんでした...

Otogiri::Plugin::TableInfo
---
+ 0.02 で show_create_view() (View 定義を一覧するメソッド)をサポート
+ 0.03 で show_views() (View の一覧を見るメソッド)をサポート

View は Pg でも[地獄は無かった](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/blob/master/lib/Otogiri/Plugin/TableInfo/Pg.pm#L21-L31)。


Otogiri::Plugin::TengPluginBridge
---
+ [Teng のプラグインを Otogiri で使えるようにするプラグイン](https://github.com/tsucchi/p5-Otogiri-Plugin-TengPluginBridge)
+ Count しか動かない

Otogiri::Plugin::TengPluginBridge
---
+ 大失敗

Otogiri::Plugin::TengPluginBridge
---
+ どうせプラグインがちゃんと動くかテストコード書くから意味なかった
+ Teng のほうが機能が多いから大変
    + Row Object のケアとか
	+ 内部のメソッド数も多いし

Otogiri::Plugin::TengPluginBridge
---
+ やるなら逆だった
+ つーことで、Teng::Plugin::OtogiriPluginBridge を作るかも


おしまい
===
