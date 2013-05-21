---
layout: post
category: test
tags: perl test
title: テストコード内でタイムアウトさせる
---
{% include JB/setup %}
ちょっと前にニート生活してた頃、JUnit 実践入門という本を読みました。

<iframe src="http://rcm-jp.amazon.co.jp/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=477415377X&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

で、ルールというアノテーションを使った機能があって、その中で、「Timeout」というルールがあることを知りました。テストに時間がかかりすぎたり、無限ループした場合にタイムアウトして落とす、という機能だそうで。めっちゃ便利そうやん。

「Perl でできるかなー？」と思って調べたけど、軽くぐぐった感じではそういうモジュールは無いらしい。(RFE は上がっていたが)。移植性とか考えなくていいなら、下記でいけるっぽい。

```perl
subtest '長い時間かかったり、無限ループしたり、ハングったりするかもしれないテスト', sub {
    local $SIG{ALRM} = sub { die "timeout" };
    alarm 3; # 3秒でタイムアウト
	... # テスト本処理
};
```

本当は Test::More がプラガブル(2.0からそうなるんだっけ？)になって、プラグインでこういうの出来るとかっちょいいと思うんですけどね。

- [JUnit 実践入門の書評](http://booklog.jp/users/tsucchi/archives/1/477415377X)
- [練習問題を Perl でやってみた(面倒くさくなって、最後の方はやってない)](https://github.com/tsucchi/junitbook)


