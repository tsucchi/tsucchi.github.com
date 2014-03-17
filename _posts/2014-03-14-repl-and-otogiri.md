---
layout: post
category: perl
tags: perl db orm Otogiri
title: REPLでORMを使えるようにすると、めっちゃ便利だ、という話
---
{% include JB/setup %}

## この記事は何？
rails console の劣化版みたいなやつの紹介です

## それじゃ分かんないよ？
端末からインタラクティブに ORM のメソッド投げたりできます。便利

## ってか REPL って何？
端末でインタラクティブにプログラムを実行する物体です。irb とかが有名ですね。Perl では [Reply](http://search.cpan.org/dist/Reply/bin/reply) ってのがおすすめです。

良くわからない人は以下の記事読んで、実際に使ってみるのが良いと思う。

+ [Reply is awesome!](http://blog.64p.org/entry/2013/06/07/180316)
+ [Reply.pm の便利機能について](http://cside.g.hatena.ne.jp/Cside/20130617/p1)

## で、どうやるの？
まずは必要な物体をインストールしましょう。Reply と使いたい ORM を入れます

```
% cpanm Reply
% cpanm Otogiri
% cpanm Otogiri::Plugin::DeleteCascade
```

ORM はお好みのやつでいいですが、[DeleteCascade](/perl/2014/02/27/otogiri-plugin-deletecascade) が使えるとめっちゃ捗るので、[Otogiri](http://search.cpan.org/dist/Otogiri/lib/Otogiri.pm) がおすすめ。

で、一度実行してみましょう。

```
% reply
0> my $aa = 1 + 1;
$res[0] = 2

1> exit
```

うん、便利ですね。

一度実行すると、`.replyrc`というファイルが出来るので、こいつをコピーして、ORM 呼ぶ用のコンフィグを作ります

```
cp .replyrc .replyrc_myservice
```

名前は適宜好きなのつけてください。その DB を使うサービス名が良いと思います。

で、`.replyrc_myservice` を書き換えます。こんな感じ。

<script src="https://gist.github.com/tsucchi/9541706.js"></script>

line 4〜8が追加した分です。

で、

```
% reply --cfg ~/.replyrc_myservice
```

のように、cfg オプションでコンフィグを指定できるので、そんな感じで実行します。すると...

```
% reply --cfg ~/.replyrc_myservice
1> $db->select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'Sherlock Shellingford',
    age => 15,
    toys => 'psychokinesis'
}
```

こんな感じで、<del>シャーロック・シェリンフォードちゃんの情報がゲットできて</del>、`$db` 変数から Otogiri のメソッドが呼べて、最高便利です。

これだけだと、いちいちコンフィグを指定しなくてはいけないのがめんどくさいので、alias とかに登録しとくのが良いと思います。

```
% vi .bashrc
...
alias otogiri-myservice='reply --cfg $HOME/.replyrc_myservice'
...
```

## 補足
Perl入学式の校長としても有名な、papix 氏が Reply のプラグイン書いてるみたいです。
+ [Reply::Plugin::Otogiri](https://github.com/papix/Reply-Plugin-Otogiri)

ちょっと試したんだけど、うまく動かなかったので、うまくいったらコレの紹介も書こうと思います。

## FAQ?
### 便利？
便利ですよ。めっちゃ捗るので是非試して欲しい。

### 普通に SQL のコマンドラインで良くね？
みんなプログラマなんだから、 SQL より Perl の方が得意でしょ？あとお前それ Oracle 使ってても同じ事言えるの？

...ってのは半分本気で半分ジョークです。Otogiri::Plugin::DeleteCascade を有効にしているので、FK あるテーブルも上から消せるのが最高に気持ちいいです。

### Teng で同じ事やりたいんだけど...
.replyrc_myservice の `use Otogiri` してる所の周辺を書き換えてください。僕最近 Teng 使ってないし。あとは初期化の時に Row Object を無効にしといた方がデータが見やすくて良いかも。

### DBIC で同じ事やりたいんだけど...
.replyrc_myservice の(ry

### CDBI で同じ事やりたいんだけど...
.replyrc_m(ry
