markdown2impress を改良したったー
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


markdown2impress
---
[yoshiki(clouder)さん](http://blog.clouder.jp)がつくったやつ。

[プレゼンをmarkdownで書いたらええやん](http://blog.clouder.jp/archives/001146.html)

```
これはmarkdownで書いた文章をimpress.jsに対応したHTMLに変換するものです。impress.jsっていうのは、CSS3をつかって文字とかをぎゅんぎゅん動かすことのできるプレゼンフレームワークです
```

markdown2impress
---
凄い。まじすごい。

でも...
---
+ Markdown を保存したタイミングで、自動で HTML 再生成してくれるとうれしいな。
+ ソースコードはシンタックスハイライトしてくれるといいな

と思ったので
---
作ってみた。

+ [ruby-markdown2impress](https://github.com/tsucchi/ruby-markdown2impress)

できること
---
+ オリジナルの markdown2impress みたいに .md から .html 生成
+ HTML 自動再生成
+ シンタックスハイライト

HTML 自動再生成
---

```
markdown2impress -r index.md
```

シンタックスハイライト
---
こんな感じ(Github Flavored Markdown が使えます)

 ```perl
 use strict;
 use warnings;
 print "Hello markdown2impress\n";
```

今後について
---
+ rbenv 環境だとうまく動かないのをなんとかする
+ 1枚スクリプトじゃなくて、ちゃんとクラスファイル作ろうかな
+ ホームディレクトリとかに js とか css のテンプレート置けると嬉しいかも
+ etc.

その他気になってること
---
+ gem のお作法とか、あってるか自信ない
+ 自動再生成で、eventmachine 使ってるんだけど、ちょっとオーバーキルっぽいなぁ
+ 移植する際、オリジナルの正規表現をちょっと書き換えたので、ぶっこわしてるかも
+ Nokogiri が勝手に Doctype とか <html> とか付加しちゃうのなんとかならないかなー。。。

patches welcome です！
---
+ [https://github.com/tsucchi/ruby-markdown2impress](https://github.com/tsucchi/ruby-markdown2impress)
+ [@tsucchi](https://twitter.com/tsucchi)

おしまい
===
