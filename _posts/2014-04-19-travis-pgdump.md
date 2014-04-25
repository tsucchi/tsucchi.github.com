---
layout: post
category: postgresql
tags: perl PostgreSQL travis-ci
title: TravisCI で pg_dump が使えないっぽい
---
{% include JB/setup %}
表記の通りなんですが、、最近 [Otogiri::Plugin::TableInfo](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo) というモジュールを作ってます。
んで、これで PostgreSQL のテーブル定義を出すために異常な努力をしているのですが、正解の CREATE TABLE 文を pg_dump で出したやつ(を元に要らない行を消したやつ)としています。

なので、pg_dump したやつと、僕が書いてるモジュールが出してるテーブル定義が一致するかをテストするのを書いてたのですが、

[なんかこんな感じ](https://travis-ci.org/tsucchi/p5-Otogiri-Plugin-TableInfo/jobs/23331710#L286)の悲しい感じになってます。

```
286 t/03_pg.t ....... 1/? pg_dump: server version: 9.3.2; pg_dump version: 9.1.11
287 pg_dump: aborting because of server version mismatch
```

うーん、コレ何とかする方法あるんでしょうか？

ってか、なんでこんな良くわからん事になってるんだろ...

### 2014-04-25 追記
travis って CPAN モジュールだけじゃなくて、ふつうにパッケージ入れたりできるみたいですね。なので、変な入れ方してるとダメな場合があるのだと思います。
`.travis.yml` に頑張って色々書いても良いのかもですが、それもそれでどうなのよ？って感じに思えたので、pg_dump がおかしかったらテストを skip するように
書き換えました。
