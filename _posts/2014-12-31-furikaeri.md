---
layout: post
category: misc
tags: 雑談
title: 2014 年のふりかえり
---
{% include JB/setup %}

2014 年も残すところあとわずかとなりました。ざっくりではありますが、この blog に書いた記事を中心に振り返ってみようかな、と思います。

# 1月〜3月
初詣等のごく一般的なお正月行事を除くと、1/3 のミルキィのお正月ライブからスタートした2014年でした。

1月ごろから、Otogiri と Reply を組み合わせると便利かも、ということに気付いて、色々と周辺環境を整え始めたようです。

+ [Otogiri::Plugin::DeleteCascade ってのを書いてみた](http://tsucchi.github.io/perl/2014/02/27/otogiri-plugin-deletecascade)
+ [REPLでORMを使えるようにすると、めっちゃ便利だ、という話](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri)
+ [Otogiri-0.09 がリリースされました](http://tsucchi.github.io/perl/2014/03/18/otogiri-updated)

# 4月〜6月
1月〜3月に引き続き、Otogiri + Reply の環境を整えていた感じです。[Otogiri::Plugin::TableInfo](http://search.cpan.org/dist/Otogiri-Plugin-TableInfo/) というモジュールを書いて、
かなり便利に使えるようになりました。実装はめっちゃ大変でしたが。

+ [最近の Reply-Otogiri 環境の話](http://tsucchi.github.io/perl/2014/04/01/reply-and-otogiri)
+ [Reply::Plugin::DataDumperAutoEncode ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/04/reply-plugin-datadumper-autoencode)
+ [Reply::Plugin::StandardPrompt ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/10/reply-plugin-standardprompt)
+ [Otogiri::Plugin::TableInfo ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/24/otogiri-plugin-tableinfo)

あと、忘れちゃいけないのが、[Acme::MilkyHolmes](http://search.cpan.org/dist/Acme-MilkyHolmes/)をリリースした！

+ [Yokohama.pm に行ってきました。もしくは Acme::MilkyHolmes の話](http://tsucchi.github.io/perl/2014/05/25/yokohamapm)
+ [Acme::MilkyHolmes をリリースしました！](http://tsucchi.github.io/perl/2014/06/07/acme-milkyholmes-released)
+ [Acme::MilkyHolmes 0.03 released!](http://tsucchi.github.io/perl/2014/06/26/acme-milkyholmes-updated)

Acme なので、基本的にはふざけたモジュールなのだけど、中身はちゃんと作ったつもりだし、(記事にも書きましたが)、僕は仕事で Moose 系のクラスビルダをちゃんと使ったことがなかったので、その練習も兼ねていたりします。

# 7月〜9月
夏はやっぱり YAPC ですね！

あずまさん([@ytnobody](https://twitter.com/ytnobody))と Otogiri の話をしよう、ということになって応募しました。で、選考のちょっと前に、[YAPC で話す、ということ](http://tsucchi.github.io/perl/2014/07/03/talking_in_yapc/)という、ポエムを投稿したところ、思った以上の好評いただいて、結構有名なハッカーからもブクマとかRTしてもらったので、「よっしゃこれはワンチャンあるで」と思っていたのですが、今年の大量かつハイレベルな応募の前にあえなく撃沈したのでした。

+ [YAPC::Asia 2014 で OtogiriというORMっぽいものの話をしようと思っていたのですが、Reject されてしまいました](http://tsucchi.github.io/perl/2014/07/17/yapc-otogiri-talk-is-rejected)

YAPC の感想はこんな感じ。

+ [YAPC::Asia 2014 に行ってきました(いちにちめ！)](http://tsucchi.github.io/perl/2014/08/29/yapc_1day)
+ [YAPC::Asia 2014 に行ってきました(ふつかめ！)](http://tsucchi.github.io/perl/2014/08/30/yapc_2day)

(タイトルが若干頭悪い感じなのは、ミルキィのせいなので、気にしないでください)

YAPC 本編では漏れてしまった Otogiri の話ですが、その後 Rejectcon というイベントで無事発表することができました。良かった & 感謝です。

+ [Rejectcon で Otogiri の話をしてきました](http://tsucchi.github.io/perl/2014/09/03/rejectcon)

# 10月〜12月
10月11月は仕事がかなり忙しかったので、あまり記事を書いてなかったようです。12月はイベント関係の記事が多いですね。

+ [hachioji.pm #45 に行ってきた](http://tsucchi.github.io/perl/2014/12/07/hachiojipm)
+ [Perl Beginners #16 で DB の自動再接続の話をしました](http://tsucchi.github.io/perl/2014/12/23/perlbeginners)
+ [Perl 入学式第4回補講で講師をやってきました](http://tsucchi.github.io/perl/2014/12/26/perl-entrance)

最後に示した記事の Perl 入学式の講師は結構大きな経験でした。サポーターは何度もやっていましたが、教える側になってみて、
あらためて「サポーターって大事だな、やっててよかったな」と思いました。

毎年恒例の Advent Calendar 関係は [Perl 入学式 Advent Calendar](http://qiita.com/advent-calendar/2014/perl-entrance)のみ参加しました。

+ [リファレンスの使い方とかの話](http://tsucchi.github.io/perl/2014/12/19/perl-advent-calendar-reference-usage/)

年越し等の普通っぽいイベントを除くと、昨日のミルキィのライブで僕の 2014 年は終了しました。

# イベント関連
記事書いている限り、14回技術系のカンファレンスに行っていたらしい、Perl 入学式のサポーターなど、記事書いてないけど行っているものもあるので、多分20回〜30回程度ではないかと思う。別のイベント(謎)の
方の参加回数はもっと少ない(多分片手で数えられるはず)ので、よかった僕は正常だ。(昨日イベントに何回参加したとか、そんな話をしていたのである。わかる人にしかわからない話ですねコレ)

# まとめ
この tweet に集約されるんじゃないかな、と思います。

<blockquote class="twitter-tweet" lang="ja"><p>ミルキィで始まり、ミルキィで終わった2014年でした。始め良ければ全て良し or 終わり良ければ全て良し、とすると、とても良い1年だったのかなぁ、と</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/549928708211879936">2014, 12月 30</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

と、いうわけで、今年もありがとうございました & お世話になりました。

皆様よいお年を！


