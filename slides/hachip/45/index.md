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
+ ニューシングル「オーバードライブ！」好評発売中です！
+ http://milky-holmes-anime.com/

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00NODGU0E&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>



で、今回のテーマについて
---
+ 何でしたっけ？

本当になんでしたっけ？
---

ってか最近テーマって忘れられてません？
---
+ まあいいや

ネタがないので、はちぴーのためにモジュール書いたよ！
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>

最近は地味なリファクタリングとかしてます

前回のはちぴー！
---

Otogiri::Plugin::TengPluginBridge
---
+ [Teng のプラグインを Otogiri で使えるようにするプラグイン](https://github.com/tsucchi/p5-Otogiri-Plugin-TengPluginBridge)
+ Count しか動かない
+ 大失敗

Otogiri::Plugin::TengPluginBridge
---
+ やるなら逆だった
+ つーことで、Teng::Plugin::OtogiriPluginBridge を作るかも

と、いうわけで
---
作ってみた

Teng::Plugin::OtogiriPluginBridge
---
+ https://github.com/tsucchi/p5-Teng-Plugin-OtogiriPluginBridge
+ さっき出来たばかりなので、あんまり試してないけど、割とちゃんと動くっぽい
+ inflate/deflate は実装が雑だし、確認もしてないので、多分バグってます

Teng::Plugin::OtogiriPluginBridge
---
+ とりあえず自分が使いたいと思ってる TableInfo と DeleteCascade が動くので満足

昨日の出来事
---
```
$ ./hoge_script.pl
Error: メールアドレスがないユーザがいます
```

昨日の出来事
---
```
$ reply
> Delete_cascade('user', { email => undef });
> Delete_cascade('user', { email => '' });
```
<img src="./syoudoku.jpg">

昨日の出来事
---
+ やっぱり便利ですね

Teng::Plugin::OtogiriPluginBridge
---
+ [ちなみに...](https://github.com/tsucchi/p5-Teng-Plugin-OtogiriPluginBridge/blob/master/t/01_methods.t#L15)

Teng::Plugin::OtogiriPluginBridge
---
+ `suppress_row_object => 1` で `fields_case => 'NAME'` なら、Teng も Otogiri も大して変わらないのでは？疑惑

まとめ
---
+ 荒削りだけど、Otogiri のプラグインが Teng でも使えるっぽい感じになりました
+ アプリでこれを使うのは不安すぎだけど、Reply 環境とか、開発環境で使うちょっとしたスクリプトならいいのかも


おしまい
===
