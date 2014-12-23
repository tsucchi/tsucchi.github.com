DBの自動再接続の話
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ ニューシングル「オーバードライブ！」好評発売中です！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00NODGU0E&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


DB の自動再接続とは
---
+ DB とアプリの接続が切れてしまうことがあるので、その場合に ORM やアプリ側で DB をつなぎ直すこと
+ [Teng](http://search.cpan.org/dist/Teng/) とか、よくできた ORM を使っている場合はあまり気にしなくて良い

DB の自動再接続時の主な問題
---
+ トランザクションの途中で接続が切れたらどうするか
+ prefork 型の Web サーバだと、親子で同じ接続を使うわけにいかない
    + 接続は一応使えるが、非常にややこしいバグが出るので使ってはいけない
	+ 子側で再接続する

背景(1)
---
+ [Otogiri::Plugin::AutoReconnect](https://github.com/tsucchi/p5-Otogiri-Plugin-AutoReconnect) というものを作っている
    + 現状は接続が切れていたら、つなぎ直すだけの単純な実装
	+ 先ほど説明したような問題点がありそうだ、というのはなんとなく分かっていた
    + 細かい所がよく分からないので、困っていたら...

背景(2)
---
+ [songmu さんが色々教えてくれた](http://yancha.hachiojipm.org:3000/quot?id=401835,401836,401837,401838,401839,401840,401841,401842,401843,401844,401845,401846,401847,401848,401849,401850,401851,401852,401853,401854,401855,401856,401857,401858,401859,401860,401861,401862,401863,401864,401865,401866,401868,401870,401871,401872,401873,401874,401875,401876,401877,401878,401879,401880)ので、そのへんの知見を共有したい

トランザクション
---
+ トランザクション中では再接続せず、例外を投げる

```perl
$db->txn_begin();
$db->insert('people', { ... });
... #ここで接続が切れたとする
$db->insert('item', { ... }); #この insert が再接続で有効になったら困る
$db->txn_commit();
```

prefork 型のサーバへの対応
--
+ http://nihen.hatenablog.com/entry/2011/11/17/102557
+ 親側で `$dbh->{AutoInactiveDestroy} = 1;` を設定する
    + DBI 1.6.14 以上が必要
	+ Otogiri は [DBIx::Sunny](http://search.cpan.org/dist/DBIx-Sunny/) ベースなので問題ない
	+ 上記バージョンが使えない場合は子側で InactiveDestroy というパラメータをうまく設定してやる(ちょっとめんどい)
+ pid をチェックして、親でない場合は再接続(`$dbh->clone()`)する
    + 上記のオプションが指定してあれば、これでうまく動く
	    + ...はず(まだ実際に試してない)

結論
---
+ ちゃんとやるのは結構難しそうなので、 Teng や DBIx::Class を使いましょう

あるいは
---

結論
---
+ 以上の事を踏まえて、Teng のコードを読んでみると勉強になって良いのではないか、と思います


おしまい
===
