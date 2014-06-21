セッションのはなし(?)
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ 今日はみもりんの新曲をご紹介
    + ミルキィホームズの新曲出てないので...
    + 三森すずこ「せいいっぱい、つたえたい！」2014/08/06 発売予定です！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00KF0LDTW&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

で、今回のテーマについて
---
+ 何でしたっけ？

セッションだっけ？
---

セッションについて
---
+ 何故かあんま縁がなくて、地獄も見た事がありません
+ 今はふつうにキャタリストのセッション使ってます！


以上！
---

最近つくったものの話
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


Acme::MilkyHolmes
---
+ 6/7 の五反田 Perl(もくもく会)で内部実装とかPODの見直しを完了させて無事リリースしました
+ [Acme::MilkyHolmes - cpan](http://search.cpan.org/dist/Acme-MilkyHolmes/)

Acme::MilkyHolmes
---
## members()メソッド
+ ミルキィホームズのメンバーが取得できて便利

```perl
use Acme::MilkyHolmes;
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members();

```

Acme::MilkyHolmes
---

## キャラクター毎のインスタンス
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

## say()メソッド

+ いつもの小芝居ができて便利

```perl
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members();
$sherlock->say('ってなんでですかー');
$nero->say('僕のうまうま棒〜');
$elly->say('恥ずかしい...');
$cordelia->say('私の...お花畑...');
```

実行すると、こんな感じ

<img src="/assets/img/koshibai.png">

Acme::MilkyHolmesの今後について
---
+ あいみんの名称変更対応
+ 何度も言ってる気がするけど Plugin システム
    + G4とか怪盗帝国とかカラーザファントム
+ nickname_voiced_by() とかメソッド足そうかな、とか

Acme::MilkyHolmesの今後について
---
+ patches welcome! なのです！
+ [Acme::MilkyHolmes - github](https://github.com/tsucchi/p5-Acme-MilkyHolmes)

WebService::PivotalTracker
---
+ [Pivotal Tracker](http://www.pivotaltracker.com/) というツールの API クライアント
    + アジャイル開発、とくにスクラムの進捗管理用ツール
    + 使ってる人ー？
+ [API](http://www.pivotaltracker.com/help/api) は curl でサンプルが書かれてるくらいシンプルなんだけど...


シェルスクリプト書くくらいなら、Perl書きたいですからね！
---


WebService::PivotalTracker
---

```perl
use WebService::PivotalTracker;

my $pivotal = WebService::PivotalTracker->new( token => 'your api token' );
my $story = $pivotal->get("/projects/$project_id/stories/$story_id");# JSON response が返ってくる
```


Reply-Otogiri関連(?)
---
+ [perlbrew で Perl製ツールを使う場合](http://tsucchi.github.io/perl/2014/06/10/perlbrew-and-tool/)
<script src="https://gist.github.com/tsucchi/7626dec9169cd1b18d4e.js"></script>

わりと便利なので、System Perl 使ってる人はやってみると良いです


ネタがきれたのでこのへんで
===

の前に
---

One More Thing
---
+ [YAPC::Asia 2014](http://yapcasia.org/2014/) で、あずまさんと Otogiri の話をしたいです！
+ [これはORMですか？いいえOtogiriです](http://yapcasia.org/2014/talk/show/d42c9d9e-ec91-11e3-b82e-98666aeab6a4)
+ ソーシャルボタン押して、ついったあたりに「これ聞きたい」とか流してもらえると、僕とあずまさんがハッピーになれるのでよろしくです

こんどこそおしまい
===
