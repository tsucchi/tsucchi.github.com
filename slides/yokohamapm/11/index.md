最高のテストデータの話
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


テストデータ、作ってますか？
---

めんどくさいですよね？
---
+ 項目が決まっている所は、普通に正しいデータを入れれば良い
+ 「何でも良いけど、NULLはダメ」みたいなやつがめんどくさい
    + 「あああああ」とか入れるのも微妙だし


そんな中、Ruby の世界に奇才が現れた
---
+ id:sue445氏([@sue445](https://twitter.com/sue445))
+ [Faker::Precureというgemを作りました - くりにっき](http://sue445.hatenablog.com/entry/2014/04/23/101433)

```
業務で堂々と rubicure を使いたくなったのでプリキュアでテストデータを作るためのgemを作りました。所要時間2時間くらい
```

なるほど、これは良い
---

ところで
---
+ プリキュアでテストデータを作るのもなかなか良いと思いますが、最高のテストデータとは何だろう？

三段論法で考えてみよう
---

三段論法
---
+ `ミルキィホームズは最高である`


三段論法
---
+ ミルキィホームズは最高である
+ `ミルキィホームズを使ってテストデータを作る事は可能である`


三段論法
---
+ ミルキィホームズは最高である
+ ミルキィホームズを使ってテストデータを作る事は可能である
+ `ミルキィホームズを作ってテストデータを作れば最高である`

問☆題☆解☆決
---
<img src="./mondaikaiketsu.jpg" width="50%" height="50%">

Data::Faker
---
+ Perl にはそもそもこういう用途のデータを作るための、Data::Faker というモジュールがある

よし、Data::Faker::MilkyHolmes を作ろう！
---

そのために Acme::MilkyHolmes を作ろう(イマココ)
---
+ [https://github.com/tsucchi/p5-Acme-MilkyHolmes](https://github.com/tsucchi/p5-Acme-MilkyHolmes)
+ 本当は今日 shipit したかったけど、まだクォリティ微妙なので近日リリース予定

Acme::MilkyHolmes
---
+ members()メソッド
+ ミルキィホームズのメンバーが取得できて便利

```perl
use Acme::MilkyHolmes;
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members();

```

Acme::MilkyHolmes
---
+ キャラクター毎のインスタンス
+ 各キャラクター(ここではシャロ)の色々な情報が取れて便利

```perl
my $sherlock = Acme::MilkyHolmes::Character::SherlockShellingford->new();
$sherlock->name; # => 'シャーロック・シェリンフォード'
$sherlock->nickname; # => 'シャロ'
$sherlock->birthday; # => '3/31'
$sherlock->voiced_by; # => '三森 すずこ'
$sherlock->toys; # => 'サイコキネシス'
```

Acme::MilkyHolmes
---
+ say()メソッド
+ いつもの小芝居ができて便利

```perl
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members();
$sherlock->say('ってなんでですかー');
$nero->say('僕のうまうま棒〜');
$elly->say('恥ずかしい...');
$cordelia->say('私の...お花畑...');
```

まとめ
---
+ Data::Faker + Acme::MilkyHolmesで最高のテストデータが作れるようになります

乞うご期待！
---


おしまい
===
