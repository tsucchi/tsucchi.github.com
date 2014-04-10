---
layout: post
category: perl
tags: perl
title: Reply::Plugin::StandardPrompt ってのを書いてみた
---
{% include JB/setup %}

こんばんは、Reply おじさんです。

多分このへん(↓)の続きみたいなお話です。

+ [REPLでORMを使えるようにすると、めっちゃ便利だ、という話](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri)
+ [最近の Reply-Otogiri 環境の話](http://tsucchi.github.io/perl/2014/04/01/reply-and-otogiri)
+ [Reply::Plugin::DataDumperAutoEncode ってのを書いてみた](http://tsucchi.github.io/perl/2014/04/04/reply-plugin-datadumper-autoencode)


表記の通り、[Reply::Plugin::StandardPrompt](https://github.com/tsucchi/p5-Reply-Plugin-StandardPrompt) という Reply のプラグインを書きました。

シェルみたいな、カスタマイズ可能なプロンプトを提供するプラグインです。

Reply に標準添付されているプラグインで、[Reply::Plugin::FancyPrompt](http://search.cpan.org/~doy/Reply-0.34/lib/Reply/Plugin/FancyPrompt.pm)というのがあるのですが、これは名前に反して(?)あまりファンシーではありません。bash の PS1 で表現すると

```
export PS1="\!> "
```

と同等で、カスタマイズも出来ません。。。

まー普通に使う分にはそんなに困らないかも、なのですが、上記に挙げてる記事にも書いているのですが、最近は Otogiri のプラグインとかと組み合わせて、DB のデータメンテとかするのに Reply を使っているので、
せめて DB 名とか出したいわけです。

と、言うわけで書いたのが表記のモジュール。

cpanm とかでインストールしてから、FancyPrompt や他のプロンプト系のプラグインの設定を消して、代わりに

```
[StandardPrompt]
prompt='reply@' . Show_dbname() . "[$history_count]> "
```

みたいな感じで書きます。prompt には Perl の文が普通に書けて、main パッケージにエクスポートされている関数や変数が使えます。Show_dbname は [Reply::Plugin::Otogiri](https://github.com/papix/Reply-Plugin-Otogiri)が提供する現在使っているDB の設定名を返す関数です。$history_count は StandardPrompt が提供する変数で、bash でいうところの \! です。(コマンドの実行回数)

なので、この例ですと、

```
reply@myservice[10]> 
```

みたいな感じのプロンプトになります。(DB の設定名が myservice でコマンド実行回数が10回目とした場合)

ちょっと名前が強気すぎるかなぁ、とか他のプロンプトと共存できない(つーかそもそも出来るのか？実装上できるようになってるのだが、現実的に無理な気がする)とか、
諸々の問題があるので、とりあえず github 止まりにしてます。気が向いたら CPAN に上げるかも、です。

+ [Reply::Plugin::StandardPrompt](https://github.com/tsucchi/p5-Reply-Plugin-StandardPrompt)
