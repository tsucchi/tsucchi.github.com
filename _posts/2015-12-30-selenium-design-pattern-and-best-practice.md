---
layout: post
category: test
tags: selenium ruby test 書評
title: 書評 Selenium デザインパターン&ベストプラクティス
---
{% include JB/setup %}
End to End のテストを整備したいなー、と最近思っていて、Selenium とかの関連書籍を読んだり Web を調べたり色々していたのだけど、そしたら「とんでもない掘り出し物」を見つけたのでご紹介。

[Selenium デザインパターン&ベストプラクティス](http://www.amazon.co.jp/gp/product/4873117429/ref=as_li_tf_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4873117429&linkCode=as2&tag=tsucchisblog-22)

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=4873117429&ref=tf_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

めっちゃいい本でした。久々の大当たり。

内容紹介はこんなことが書いてあるのだけど、これ説明がたぶんあんまり良くない。(書いてある事は正しい)

```
本書はSelenium WebDriverを使ったテストの構築方法やデザインパターン、メンテナンス性に焦点を当てた書籍です。
Seleniumを使った人ならわかるテスト時の取り入れるべき事柄や避けるべき事柄をパターン化してわかりやすく解説しています。
テストをリファクタリングする方法、自動テストプロジェクトにおけるSpaghettiパターン、テストデータについて、テストを安定させるコツ、さらにテストスイートを成長させるヒントなど、テスト自動化設計におけるポイントを幅広く紹介します。
ベストプラクティスだけでなく、アンチパターンも紹介しているため、失敗の原因を知り、適切な設計パターンを適用することができるようになります。
```

これだと、Selenium 興味ある人しか読まないと思うんだけど、ぜんぜんそんな事なくて、「テストコード書くすべてのエンジニア」が読むべき本だと思います。つまりこの本の本質は 3行目に書いてある

```
テストをリファクタリングする方法、自動テストプロジェクトにおけるSpaghettiパターン、テストデータについて、テストを安定させるコツ、さらにテストスイートを成長させるヒントなど、テスト自動化設計におけるポイントを幅広く紹介します。
```

の部分であり、要するに「綺麗で安定してメンテナンス性の高いテスト」の書き方が書いてある本なのです。題材が Selenium なだけで、「良いテストコードの書き方を示している本」なのです。


最初は ad hoc な「とりあえずハードコーディングでページにアクセスして、ポチポチして中身があってるか比較」みたいなテストから始まります。(Spaghettiパターンとして紹介されている書き方)。それをメソッド抽出などしてリファクタリングしつつ、テストデータを fixture にまとめて、最終的に綺麗なページオブジェクトにまとめていく過程が1章〜4章に書いてあります。ここだけでもめっちゃ価値があって良いです。(ページ数で半分弱)。

こういう「良いテストの書き方」や「テストコードを改善していく方法」を紹介している本ってあまりなくて、個々のトピックとしてテストのリファクタリングや fixture について触れているものは無くはないのだけど、「じゃあそれどうやってやるの？」っていうのが分からなくて、結局自己流になってしまいがちだったので、それが分かりやすく書いてあるのは本当にとても良いと思いました。

と、いうわけで、テストコードの入門書の一つとして、冬休み課題図書としていかがでしょうか。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=4873117429&ref=tf_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

なお、この本で扱っていないトピックとしては、「テスティングフレームワークの使い方」(一応 Test::Unit とか Cucumber とかの紹介はしているけど、この本は「なるべくそういうのから独立して書く」事にフォーカスしてる)とか「カスタムアサーション」(これもテスティングフレームワーク寄りの話か)みたいな、テストコード側のテクニックとか、「モック・スタブの使い方/作り方」(ちょっと触れてるけどあんまりない)あたりかな。

そういうの期待している方は別の本を探しましょう。(僕も知りたい)

ではでは。
