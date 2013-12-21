---
layout: post
category: perl
tags: perl timezone idiom
title: タイムゾーン文字列をオフセットに変換する
---
{% include JB/setup %}

### やりたいこと
'Asia/Tokyo' のようなタイムゾーンを表す文字列を、「+0900」や「32400」(秒=9h)に変換する。

### やり方
DateTime を使って変換する(?)

```perl
use strict;
use warnings;
use DateTime;
my $dt = DateTime->now();
$dt->set_time_zone('Asia/Tokyo');
warn $dt->offset;         # => 32400
warn $dt->strftime("%z"); # => +0900
```

### 微妙な点
+ DateTime だから重い(？)
+ インスタンスを作らないといけないところ
+ 専用の軽いやつとかないのかなぁ？
