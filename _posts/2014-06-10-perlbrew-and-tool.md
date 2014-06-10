---
layout: post
category: perl
tags: perl perlbrew
title: perlbrew で Perl製ツールを使う場合
---
{% include JB/setup %}
僕は普段の仕事では諸事情により system perl (OS に付属している Perl)を使っていて、Reply とか
Riji とかの Perl 製のツールを使うときや、モジュールを自由に入れたりできる環境が欲しい時は
[perlbrew](http://perlbrew.pl)を使っています。

で、Reply 使うときとか、`perlbrew use` で切り替えたりしていたのですが、「なんかめんどくさいな」とか
思い始めて、こんな感じにしてみた。

<script src="https://gist.github.com/tsucchi/7626dec9169cd1b18d4e.js"></script>

今は最新の Perl 5.20 にしているけど、ツールだと必ずしも最新じゃなくてもいいので、perl-5.20@tool みたいな ツール系専用の
`perlbrew lib` を作っておいて、新しいバージョンがでても困るまで放置しておいてもいいかも。

ちなみに、`perlbrew exec`だけだと、標準出力に

```
tsucchi@surreal[570]$ perlbrew exec --with perl-5.20@default perl -e 'print "hoge"'
perl-5.20@default
==========
hoge
```

こんな感じで、バージョンと区切り文字がでて鬱陶しいので、`-q` オプションを指定すると良いです。
(これ、多分元々は複数バージョンの Perl を動かして挙動の差異を見たりするための機能なんだと思います)

### 追記
いったん書き終えてから思いついたんだけど、

```
alias newperl="perlbrew exec --with perl-5.20@default perl"
```

こんな感じの alias 作っておけば、カレントの perl がどっちかあんまり意識しなくてもよくなって良いんじゃないかな。
明日試してみよう。
