Perl リスクとか
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ 最近「艦これ」にはまってます。[文月教](http://blog.livedoor.jp/kankore200/archives/31451312.html)です


で、今回のテーマについて
---
+ なんだっけ？

まあいいや
---

良く言われる Perl の悪いところを改善したい！
---

と、ふと思いました
---

Perl の悪いところの例
---
+ 省略記法
+ 特殊変数が覚えられない
+ 日本語のドキュメントが少ない

これらの問題を一気に解決する、cool な手法を思いついた！
---

それは...
---

use Japanese
---
+ 日本語でおk

つかいかた
---
```perl
use Japanese;
my $input = "ふたりはミルキィホームズ絶賛放送中！";
if ( $input =~ qr/ミルキィホームズ/ ) {
    say $照合;   # => ミルキィホームズ
    say $前照合; # => ふたりは
    say $後照合; # => 絶賛放送中！
}
```

超読みやすい。最高！
---
+ これでもう DIS られない！

補足
---
+ あ、「思いついた」って書いたけど、思いついたの僕じゃないです。
+ YAPC の直前あたりに、Yancha でそんな話してたので

制限事項
---
+ まだ、この3変数しか実装してません。
+ 僕と一緒に美しい日本語を考えませんか！

おしまい
===
