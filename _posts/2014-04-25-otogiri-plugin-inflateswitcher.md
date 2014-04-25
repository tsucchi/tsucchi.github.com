---
layout: post
category: perl
tags: perl db orm Otogiri
title: Otogiri::Plugin::InflateSwitcher ってのを書いてみた
---
{% include JB/setup %}
最近続いている [Reply](http://search.cpan.org/dist/Reply/) と [Otogiri](http://search.cpan.org/dist/Otogiri/)を組み合わせて便利に使おうシリーズの一環です。

ORM には inflate/deflate という便利な機能があります。DBから取ってきた値を整形したりオブジェクトにしたり(inflate)、逆にオブジェクトを変換して DB に格納可能な型に変換する、というモノです。
定番処理としては、DB の日付型カラム(DATETIME/TIMESTAMP)を Perl の日付型オブジェクト(Time::Piece とか DateTime)に変換したりとか、そういうのです。

で、「Reply だとオブジェクトに変換しても嬉しくないから、inflateとか使わないでしょ？」と最初思っていたのですが、たまに DB 上に base64 とか JSON とか Dumper とかで入ってるカラムとか
あったりして、そういうのめっちゃ読みにくい。そういう設計はそもそもどうなのよ？とか、JSON とか Dumper はギリ読めるっしょ？とか、とかまあ言いたい事は色々あるのかもしれないが、僕は
そういうの読むの苦痛なので何とかしたい。つーわけで、inflate を使ったわけです。

Otogiri だとこんな感じになります。(コンストラクタのオプションで inflate を指定します)

```perl
inflate => sub {
	my ($data, $table) = @_;
	if ( $table eq 'base64_tsukatteru_kusonoyouna_table' ) {
        $data->{damena_column} = decode_base64($data->{damena_column});
    }
	return $data;
}
```

ただ、そうすると、「本当に変換前の値を使いたいとき」に時々困ったりするのです。(DB から取った値をちょっと変えて、INSERT したい時とか。)

なので、Inflate を切り替えられるプラグインを書いた次第。

+ [Otogiri::Plugin::InflateSwitcher](https://github.com/tsucchi/p5-Otogiri-Plugin-InflateSwitcher)
+ [Otogiri::Plugin::DeflateSwitcher](https://github.com/tsucchi/p5-Otogiri-Plugin-DeflateSwitcher)

Deflate の方は僕は要らないんだけど、対称になってないと気持ち悪いので書きました。(コピペしてちょっとテストコードいじるだけで実装できたし。)

使い方はこんな感じ。

```perl
use Otogiri;
use Otogiri::Plugin::InflateSwitcher;
my $db = Otogiri->new($connect_info);
$db->disable_inflate;
my $row = $db->single(...); # inflate is disabled
$db->enable_inflate;
$row = $db->single(...); # inflate is enabled
```

enable/disable_inflate で inflate をオフったり有効にしたりできます。

あと、僕は当面使わないけど、Guard をつかったインターフェースも用意しています。これは、前作った、[Teng のやつ](https://github.com/tsucchi/p5-Teng-Plugin-RowObjectCreationSwitcher)
を元にした、というかアイデアをそのままパクった、という感じです。アプリで使う場合は多分こっちのほうが便利です。

```perl
my $guard1 = $db->enable_inflate;
{
    my $guard2 = $db->disable_inflate;
    # inflate is disabled
} #dismiss $guard2
# inflate is enabled again
```
当面 github 止まりにしておく予定。なので、インストール時は

```
cpanm git@github.com:tsucchi/p5-Otogiri-Plugin-InflateSwitcher.git
cpanm git@github.com:tsucchi/p5-Otogiri-Plugin-DeflateSwitcher.git
```

とかやってインストールしてください。

+ [Otogiri::Plugin::InflateSwitcher](https://github.com/tsucchi/p5-Otogiri-Plugin-InflateSwitcher)
+ [Otogiri::Plugin::DeflateSwitcher](https://github.com/tsucchi/p5-Otogiri-Plugin-DeflateSwitcher)
