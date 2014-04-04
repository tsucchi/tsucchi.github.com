---
layout: post
category: perl
tags: perl
title: Reply::Plugin::DataDumperAutoEncode ってのを書いてみた
---
{% include JB/setup %}
こんにちは、最近 Reply 芸人と化している気がするミルキアンのおじさんです。

+ [REPLでORMを使えるようにすると、めっちゃ便利だ、という話](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri)
+ [最近の Reply-Otogiri 環境の話](http://tsucchi.github.io/perl/2014/04/01/reply-and-otogiri)

上記の続きみたいなお話なので、まだ読んでない方は読むと良いかもです。

Reply は ORM と組み合わせるとめっちゃ便利だし、組み合わせなくても普通に便利なのですが、一つ困った事がありました。

たとえば [Otogiri](http://search.cpan.org/dist/Otogiri/) と組み合わせて、DB からデータを引こうとすると、

```
% reply-service1
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'シャーロック・シェリンフォード',
    age => 15,
    toys => 'サイコキネシス',
	birthday => '3/31',
}
```

こういうデータが返って欲しいのに、実際に返ってくるのは

```
% reply-service1
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => "\x{30b7}\x{30e3}\x{30fc}\x{30ed}\x{30c3}\x{30af}\x{30fb}\x{30b7}\x{30a7}\x{30ea}\x{30f3}\x{30d5}\x{30a9}\x{30fc}\x{30c9}",
    age => 15,
    toys => "\x{30b5}\x{30a4}\x{30b3}\x{30ad}\x{30cd}\x{30b7}\x{30b9}",
	birthday => '3/31',
}
```

こんな感じの decode されたデータです。バイナリアンやスーパーハッカーの皆様ならこれを読む事も可能なのかもしれませんが、
いくら僕がシャロの事が大好きでも decode された文字列まではさすがに覚えていないし、シャロじゃなかったら覚える気にはなれないので結局読めません。

もちろん、

```
4> encode_utf8("\x{30b5}\x{30a4}\x{30b3}\x{30ad}\x{30cd}\x{30b7}\x{30b9}")
$res[3] = 'サイコキネシス'
```

こんな感じで、encode してあげれば読めますが、DBから返ってきた複数行の値とかだったりすると、つらいわけです。

そこで登場するのが、今回書いたプラグイン、[Reply::Plugin::DataDumperAutoEncode](http://search.cpan.org/dist/Reply-Plugin-DataDumperAutoEncode/)です。
標準プラグインの DataDumper の代わりに使います。ですので、コイツを CPAN からインストールして、`.replyrc`の


```
[DataDumper]
```

と書いてある行を

```
[DataDumperAutoEncode]
```

と書き換えれば OK です。カジュアル！

使い方はこんな感じ。

```
tsucchi@surreal[590]$ reply
0> use Encode
1> decode_utf8('ほげ')
$res[0] = 'ほげ'

2> disable_auto_encode 
$res[1] = 0

3> decode_utf8('ほげ')
$res[2] = "\x{307b}\x{3052}"

4> enable_auto_encode 
$res[3] = '1'

5> decode_utf8('ほげ')
$res[4] = 'ほげ'
```

さっき ship した 0.02 からは disable_auto_encode/enable_auto_encode ってメソッドをつけたので、どうしても decode された文字列じゃないと満足できない
あなたにもばっちりです。(謎)


めっちゃ簡単に説明すると、最初に提示した

```
% reply-service1
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'シャーロック・シェリンフォード',
    age => 15,
    toys => 'サイコキネシス',
	birthday => '3/31',
}
```

こういうデータを引っ張れるようになって、最高便利！ ってことです。お試しあれ！

+ [Reply::Plugin::DataDumperAutoEncode - cpan](http://search.cpan.org/dist/Reply-Plugin-DataDumperAutoEncode/)
+ [tsucchi / Reply-Plugin-DataDumperAutoEncode - github](https://github.com/tsucchi/Reply-Plugin-DataDumperAutoEncode)
