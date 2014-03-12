「異常な努力」をするまえに
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ ミルキィホームズの新曲「冒険☆ミルキィロード!!」4/30発売予定！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=B00IO2EBGA&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


はじめに
---
+ 世の中には「異常な努力」によって支えられているモジュールやソフトウェアが沢山あります
    + CGI.pm(最近あんま使わないけど)
	+ メール系(Email::*)
    + DB系(DBD::*)
	+ ...ほかにも多分いろいろ

CGI.pm
---
+ 歴史的な事情(互換性?)とか...
+ オブジェクト指向IFと関数IFの両サポートとか...
+ Export の独自実装(ロードを速くしたい？)とか...
+ [このへんが特にやばい](https://metacpan.org/source/MARKSTOS/CGI.pm-3.65/lib/CGI.pm#L978)
    + 文字列なのにソースコード

※個人の感想です	

メール系
---
+ Email::Sender と周辺のツール
+ メールの仕様が複雑奇怪なため
+ [YAPC::Asia 2011 RJBS氏のトーク「闇のEメール伝説」](http://yapcasia.org/2011/talk/59)

DB系
---
+ XSで書かれているので、僕らのようなカジュアルユーザには読みにくい
    + 速度のためと、DBMSのクライアントライブラリを使うため
+ 歴史も古い
+ プレースホルダ周りとか、結構複雑でバグってたりする(しかも簡単に直りそうにない)
    + 自前で SQL のパースをしている
    + [placeholder in LIMIT causes syntax error](https://github.com/CaptTofu/DBD-mysql/issues/38)
	+ [DBD::mysql の不具合っぽい挙動を見つけたので、とりあえず issue あげてみた](http://tsucchi.github.io/perl/2013/03/04/dbd-limit-bug/)

ちょっとだけまとめ
---
+ 複雑なものを取り扱うために「異常な努力」が必要なのは仕方ない気がする
+ Email とか DB のドライバとか、メンテ大変だけど、誰かが頑張らないと皆が不幸になる

ところで
---
+ 普通に生きていれば、こういう大変そうなモジュールに関わることはありません
    + Beginners だし。。。
+ でも、`実は結構簡単なのに、異常な努力をしてしまう`事は結構あります。


例1) CSV
---


例1) CSV
---
+ カンマ区切りだから、split でいいよね？

```perl
my @values = split(qr/,/, $input);
```

これで本当に大丈夫？

例1) CSV
---
+ 大丈夫じゃないです
    + 改行したい...
    + カンマ自体をデータに含めたい...
	+ クォートしたい...
    + etc...

CSV の仕様は意外と複雑(だし、標準もない)。じゃあどうすれば？

例1) CSV
---
+ Text::CSV(_XS) を使う
    + さっきの問題を全部解決できる
	+ 自分で実装しようとすると、凄く大変

例2) 配列から小配列を取る処理
---
+ 100,000件くらいのデータを1000件ずつ処理したい、とかそういう場合の処理

例2) 配列から小配列を取る処理
---
```perl
my @ids = ... #処理したい10万件くらいのデータ
my $ceil = ceil(@ids/1000) - 1;
foreach my $i ( 0..$ceil ) {
    my $start_index = $i * 1000;
    my $end_index = $i != $ceil ? (($i + 1) * 1000 - 1) : $#ids;
    my @sub_ids = @ids[$start_index..$end_index];
    # @sub_ids が小配列なので、これ使って処理
}
```

例2) 配列から小配列を取る処理
---
+ ナニコレ、イミワカンナイ...


例2) 配列から小配列を取る処理
---
+ splice を使うと簡単に書ける
+ [今だからこそ知って欲しい、splice の話](http://tsucchi.github.io/perl/2014/02/06/splice/)

```perl
my @ids = ... #10万件のidの配列
while ( my @sub_ids = splice(@ids, 0, 1000) ) {
    # @sub_ids が小配列なので、これ使って処理
}
```

例3) Otogiri::Plugin::DeleteCascade
---
+ 僕の個人的な体験
+ 外部キーをたどって、親のテーブルを削除したときに、子のテーブルも一緒に削除したい

例3) Otogiri::Plugin::DeleteCascade
---
+ [当初の実装](https://github.com/tsucchi/p5-Otogiri-Plugin-DeleteCascade/blob/70505d5553b06b55c51ad9bd25333eaccfc62530/lib/Otogiri/Plugin/DeleteCascade.pm#L24-L40)
    + めんどくさい SQL を頑張って書いた
    + これは実は不十分で、スキーマの情報とか足りてない
	+ 他にもバグってるかもしれない
+ [今の実装](https://github.com/tsucchi/p5-Otogiri-Plugin-DeleteCascade/blob/master/lib/Otogiri/Plugin/DeleteCascade.pm#L22-L40)
    + [DBIx::Inspector](http://search.cpan.org/dist/DBIx-Inspector/)というモジュールで FK をたどることで、シンプルになった

まとめ
---
+ 難しい処理をするときに、難しいコードを書いてしまうのは仕方ない
    + 先人達が頑張ってくれてるなら、ソレに乗らない手は無い
+ 簡単な処理を難しく書いてしまっていないか、自戒してみる
    + ぐぐってみたり
	+ 誰かに聞いてみたり
	+ blog に書いてみる
	
おしまい
===
