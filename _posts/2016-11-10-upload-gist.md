---
layout: post
category: perl
tags: perl git github
title: gist に雑に投げるスクリプト
---
{% include JB/setup %}

```
upload_gist.pl upload_shitai_file
```

みたいな感じで、gist に雑にアップロードするスクリプトを書いたらとても便利だったので、ここに記す。


```perl
#!/usr/bin/perl
use strict;
use warnings;
use utf8;

use WebService::GitHub;
use Config::Pit;
use File::Slurp;
use Encode;
use File::Basename;

my $filename = $ARGV[0];
if ( !defined $filename || !-e $filename ) {
    die "ファイル名が正しくありません\n";
}

my $config = pit_get('ghe');
my $content = read_file($filename);

$filename = basename($filename); #github に渡すファイル名はフルパスや相対パスはダメ

my $gh = WebService::GitHub->new(
    token    => $config->{gist},
    base_uri => 'https://haisya.no.ghe.co.jp/api/v3',
);

$gh->post('/gists', {
    public      => "true",
    files       => {
        $filename => {
            content => decode_utf8($content),
        }
    }
});
```

[WebService::GitHub](https://github.com/tsucchi/p5-WebService-GitHub) ってのは拙作の GitHub API の薄いラッパーで、無いなら無いで別に困らない(curl とかでも投げようと思えば github の API は投げれるので)けどあるとシンプルに書けるので僕は気に入っています。パスワードというか、API のトークンをそのままスクリプトに書くのは怖いので、 Config::Pit を使ってます。
