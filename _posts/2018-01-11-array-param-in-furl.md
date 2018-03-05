---
layout: post
category: perl
tags: perl
title: Furl で配列のパラメータを渡す
---
{% include JB/setup %}

Furl で、配列のパラメータを渡すの(`hoge=aaa&hoge=bbb` みたいなやつ)をやろうとしたら、うまく行かなかったのでメモ。

### app.psgi

まず確認用の psgi を作ります。パラメータ `hoge` の値を返すだけの物体です。

```perl
#!/usr/bin/perl
use strict;
use warnings;
use Data::Dumper;
use Plack::Request;

my $app = sub {
    my $env = shift;
    my $req = Plack::Request->new($env);
    my @params = $req->parameters->get_all('hoge');
    return [
        200,
        [ "Content-Type", "text/plain" ],
        [ Dumper(\@params) ],
    ];
};
```

### test.pl (ダメ版)

普通にパラメータをハッシュリファレンスで渡すやり方です。Furl がいい感じに POST リクエストのパラメータに変換してくれることを期待しています。(値が配列でなければ問題なく動く)

```perl
#!/usr/bin/perl
use strict;
use warnings;

use Furl;
use URI;
my $param = { hoge => ['aaa', 'bbb'] };
my $ua = Furl->new();
my $header = [
    'CONTENT-TYPE'   => 'application/x-www-form-urlencoded',
];
my $res = $ua->post('http://localhost:5000', $header, $param);
warn $res->content;
```

さっきの PSGI アプリを動かした上で、実行するとこうなります。

```
perl test.pl
$VAR1 = [
          'ARRAY(0x7ffcb8803268)'
        ];
```

なんかおかしなもの(配列リファレンスじゃなくて、なぜかそのアドレスの文字列)が返って来ます。。。

`$param = { hoge => 'aaa' }` みたいな値の場合は

```
$VAR1 = [
          'aaa'
        ];
```

となるので、大丈夫なんですけどね。困ったものです。

### test.pl (大丈夫だった版)

「これはこれでどうなんだ」感はありますが、自前で URI モジュールでパラメータを作ってあげるとうまく動くようです。

```perl
#!/usr/bin/perl
use strict;
use warnings;

use Furl;
use URI;
my $param = { hoge => ['aaa', 'bbb'] };
my $ua = Furl->new();
my $uri = URI->new();
$uri->query_form($param);
my $header = [
    'CONTENT-TYPE'   => 'application/x-www-form-urlencoded',
];
my $res = $ua->post('http://localhost:5000', $header, $uri->query);
warn $res->content;
```

実行すると、こんな感じ。

```
$VAR1 = [
          'aaa',
          'bbb'
        ];
```

期待した通り、配列で値を渡すことができるようになっています。

あんまり深く追いかけていないのですが、LWP::UserAgent でもダメっぽいし、そもそもWebアプリとしては配列でパラメータを受けるのはだいぶ微妙(セキュリティーホールにならないように、Plack::Request はだいぶ面倒というか、あえて面倒にして Hash::MultiValue で受けないとダメにしているくらい)なので、あまり使っている人がいないのかもしれない。

あと、比較的モジュールが新しい環境で試してはいるのだけど、もしかすると周辺のモジュール(HTTP::Request とか HTTP::Message とかその辺)のバージョンを上げると治ってしまったりするのかもしれない。っていうかこの現象、バグっぽく見えるけど、本当にバグかどうか分からないし、どこがバグっているのかもイマイチ分からないので、こういうの悩ましいな、と思ったのでした。久々に変なの踏んだな。。。
