---
layout: post
category: perl
tags: perl
title: ひさびさに STDIN キャプチャしようとしたら、ちょっとだけハマった
---
{% include JB/setup %}

多分、[コレ](http://d.hatena.ne.jp/tsucchi1022/20090604/1244126883)とかの続きっぽい話。

[PerlIO::scalar でopenできるのはバイト列だけ！ - Islands in the byte stream](http://d.hatena.ne.jp/gfx/20130426/1366947365)
```
Perl 5.18 からは、PerlIO::scalarでopenできるのはバイト列だけになるようです。
```

とのことだったので、「あれ？utf8の文字列を STDIN 経由でキャプチャしたらどうなるんだっけ？」とか、ちょっと気になったのでやってみた。

最初に書いたのがコレ。(いつものやつです)

```perl
#!/usr/bin/perl
use strict;
use warnings;
use utf8;

use Test::More tests => 1;

sub cat {
    my $result = '';
    while( <STDIN> ) {
        $result .= $_;
    }
    return $result;
}

{
    my $inputs = "あ\nい\nう\n";
    open my $IN, '<', \$inputs;
    local *STDIN = *$IN;
    is( cat(), "あ\nい\nう\n" );
    close($IN);
}
```

で、5.17.11 とかでコレを実行すると

```
tsucchi@vogue[521]$ prove a.t
a.t .. Strings with code points over 0xFF may not be mapped into in-memory file handles
readline() on closed filehandle $IN at a.t line 10.
a.t .. 1/1
#   Failed test at a.t line 20.
...
```

確かにコケる。でも、5.16.3 とかでやってもやっぱりコケる。あれ？？

```
tsucchi@vogue[522]$ perlbrew switch perl-5.16
tsucchi@vogue[523]$ prove a.t
a.t .. 1/1
#   Failed test at a.t line 20.
Wide character in print at /home/tsucchi/perl5/perlbrew/perls/perl-5.16/lib/5.16.3/Test/Builder.pm line 1759, <STDIN> line 3.
#          got: 'a??
# a??
# a??
# '
#     expected: 'あ
# い
# う
# '
# Looks like you failed 1 test of 1.
...
```

バイト列が OK で、文字列が NG なので、このスクリプトは「use utf8;」を外すと通る。

冷静に考えれば、STDIN 経由で入ってくる入力は、(文字列じゃないから)、処理する前に
decode かけるべきものなので、こんな感じで書いた方が本物っぽいかな。

```
#!/usr/bin/perl
use strict;
use warnings;
use utf8;
use Encode;

use Test::More tests => 1;

sub cat {
    my $result = '';
    while( <STDIN> ) {
        $result .= decode_utf8($_);
    }
    return $result;
}

{
    my $inputs = encode_utf8("あ\nい\nう\n");#STDIN は外部だからデコードされてない
    open my $IN, '<', \$inputs;
    local *STDIN = *$IN;
    is( cat(), "あ\nい\nう\n" );
    close($IN);
}
```

こうすると、5.17 でも通ります。(5.16 でも通りました)

```
tsucchi@vogue[526]$ perlbrew switch perl-5.17
tsucchi@vogue[527]$ prove a.t
a.t .. ok
All tests successful.
Files=1, Tests=1,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.02 cusr  0.00 csys =  0.04 CPU)
Result: PASS
```

STDIN 捕まえるテストのネタは、面白いのでシリーズ化してますが、今回みたいに間違ったりしがちだし、
無しで済むならやらない方がいいですね。。。
