---
layout: post
category: perl
tags: perl db mysql XS
title: DBD::mysql の不具合っぽい挙動を見つけたので、とりあえず issue あげてみた
---
{% include JB/setup %}

きっかけはこの記事。[DBIのプレースホルダーで起こった謎な挙動 - $shibayu36->blog;](http://shibayu36.hatenablog.com/entry/2013/03/04/102518)

「うーん、どう見てもバグっぽいな」と思い、また、自分がメンテしてる[DBD::mysqlPP](https://github.com/tsucchi/p5-DBD-mysqlPP)で悩みつつ LIMIT のプレースホルダーを実装したことがあったので、「参考になるかなー」と思って、本家の方のソース読んでみた。

本家だから、かっちょいいパーサとか組んで SQL ステートメント読んでるものとばかり思っていたのだけど、根性でパースしてる感じのソースで、「これは大変だなー」って思った。で、問題っぽいのがこれ。 dbdimp.c 602行目あたり。

{% highlight C %}
/*
  it would be good to be able to handle any number of cases and orders
*/
if ((*statement_ptr == 'l' || *statement_ptr == 'L') &&
    (!strncmp(statement_ptr+1, "imit ?", 6) ||
     !strncmp(statement_ptr+1, "IMIT ?", 6)))
{
  limit_flag = 1;
}
{% endhighlight %}

良く見れば分かりますが、「limit ?」or「LIMIT ?」にしかマッチしません。ですので、元記事にあった「limit  ?」(スペース2つ)とか、「LIMIT 1 OFFSET ?」とかを bind しようとすると、 limit_flag が立たずに意図せずクォートされてしまって、シンタックスエラーになってしまうみたいです。

回避は容易なので、ほっといても良いのかもですが、怪しい英語頑張って書いて、 github issue にあげときました。(どこにレポートあげるのが正しいのか良く分からなかったのだけど、github で良かったのだろーか？...怖い文面の自動リプライとか来なかったので、一応大丈夫だとは思いますが。。。)

- [placeholder in LIMIT causes syntax error - github](https://github.com/CaptTofu/DBD-mysql/issues/38)

直すなら、「upper case か lower case どちらかに統一したうえで、"limit" にマッチさせ、次の token が "?" だったら limit_flagを立てる」、ってのが正しい修正なのでしょうけど、超絶めんどくさいな。C言語での文字列処理だし。。。自分だったらやらないw。

こういうちょっと変なパターンとか、サブクエリ中の LIMIT とか、コメントアウトとか、この辺の実装を真面目にやろうとすると頭痛くなるようなパターン多数ありますからねー。

server side prepare 改善してくとか、mysql のクライアントライブラリが公式のパーサを用意してくれるとかなると、もうちょっとなんとかなりそうな気もしますが、現状は「LIMIT, OFFSET に bind したい場合、LIMIT の後ろは空白1つ。LIMIT と OFFSET の両方にプレースホルダ置いとく」ってのが無難かな。完全に Workaround だけど。

動的プレースホルダ実装しているドライバ(大抵のデフォルトはそうだと思うんだけど)は同じ悩みかかえてるはずなんですけど、他の言語だとどうなってるんですかねー？

### おまけ、実況中継
- [DBD::mysql の不具合っぽい挙動を調べた - Togetter](http://togetter.com/li/466159)
