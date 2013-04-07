---
layout: post
category: ruby
tags: ruby markdown perl
title: markdown2impress を Ruby に移植したら、いい感じに仕上がった件
---
{% include JB/setup %}

### 背景とか雑談
つい最近、急にプレゼンしなきゃいけない機会がありました。今まで、僕はパワポとか OOo(Impress)とか使ってたのですが、たまには違うもの使ってみたいなー、とか思って色々見てたら、[impress.js](http://bartaz.github.io/impress.js/#/bored) という、かっちょいい Web ベースのプレゼンツールがあることを知りました。

「でも、これどうやって作るんだろ？作るの大変そうだな。。。」と思っていろんな人のプレゼン資料見てみると、Markdown ファイルが置いてある。「ん？Markdown から生成できる物体があったりする？」とか思ってさらに調べると、[markdown2impress](https://github.com/yoshiki/markdown2impress)と言うものを見つけました。

おぉ、これはすごい。まじグレイト。で、これ使って無事にプレゼン資料書きました。めでたしめでたし。。。だったのですが、使ってみて、もうちょっと機能追加したいなー、と思ったのでした。欲しかったのは下記。

+ 作成中の Markdown をウォッチして、保存されたら HTML 作り直す機能(plackup -R とか、jekyll --auto みたいなやつ)
+ ソースコードのシンタックスハイライト

んで、plackup のソースをパクりつつ、仕上げたのが[こちら](https://github.com/tsucchi/markdown2impress)。最初何も考えずにパクっていたので、サーバプロセスじゃないのに、fork する恥ずかしいコード書いてたのは内緒だ。あ゛、内緒じゃなくなったw

で、「次にシンタックスハイライトやるかー」、と思って、[google-code-prettyfy](https://code.google.com/p/google-code-prettify/)とか、いろいろ見てたんだけど、「ん？せっかくだから、Github Flavored Markdown サポートしたほうが良くね？」と思って調べてみると、Perl じゃ簡単にできない orz。詰んだw...

と、いうわけで、頑張って改造したソースは一旦捨てて、Ruby で書き直してみました。ちゃんとシンタックスハイライトもサポートしてるよ。めでたしめでたし。

- [ruby-markdown2impress](https://github.com/tsucchi/ruby-markdown2impress)

### 使い方

まずはインストール!  
rubygem を github から入れる方法、実は良く分かってないんだけど、こんな感じでやってみたら入ったっぽい。

```
$ git clone git@github.com:tsucchi/ruby-markdown2impress.git
$ cd ruby-markdown2impress
$ bundle
$ rake install
```

で、Markdown でプレゼンを書く

```
$ your-favorite-editor index.md
```

で、もう一個のターミナル(別タブでもなんでもいいけど)で、markdown2impress を実行

```
$ markdown2impress -r index.md
```

-r をつけとくと、.md が保存されたタイミングで index.html を再生成します。

あとはローカルでもいいし、github とか自分のブログサイトとか、好きな所にアップすれば良いと思います。

### その他
せっかくなのでプレゼンも書いてみたよ！

- [markdown2impress を改良したったー](/slides/markdown2impress/index.html)

### 後日談
Ruby の移植版が大体完成して、この記事書いてるときにもう一回調べ直したら、Perl で Github Flavored Markdown 扱う [Markdent](http://search.cpan.org/dist/Markdent/lib/Markdent.pm)ってモジュールあるじゃん、もっと早く気付けよオレ。。。まあ pygments というか、シンタックスハイライトの本処理は Ruby のほうが楽そうだったので良しとするか。。。
