---
layout: post
category: milkyholmes
tags: ミルキィホームズ perl
title: ミルキィホームズが好きすぎてやってしまったこと(技術編)
---
{% include JB/setup %}

これは [ミルキィホームズ Advent Calendar 2017](https://adventar.org/calendars/2411) の12日目の記事です。

今回は元々のアドベントカレンダーの趣旨に近い(?)技術系の話(?)です。

ミルキィが好きすぎてやってしまったこと(技術編)です。

## ドメイン

少し前に、`.yokohama` というドメインが取れるようになりました

+ [.yokohama 横浜を表す新ドメイン誕生。9月9日一般登録開始 ｜ お名前.com](https://www.onamae.com/newgtld/yokohama/)

ミルキィホームズといえば「偵都ヨコハマ」。`.yokohama` が取れるなら `teito` ってやつ取れば、`teito.yokohama` 。つまり `milkyholmes@teito.yokohama` みたいなめっちゃ最高なメールアドレス作れるのでは？！ と思いつつ、「でも公式が取るなら尊重しよう」と思い、1, 2ヶ月くらい自重していたのですが、公式が取る気配がなかったので、`teito.yokohama` ドメインを無事取得しました。

これ、本当に必要であれば、公式に譲るのも、やぶさかではないのでなんらかの手段で連絡くださいな。

このドメイン使って Webサービス作ったり、メールサーバ建てたりしたいなぁ、と思いつつ、結構放置気味だったりします。

## Acme::MilkyHolmes

僕はお仕事では主に Perl を使っているプログラマでもあるので、Perl のモジュール(いわゆるライブラリ)を書いていたりします。そんな中、作ったのが [
Acme::MilkyHolmes](http://search.cpan.org/dist/Acme-MilkyHolmes/) という Perl のモジュールです。

元々は、[Acme::MorningMusume](http://search.cpan.org/dist/Acme-MorningMusume/)(モーニング娘。) とか [Acme::PrettyCure](http://search.cpan.org/dist/Acme-PrettyCure/)(プリキュア) とかのこういう先人たちの偉業があって、まあ僕はその巨人の肩に乗っかっているわけですが、ミルキィホームズのあれこれを取得できる大変便利な Perl モジュールであります。

Acme::MilkyHolmes については、作った当初くらいに発表資料を作っているので、こちらをご覧ください

+ [最高のテストデータの話](http://tsucchi.github.io/slides/yokohamapm/11/#/title)
(スペースキー、矢印キーの左右などでスライドを移動できます)

何ができるかは、[モジュールの SYNOPSIS](http://search.cpan.org/dist/Acme-MilkyHolmes/lib/Acme/MilkyHolmes.pm) にも書いてるんですが、まあこんな感じです

```perl
use strict;
use warnings;
use utf8;
use Acme::MilkyHolmes;

# fetch members of Milky Holmes(eg/say.pl)
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members();
$sherlock->say('ってなんでですかー');
$nero->say('僕のうまうま棒〜');
$elly->say('恥ずかしい...');
$cordelia->say('私の...お花畑...');

# create character instance directly
my $sherlock = Acme::MilkyHolmes::Character::SherlockShellingford->new();
$sherlock->locale('en');
$sherlock->name;               # => 'Sherlock Shellingford'
$sherlock->firstname;          # => 'Sherlock'
$sherlock->familyname;         # => 'Shellingford'
$sherlock->nickname;           # => 'Sheryl'
$sherlock->birthday;           # => 'March 31'
$sherlock->voiced_by;          # => 'Suzuko Mimori'
$sherlock->nickname_voiced_by; # => 'mimorin'
$sherlock->toys;               # => 'Psychokinesis'
$sherlock->color;              # => 'pink'

# fetch each team members
use Acme::MilkyHolmes qw($MilkyHolmes $MilkyHolmesFeathers $MilkyHolmesSisters);
my ($sherlock, $nero, $elly, $cordelia) = Acme::MilkyHolmes->members_of($MilkyHolmes); # same as members()
my ($kazumi, $alice) = Acme::MilkyHolmes->members_of($MilkyHolmesFeathers);
my ($sherlock, $nero, $elly, $cordelia, $kazumi, $alice) = Acme::MilkyHolmes->members_of($MilkyHolmesSisters);
```

モジュールに同梱されている `eg/say.pl` (SYNOPSIS でもやっているやつですが)を実行すると

<img width="1164" height="232" src="https://lh3.googleusercontent.com/CFOA1Fpd90Mj_H8-XtSO5FnnhfHj7lBkSJQQUYL85bnJsYwUzhGxCVj6z36Z9ACRAufpI1LRjxuYN52MZKfSsdkUbG0ImsCjMROtn1hXIAm9L69WGYZIltlx2xPBPLddyKFi4ouXPnuvV-ZLLDl0j6qKZbMqBMuWrYc8NXba7W1f_e8sK3PpkcG_MMJvAp1UKApJatWv1qE4V8TZhJ-Vsf4rxSm-YOWvT6trN3Kq6syIjoV_yMXbh04RVaBcMPhWqApp1WLduj_Oe7GAplvo38IeKjnjXCCV-o8fpYobWMlzunEKF4nMfdpnTvdNNrH6AK9j1dcWPBNdzD6B83ibUITYGzErBxL670qCE4XEACuOpFk_Sw7xFVdBqDaXauRZ9iVvURqft3DKh0SF9qOfzm0HlAKDEvXAn-aMWRjeCKKcLVyFV8g1NvwOxta5Sd0zZH1tQ_-rM7sM9hxGdCIKfYlmw4cluFDBACNNZX3EHP3LIjYliv_nLha14P6tmaejrlb_C5541kLRTU70pXaNkDVc_KIy_5GkqhCMv9aKeacFOvpTjDqbcuP23iP4n5CHY7QaQhDaPP9-_z_wir02ajw1QRN9QRZdVz_9O2BuHLpkuOuO9u9yvFDEsNubq2I3fAhvNRDQhbia9eHsJBDczzz3fY2iUzhq1kI=w1164-h232-no">

こんな感じになり、大変素敵な感じです。とはいえ、微妙な面もいくつかあり

+ 誕生日は公開されてるけど、何年か分からない
+ シャロの正しいスペルが分からない
    + 英語版 wikipedia に準拠しているんだけど、これがどうやら正しくないっぽいが他に一次情報がないのでどうにもならない

などの微妙な問題があったりします。これらをなんとかしてくれるスーパーハッカーさんいれば、ぜひ pull request ください

+ [tsucchi/p5-Acme-MilkyHolmes](https://github.com/tsucchi/p5-Acme-MilkyHolmes)

と、いうわけで、本日はミルキィホームズにまつわる(?)Webエンジニアっぽい話でした。

ではでは。
