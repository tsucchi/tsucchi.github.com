---
layout: post
category: perl
tags: perl ミルキィホームズ
title: Acme::MilkyHolmes 0.03 released!
---
{% include JB/setup %}

[Acme::MilkyHolmes 0.03](http://search.cpan.org/dist/Acme-MilkyHolmes/)をリリースしました！

何を変えたかというと、[このissue](https://github.com/tsucchi/p5-Acme-MilkyHolmes/issues/2)の修正になります。

アニメ「ふたりはミルキィホームズ」の放送当初は、カズミ役の愛美さんは、「寺川 愛美」という名義でクレジットされていました。
当時は歌手だと「愛美」名義で、声優だと「寺川 愛美」名義でした。2013年12月25日をもって、名義が「愛美」に統一されたため、
Acme::MilkyHolmes では、こうなっています。

```perl
use Acme::MilkyHolmes;
my $kazumi = Acme::MilkyHolmes::Character::KazumiTokiwa->new();
$kazumi->voiced_by(); # => '愛美'
```

バージョン0.03以降では、voiced_by() で現在時刻を見ておりますので、2013年12月25日以前では、「寺川 愛美」が返るようになっています。

どうしても、寺川名義でないと、満足できない方は、Test::MockTime(テストコードの場合)使うか、Time::Fakce(プロダクトコードの場合)使うか、PCの時計を戻すか、
タイムマシン(Apple のアレじゃなくてドラえもんとかドクにお願いしてくださいね)で時間を戻すと幸せになれるかもしれません。

Enjoy!
