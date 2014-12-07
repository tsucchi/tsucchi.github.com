---
layout: post
category: perl
tags: perl hachiojipm
title: hachioji.pm &#35;45 に行ってきた
---
{% include JB/setup %}

昨日 12/6 は [hachioji.pm #45](https://atnd.org/events/59583)でした。

Docker が辛い話とか、Java の話とか、例外(?)の話とか色々してた感じですね。

僕は最近割と普通な開発しかしてなくて、休日も最近はあまり時間が取れなかったこともあって、金曜の夜から慌てて
モジュール書いてその話をしました。(あといつも通り全力でミルキィホームズを宣伝)

- [○○の話](http://tsucchi.github.io/slides/hachip/45/#/title)

[Teng::Plugin::OtogiriPluginBridge](https://github.com/tsucchi/p5-Teng-Plugin-OtogiriPluginBridge) という、Otogiri のプラグインを
Teng で使えるようにする邪悪なモジュールです。ネタっぽい感じではありますが、半分マジで作っているものです。Otogiri はコアが小さいので、全部のメソッドを Teng と
コンパチにしてもそれほど負担にならなそうなので、やってみた感じです。スライドにも書きましたが、inflate/deflate 周りは全然確認してない上、実装がめっちゃ雑なので、
多分バグっているのでは、と思います。

用途としては、開発環境とかで、(必要に応じて Reply と組み合わせたりして)、TableInfo とか DeleteCascade とか組み合わせて便利環境にしたり、
ちょっとしたデータを作ったり消したりするときに、Otogiri のプラグインを雑に使いたい、みたいなのを想定しています。(本気で使うなら、ちゃんと移植したほうが
多分いいと思うので)。

何気に、はちぴーは今年最後だったのかな？(年末に予定が合えばもう一回あったりする？)一年も早いものだ。


