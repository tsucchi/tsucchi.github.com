Perl6 最速学習法
==========

[@tsucchi](http://twitter.com/tsucchi)


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
    + 2月に映画公開！
    	+ [劇場版 探偵オペラ ミルキィホームズ 〜逆襲のミルキィホームズ〜](http://mh-movie.com/)
    + BD Box も出るらしいので買うといいです
	    + [【劇場版公開記念】「ミルキィホームズ Blu-ray BOX」全3タイトルが発売決定！](http://mh-movie.com/news/161.html)

最近思ったこと
---
+ Perl6流行り始めているなぁ。。。

やってみる
---
とりあえずこの辺ざっと読んでみた

+ [Perl6入学式資料(日本語)](https://github.com/kazhiramatsu/perl6-entrance/blob/master/slide.md)
+ [Using Perl6日本語版](https://dl.dropboxusercontent.com/u/877032/UsingPerl6_JA.html)
+ [公式doc(英語)](http://doc.perl6.org/)


よし、だいたい分かった
---

本当か？？？
---

そんなはず無い
---

そんなはず無い
---
+ 何か作ってみないとちゃんと頭に入らない


と、いうわけで
---
+ 作ってみた
    + [p6-Acme-MilkyHolmes](https://github.com/tsucchi/p6-Acme-MilkyHolmes)

p6-Acme-MilkyHolmes
---
+ [Perl5版](https://github.com/tsucchi/p5-Acme-MilkyHolmes)の完全な移植(を目指している)
+ まだ途中だけど、実際にやってみたらとても良い題材だと思った

Acme::MilkyHolmes が学習にちょうど良い理由
---
+ テストコードがそこそこある
+ クラス階層が一応ある
+ 微妙に変なことをしている
   + 時刻を見て値を変えたり
   + `__DATA__` セクションから値を引いたり

Acme::MilkyHolmes が学習にちょうど良い理由
---
+ 「これ、どうやるんだろ？」みたいなのが色々あってちょうど良い

はまったところ(1)
---
+ POD 変数が使えない
    + [まじか！](https://gist.github.com/tsucchi/835a0da930031de4c177)
    + p5版は `__DATA__` セクションからデータを引いてたので割と困る

はまったところ(2)
---
+ YAML が読めない
    + [まじか！](https://github.com/perl6-community-modules/yaml-pm6/blob/master/lib/YAML.pm#L16-L18)
	+ p5版は `__DATA__`セクションの YAML からデータを引いていたので、割と困る

はまったところ(3)
---
+ コンストラクタから別のコンストラクタを呼ぶのがイマイチ良く分からない
    + 引数無しのコンストラクタから親の引数アリのコンストラクタを呼びたい
        + [ココで怪しい setterを呼んでるのをやめたい](https://github.com/tsucchi/p6-Acme-MilkyHolmes/blob/master/lib/Acme/MilkyHolmes/Character/SherlockShellingford.pm6#L7)
	+ Constant Method (というかクラス)なので、筋が悪いのは承知の上だけど、できないのこれ？？

まとめ
---
+ クラス周りの機能はなんとなく分かった気がする
    + まだ Role 使ってないので、これからやる(p5版もやってるし)
+ 他の機能(非同期とか)は分からん
+ 悪くない題材なので、皆さんもお気に入りの Acme モジュールを移植すると良いと思います

おしまい
===


