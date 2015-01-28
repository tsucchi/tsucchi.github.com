Otorigi の自動再接続のはなし
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ [探偵歌劇ミルキィホームズTD](http://milky-holmes-anime.com/)好評放送中

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00NODGU0E&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

はじめに
---
+ 以前 Perl Beginners で話した内容の続きです。一部重複もあります
+ [DBの自動再接続の話 (2014/12/22)](http://tsucchi.github.io/slides/pb/2014-12-22-auto_reconnect/#/title)

背景
---
+ [songmu さんが色々教えてくれた](http://yancha.hachiojipm.org:3000/quot?id=401835,401836,401837,401838,401839,401840,401841,401842,401843,401844,401845,401846,401847,401848,401849,401850,401851,401852,401853,401854,401855,401856,401857,401858,401859,401860,401861,401862,401863,401864,401865,401866,401868,401870,401871,401872,401873,401874,401875,401876,401877,401878,401879,401880)話を中心に PB で話した
+ PB で発表したあと、[@nihen](https://twitter.com/nihen)さんからもアドバイスもらった
+ で、そのへんのフィードバックを元に Otogiri に自動再接続を実装しましたよ、というお話です

<blockquote class="twitter-tweet" lang="ja"><p>自動再接続の話だとあとは DBIx::Connector をみるとよいとおもいます。see also: <a href="https://t.co/MoVr7bdi16">https://t.co/MoVr7bdi16</a> <a href="https://t.co/m8yceDnGCr">https://t.co/m8yceDnGCr</a> / “Perl Beginne…” <a href="http://t.co/1U6F7MVhvi">http://t.co/1U6F7MVhvi</a></p>&mdash; Masahiro Chiba (@nihen) <a href="https://twitter.com/nihen/status/547369141636575233">2014, 12月 23</a></blockquote>
<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>

DB の自動再接続とは
---
+ DB とアプリの接続が切れてしまうことがあるので、その場合に ORM やアプリ側で DB をつなぎ直すこと
+ [Teng](http://search.cpan.org/dist/Teng/) とか、よくできた ORM を使っている場合はあまり気にしなくて良い

Otogiri の自動再接続について
---
+ まず Plugin として実装した
    + [Otogiri::Plugin::AutoReconnect](https://github.com/tsucchi/p5-Otogiri-Plugin-AutoReconnect)
+ ある程度動作確認した上で、[Otogiri](http://search.cpan.org/dist/Otogiri/) 本体に [p-r](https://github.com/ytnobody/Otogiri/pull/13) (>= 0.15)
+ なので Plugin は使わないこと！


DB の自動再接続時の主な問題
---
+ トランザクションの途中で接続が切れたらどうするか
+ prefork 型の Web サーバだと、親子で同じ接続を使うわけにいかない
    + 接続は一応使えるが、非常にややこしいバグが出るので使ってはいけない
	+ 子側で再接続する
+ ORM でどこまでやるか決める
    + ダメな場合に die するだけでよいか、subref わたしてほげほげしたいとか？ etc

トランザクション
---
+ トランザクション中では再接続せず、例外を投げる
+ [DBIx::TransactionManager](http://search.cpan.org/dist/DBIx-TransactionManager/) を使っている場合は `in_transaction()`というメソッドがあるので、それでチェックすれば良い

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
    + clone もバグがあって、古い DBI だとその対応が必要
	    + Tengはやってるが、Sunny の前提の DBI だと大丈夫

失敗時の対応について
---
+ Otogiri ではできる限り再接続、NG な場合は die するようにしています
    + Teng と同じアプローチ
+ Teng は一時(0.14系列の experimental release) ではエラーになったクエリを再実行する fixup というモードがあった
    + 0.15 がリリースされた際には無くなった
    + やめた背景は[このへん](https://github.com/nekokak/p5-Teng/issues/66)らしいです

テストについて
---
+ 基本的には SQLite でクエリを投げたりして確認してる
    + [t/15_auto_reconnect.t](https://github.com/ytnobody/Otogiri/blob/master/t/15_auto_reconnect.t)
+ 今回、スタブとして[Mock::Quick](http://search.cpan.org/dist/Mock-Quick/) というモジュールを使ってみた
    + [Mock::Quick というモジュールがいい感じ](http://tsucchi.github.io/perl/2015/01/11/mock-quick/)


実装について
---
+ やり方を理解して、やることを決めてしまえば、割とシンプル
    + fork 対応のための PID の記録
	+ 再接続周りの対応
        + トランザクションチェック
		+ PID 違う場合(fork)の再接続
+ https://github.com/ytnobody/Otogiri/pull/13/files

結論
---
+ 基本的に自前でやるべきものではないです
+ どうしても必要な場合とか、ORM のソースを読む際の参考になれば嬉しいです
+ 古い DBI だと一部地獄っぽい対応が必要になるので、可能であれば新しめの DBI (あるいは [DBIx::Sunny](http://search.cpan.org/dist/DBIx-Sunny/))を前提としたほうがいいです


おしまい
===


