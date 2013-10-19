---
layout: post
category: perl
tags: perl db orm
title: Teng::Plugin::RowObjectEnableSwitcher あらため Teng::Plugin::RowObjectCreationSwitcher ってのを書いてみた
---
{% include JB/setup %}
### 追記 2013/10/19
[@songmu](https://twitter.com/songmu) さんにいくつかアドバイスもらったり、色々しつつ、名称などを直して CPAN にも上げました。

- [Teng::Plugin::RowObjectCreationSwitcher - CPAN](http://search.cpan.org/dist/Teng-Plugin-RowObjectCreationSwitcher/lib/Teng/Plugin/RowObjectCreationSwitcher.pm)
- [Teng::Plugin::RowObjectCreationSwitcher - github](https://github.com/tsucchi/p5-Teng-Plugin-RowObjectCreationSwitcher)

あと紹介記事も書いてもらった。

- [Teng::Plugin::RowObjectCreationSwitcherが便利な件](http://www.songmu.jp/riji/entry/2013-10-01-teng-plugin-row-object-creation-switcher.html)

## もともとの記事(名称などの表記を一部直しています)
某チャットで、「guard で Row オブジェクト作るかどうか切り替える物体を昔作ったよ！」って話をしたら、
なかなか好評だったので、Teng のプラグインとして書いてみた。(書いたのは結構前なのだけど、記事を書きそびれてました...)

- [Teng::Plugin::RowObjectCreationSwitcher - github](https://github.com/tsucchi/p5-Teng-Plugin-RowObjectCreationSwitcher)

Synopsis まるコピーですが、大体こんな感じで使えます。

```perl
use MyProj::DB;
use parent qw(Teng);
__PACKAGE__->load_plugin('RowObjectCreationSwitcher');

package main;
my $db = MyProj::DB->new(dbh => $dbh);
{
    my $guard = $db->temporary_suppress_row_objects_guard(1); # Row オブジェクトが作られなくなる(suppress_row_object=1)
    {
        my $guard2 = $db->temporary_suppress_row_objects_guard(0); # Row オブジェクトが作られるようになる。(suppress_row_object=0)
        ... # Teng をつかってあんなことやこんな事をする
    }
    # $guard2 が無くなる(Row オブジェクトの作成が再度無効に suppress_row_object=1)
    ... # do something
}
# $guard がなくなる(Row オブジェクトが作成されるようになる suppress_row_object=0)

```

この例だとメリットあんま分からないかもですが、メソッド/関数なんかもスコープ持ってて guard が効くので、「メソッド内だけ Row オブジェクトを有効/無効」とかがカジュアルに出来て便利だと思います。

これはもともと僕が作ってる(た?) [Kappa](https://github.com/tsucchi/p5-Kappa) という ORM が持ってた機能で、それを Plugin として Teng に持ってきた、という感じです。テストコードは Teng と Kappa の悪魔合体や！

メソッド名は最初は Kappa 側にあわせてたのですが、色々あって最終的に Teng 側にあわせるようにしました。

一番の問題は、僕が Teng 最近さわって無いので、ちゃんと動いてるか、ちゃんと確認する手段がないってことですね。。。

興味があれば、使っていただけるとうれしいです。

