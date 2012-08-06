---
layout: post
category: test
tags: perl ruby test RSpec
title: RSpec だと何がうれしいのか良く分からないので、Perl でそれっぽいの書いてみた
---
{% include JB/setup %}

なんか、最近 Rails 界隈を中心に RSpec がオワコンだ、的な話があったりとか、なんか盛り上がってて楽しそうなんだけど、
僕は Ruby ほとんど書けないし書かないので、何がうれしくて何が悲しいのか分からないのが悲しいので、Perl で書きながらお勉強してみた。

教材はこれ<a href="http://d.hatena.ne.jp/t-wada/20100228/p1">RSpec の入門とその一歩先へ - t-wadaの日記</a>

## 最初のテスト

{% highlight perl %}
#!perl
use strict;
use warnings;

use Test::More;

subtest 'message filter', sub {
    use_ok('MessageFilter');
}

done_testing;
{% endhighlight %}

## 最初のテストを実行

    tsucchi@vogue[582]$ prove -l t
    t/message_filter.t ..     # No tests run!
    t/message_filter.t .. 1/? 
    #   Failed test 'No tests run for subtest "message filter"'
    #   at t/message_filter.t line 9.
    # Looks like you failed 1 test of 1.
    t/message_filter.t .. Dubious, test returned 1 (wstat 256, 0x100)
    Failed 1/1 subtests 
    
    Test Summary Report
    -------------------
    t/message_filter.t (Wstat: 256 Tests: 1 Failed: 1)
      Failed test:  1
      Non-zero exit status: 1
    Files=1, Tests=1,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.01 cusr  0.00 csys =  0.03 CPU)
    Result: FAIL

クラス(Perl なのでパッケージ)作ってないからテストはこける。


## クラスを作る

{% highlight perl %}
package MessageFilter;

1;
{% endhighlight %}

## 「クラスを作る」で作ったクラスを実行

    tsucchi@vogue[587]$ prove -l t
    t/message_filter.t .. ok   
    All tests successful.
    Files=1, Tests=1,  0 wallclock secs ( 0.02 usr +  0.00 sys =  0.02 CPU)
    Result: PASS

テストが通った。

## 最初のテスト

{% highlight perl %}
#!perl
use strict;
use warnings;

use Test::More;
use MessageFilter;

subtest 'use_ok', sub {
    use_ok('MessageFilter');
};

subtest 'should detect message with NG word', sub {
    my $filter = MessageFilter->new('foo');
    ok( $filter->detect('hello from foo') );
};

done_testing;
{% endhighlight %}

通常系のテストを足した。

## 最初のテストを実行
    
	tsucchi@vogue[592]$ prove -l t
    t/message_filter.t .. 1/? Can't locate object method "new" via package "MessageFilter" at t/message_filter.t line 13.
    # Child (should detect message with NG word) exited without calling finalize()
    
    #   Failed test 'should detect message with NG word'
    #   at /home/tsucchi/perl5/perlbrew/perls/perl-5.16.0/lib/5.16.0/Test/Builder.pm line 252.
    # Tests were run but no plan was declared and done_testing() was not seen.
    t/message_filter.t .. Dubious, test returned 29 (wstat 7424, 0x1d00)
    Failed 1/2 subtests 
    
    Test Summary Report
    -------------------
    t/message_filter.t (Wstat: 7424 Tests: 2 Failed: 1)
      Failed test:  2
      Non-zero exit status: 29
      Parse errors: No plan found in TAP output
    Files=1, Tests=2,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.01 cusr  0.00 csys =  0.03 CPU)
    Result: FAIL

実装がないのでこける。

## 仮実装
{% highlight perl %}
package MessageFilter;
use strict;
use warnings;

sub new {
    bless {}, shift;
}

sub detect {
    return 1;
}


1;
{% endhighlight %}

## 仮実装を実行

    tsucchi@vogue[595]$ prove -l t
    t/message_filter.t .. ok   
    All tests successful.
    Files=1, Tests=2,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.02 cusr  0.00 csys =  0.04 CPU)
    Result: PASS


通った。... 三角測量とかだるいのでやらない。RSpec 関係ないし。

## 明白な実装

{% highlight perl %}
package MessageFilter;
use strict;
use warnings;

sub new {
    my ($class, $word) = @_;
    my $self = {
        word => $word,
    };
    bless $self, $class;
}

sub detect {
    my ($self, $text) = @_;
    my $word = $self->{word};
    return $text =~ qr/$word/;
}

1;

{% endhighlight %}

## 明白な実装を実行

    tsucchi@vogue[599]$ prove -l t
    t/message_filter.t .. ok   
    All tests successful.
    Files=1, Tests=2,  1 wallclock secs ( 0.02 usr  0.00 sys +  0.02 cusr  0.00 csys =  0.04 CPU)
    Result: PASS

もちろんこれも通る。

## before とか無いので、setup 処理を書く

<a href="http://d.hatena.ne.jp/tsucchi1022/20110703/1309650762">前にブログにかいた</a>けど、Hook::LexWrap を使うとこういうの対応できる。
三角測量のときの失敗のテストもついでに足した。

{% highlight perl %}
#!perl
use strict;
use warnings;

use Test::More;
use MessageFilter;
use Hook::LexWrap;

subtest 'use_ok', sub {
    use_ok('MessageFilter');
};

my $filter;

wrap 'subtest',
    pre => sub {
        $filter = MessageFilter->new('foo');
    };

subtest 'should detect message with NG word', sub {
    ok( $filter->detect('hello from foo') );
};

subtest 'should not detect message with NG word', sub {
    ok( !$filter->detect('hello world') );
};

done_testing;

{% endhighlight %}

## なんか重複がどうとかいってるけど

そんなのべつにどうでも良くね？

{% highlight ruby %}
require 'rubygems'
require 'spec'
require 'message_filter'
 
describe MessageFilter, 'with argument "foo"' do
    subject { MessageFilter.new('foo') }
    it { should be_detect('hello from foo') }
    it { should_not be_detect('hello, world!') }
end
{% endhighlight %}

うーん、上記のやつと、Perl の最終のやつにどういう差があるのかオイラには分からなかったや。暗黙なあんなこんなはキモいから
setup もあんまり良くないって xUTP に書いてあった気がするけど、RSpec のやつはそれどころの騒ぎじゃなく暗黙のあんなこんな
が入ってるように見えるんだけど、いいのかな？

仮に短く書けることを美徳とするなら、確かに美しいのだが、僕は「冗長なのはダメだけど、短けりゃいいってもんでもない」、
ってスタンスでプロダクトコードもテストコードも書いてるので、なんだかなぁ、という印象。(Perl のも冗長さは無いでしょう？)
先に進むともうちょっと見え方変わるかな？

ちなみに、この例にしたがわないなら、僕はこのテストはこう書く。(破壊しないことが明確な場合はフィクスチャは分けない。
たいていその方がテストがシンプルになるから)

{% highlight perl %}
#!perl
use strict;
use warnings;

use Test::More;
use MessageFilter;

subtest 'use_ok', sub {# 多分実際はファイル分けるだろうな。use_ok だけのテストファイル作る。
    use_ok('MessageFilter');
};

subtest 'detect', sub {
    my $filter = MessageFilter->new('foo');
    ok( $filter->detect('hello from foo') );
    ok( !$filter->detect('hello world') );
};

done_testing;

{% endhighlight %}

Part2 に続く... かもしれない
