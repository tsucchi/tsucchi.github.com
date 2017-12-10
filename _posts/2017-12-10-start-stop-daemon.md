---
layout: post
category: linux
tags: linux
title: start-stop-daemon とちょっと変わったユースケースについて
---
{% include JB/setup %}

これは [OSS紹介 Advent Calendar 2017](https://qiita.com/advent-calendar/2017/favorite-oss) の10日目の記事です。

本日紹介するのは、[start-stop-daemon](https://man.cx/start-stop-daemon(8)/ja) です。Ubuntu ではおなじみで、init系のスタートアップスクリプトに噛ませると pid ファイル作ってくれたり、pid ファイルをみてプロセス殺してくれたり、daemonize してくれたりする便利君です。

Ubuntu 以外の環境(僕のところでは、CentOS) でも有用そうだな、と思って使ってみようと思ってググって見たのですが、[例えばこちら](http://blog.kjirou.net/p/1576) などにある、`developer.axis.com` というサイトがどうもポリシーが変わったのかなんなのか、ソースが置いてなくて、使えないじゃん。。。となります。(めっちゃググってみたけど、なぜかみんなココからソースを取って来てる。。。コピペ記事なのか？)

と、いうわけで、別のアプローチで調べてみたら、github に移植版(?)があったので、こちらを使うことにしました。

+ [daleobrien/start-stop-daemon](https://github.com/daleobrien/start-stop-daemon)

基本的な使い方は、同梱されている example_service にもあるように、[こんな感じ](https://github.com/daleobrien/start-stop-daemon/blob/master/example_service#L25-L34)で、init スクリプト作る際に使うのがメインかと思います。

へーしゃでは、プロセス管理に主に monit を使っているので、monit のスクリプトに組み込んで活用しています。ざっくりこんな感じ。

```monit
check process hoge_service with pidfile /var/run/hoge_service.pid
  start program = "/usr/sbin/start-stop-daemon --start --background --startas /home/hoge/bin/hoge_service.pl --make-pidfile --pidfile /var/run/hoge_service.pid" as uid hogeuser and gid hogegroup
  stop  program = "/bin/bash -c '/usr/sbin/start-stop-daemon --stop --pidfile /var/run/hoge_service.pid && rm -f /var/run/hoge_service.pid'" as uid hogeuser and gid hogegroup
  if 5 restarts within 5 cycles then stop
```

`hoge_service.pl` を最初から daemonize しておけば良いのでは？と言われると、全くその通りなのですが、ただ、このスクリプトは元々 docker で動かす予定で、一部環境では docker で動かしています。

ただ、一部では docker に載せられなかった環境もあって、そこでは普通に起動する必要があり、`monit` + `start-stop-daemon` で動かすことになった、という背景です。

以上、`start-stop-daemon` の紹介と少し変わった使い方のお話でした。
