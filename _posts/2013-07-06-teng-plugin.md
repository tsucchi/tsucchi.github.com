---
layout: post
category: perl
tags: perl db orm
title: Teng::Plugin::RowObjectEnableSwitcher ってのを書いてみた
---
{% include JB/setup %}

某チャットで、「guard で Row オブジェクト作るかどうか切り替える物体を昔作ったよ！」って話をしたら、
なかなか好評だったので、Teng のプラグインとして書いてみた。(書いたのは結構前なのだけど、記事を書きそびれてました...)

- [Teng::Plugin::RowObjectEnableSwitcher](https://github.com/tsucchi/p5-Teng-Plugin-RowObjectEnableSwitcher)

Synopsis まるコピーですが、大体こんな感じで使えます。

```perl
use MyProj::DB;
use parent qw(Teng);
__PACKAGE__->load_plugin('RowObjectEnableSwitcher');

package main;
my $db = MyProj::DB->new(dbh => $dbh);
{
    # Row オブジェクトが無効に(suppress_row_object は 1)
    my $guard = $db->row_object_enable(0);
    {
        # Row オブジェクト有効に (suppress_row_object は 0)
        my $guard2 = $db->row_object_enable(1);
        ... # Teng つかってアレコレする
    }
    # $guard2 がなくなる(Row オブジェクトが無効に)
    ... # Teng つかってアレコレする
}
# $guard がなくなる(Row オブジェクトが有効に)
```

この例だとメリットあんま分からないかもですが、メソッド/関数なんかもスコープ持ってて guard が効くので、「メソッド内だけ Row オブジェクトを有効/無効」とかがカジュアルに出来て便利だと思います。

これはもともと僕が作ってる(た?) [Kappa](https://github.com/tsucchi/p5-Kappa) という ORM が持ってた機能で、それを Plugin として Teng に持ってきた、という感じです。テストコードは Teng と Kappa の悪魔合体や！

メソッド名を Kappa のやつに合わせてるのは、「suppress_row_object って、設定なのに否定語で分かりにくいなー」ってのと、「$self の中身(フィールド)をごにょごにょするのはお行儀が悪いかなぁ」、って思ってのことです。「いや、suppress_row_object の方がいいだろ JK」ってお思いの方いましたら、issue でも pull-req でもなんでもください。対応するかも、です。

一番の問題は、僕が Teng 最近さわって無いので、ちゃんと動いてるか、ちゃんと確認する手段がないってことですね。。。

興味があれば、使っていただけるとうれしいです。

