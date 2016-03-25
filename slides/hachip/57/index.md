最近のお仕事の話
==========

推しごとじゃないよ！
[@tsucchi](http://twitter.com/tsucchi)


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
    + 劇場版、絶賛公開中です！
    	+ [劇場版 探偵オペラ ミルキィホームズ 〜逆襲のミルキィホームズ〜](http://mh-movie.com/)
    + BD Box も好評発売中！
	    + [【劇場版公開記念】「ミルキィホームズ Blu-ray BOX」全3タイトルが発売決定！](http://mh-movie.com/news/161.html)

最近の話
---


とにかく劇場ミルキィが最高すぎて、その話ばかりしている
---

とにかく劇場ミルキィが最高すぎて、その話ばかりしている
---
+ [(ネタバレなし)「劇場版 探偵オペラ ミルキィホームズ 〜逆襲のミルキィホームズ〜」はココが凄い！](http://tsucchi.github.io/milkyholmes/2016/02/28/milky1)
+ [(注意ネタバレ有り)「劇場版 探偵オペラ ミルキィホームズ 〜逆襲のミルキィホームズ〜」が最高に良かった件](http://tsucchi.github.io/milkyholmes/2016/02/28/milkyholmes)
+ [ミルキィはいいぞ](http://tsucchi.github.io/milkyholmes/2016/03/05/milkyholmes)
+ [ミルキィホームズ第2幕の話](http://tsucchi.github.io/milkyholmes/2016/03/13/milky-2nd)

大体こんな感じ
---
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">(1)何も考えずに笑って観る -&gt; (2)ちょっと気になったところを注意して観る -&gt; (3)前回で観きれなかったところやtwitter で見た情報をもとに見直す -&gt; (2)に戻る という無限ループをしている</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/711520014927400960">2016年3月20日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


と、いうわけで
---
最近のミルキィの話は大体できたので、仕事っぽい話をします。

最近やってること
---
Selenium WebDriver(Perl なので[Selenium::Remote::Driver](http://search.cpan.org/dist/Selenium-Remote-Driver/) )で E2E テストを整備してました

背景
---
1. 諸事情により自主規制
2. 「Selenium デザインパターン&ベストプラクティス」という本が良かったので、ここに書いてあることを試してみたくなった

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=4873117429&ref=tf_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

「Selenium デザインパターン&ベストプラクティス」に書いてある事
--
+ 最初は雑というか、ad hoc なテストコード
+ 共通処理をまとめたり
+ 安定させる処理を入れたり
+ Fixture を入れたり
+ ページオブジェクトを作ったり

当たり前の事なんだけど、地道にちゃんとやっていて良い
--

安定化
--
+ 検証に使う文字列をなるべく一意になるように日付とかをいい感じに入れる
    + 一意なIDとかあればそれが使えるけど、「商品名」とかだとありえんし
	+ 僕はめんどくさいのでUUIDつけてる
+ 危なっかしい場所や Ajax には wait and retry 
    + 幸い(?)弊社は JS でぐりぐりやる処理はほぼないので、頑張らなくても割と平気だった

Fixture
--
+ 自作のデータローダーを使っている
    + [Test::DataLoader](https://github.com/tsucchi/p5-Test-DataLoader)
+ (今は)後でデバッグしやすいように、ロードしたデータは消さずに残している
    + 消す事もできる

ページオブジェクト(1)
--
+ Webサイトの1ページに対応するオブジェクト
+ テストコード側には WebDriver の生の処理(CSS Selectorとか)は書かないで、ページオブジェクトの操作のみ行うようにする

ページオブジェクト(2)
--
[この超有名な Web サイトで説明](http://milky-holmes.com/)

ページオブジェクト(3)
--
+ 「ボタンを押す」、とか「リンクをクリック」とかの操作がメソッドになる
+ メニューとかは、最初は気張らずに配列とかで雑に返しても平気
+ テストが充実してくると、「メニュー」とか「ブロック」とかをオブジェクトにしたくなるのでやる

コツ(1)
--
+ とにかく気張らない
    + 最初は雑に WebElement(Selenium::Remote::Driver において要素を表すクラス)とかを返しても良い
    + 実装中は気にせずテストコードから CSS セレクタとか投げても気にしない
    + だんだん綺麗にして、最終的に全部ページオブジェクトに寄るようにする

コツ(2)
--
+ ページ遷移が複雑で意味わからなくなったら、phantomjs やめてデスクトップの Firefox とかにつなぐ
    + その切り替えをやりやすくするためにラッパーを書いた
	+ [Selenium::DriverFactory](https://github.com/tsucchi/p5-Selenium-DriverFactory)

コツ(3)
--
+ CI 回す
    + CI すると効果を実感してもらえるので、自分以外の人もテストを書いてくれるようになる


効果
---
+ 派手にぶっ壊した時にすぐ気づけた
+ 仕様バグを見つけた
+ ステージングの環境更新失敗にすぐ気づいた

まとめ
---
+ [劇場ミルキィ](http://mh-movie.com/)最高です！
+ E2E テスト書くといい事あるよ！

おしまい
===


