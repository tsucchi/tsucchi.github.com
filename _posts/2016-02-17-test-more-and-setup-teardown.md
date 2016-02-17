---
layout: post
category: perl
tags: perl test
title: Test::More で xUnit ライクな setup/teardown とかをやる話
---
[昔々、subtest と Hook::LexWrap を使って xUnit みたいな setUp, tearDown　をする](http://d.hatena.ne.jp/tsucchi1022/20110703/1309650762)というのを書いてたのですが、もっとシンプルで良い感じなのができたのでご紹介。

ほぼほぼ、[@lestrrat](https://twitter.com/lestrrat)さんの[Re: “Test::Moreのsubtestのテストはどう書くのが一番きれいなのか”](http://lestrrat.ldblog.jp/archives/26535307.html) のパクリなんですけどね。

subref でやる方が、柔軟性は高いと思うのですが、setup は一つのテストファイルで共通化しといた方が良い、というか、共通化できないのはやばいので、subref にするのはやりすぎかなぁ、と思ったので、普通のサブルーチンにしてみた感じです。

```perl
use strict;
use warnings;
use Scope::Guard;
use Test::More;

BEGIN {
    # startup の代わり
    diag "startup\n";
}

END {
    # shutdown の代わり
    diag "shutdown\n";
}

sub teardown {
    #...  ここに teardown でやりたい終了処理を入れる
    diag "teardown\n";
}

sub setup {
    #... ここに setup でやりたい初期化処理を入れる
    diag "setup\n";
    return Scope::Guard->new(\&teardown);
}

subtest 'テストケース1', sub {
    my $guard = setup();
    #...以下テストケースを実施
    ok 1; #dummy
};

subtest 'テストケース2', sub {
    my $guard = setup();
    #...以下テストケースを実施
    ok 1; #dummy
};

done_testing;
```

xUnit 系に馴染みにない方のために、一応説明しておくと、

```
startup: 最初に1回だけ実行
shutdown: 最後に一回だけ実行
setup : テストケース毎の、最初に1回だけ実行
teardown: テストケース毎の、終わりに1回だけ実行
```

といった処理です。重いけど必要な奴は startup で初期化し、shutdown で廃棄。テストケース毎に必要なリソース(大抵DBとかそういうの)は、setup で初期化して、teardown でキレイにする。といった感じですね。

実行すると、こんな感じになります。

```
$ prove -MTest::Pretty test.t
/Users/tsucchi/test.t .. # setup
    # startup
    # teardown
/Users/tsucchi/test.t .. 1/?     # setup
    # teardown
# shutdown
/Users/tsucchi/test.t .. ok   
All tests successful.
Files=1, Tests=2,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.01 cusr  0.00 csys =  0.03 CPU)
Result: PASS
```

上記の通りに初期化・終了処理が実行されてるのが分かるかと思います。


