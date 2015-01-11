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

### 2015-01-11 追記2
いつ対応したのか忘れましたが、pg_dump のインストール状態に応じてカバレッジ、というか流れるテストが変わってしまうのは良くないと思い、頑張ってインストールするようにしました。今のところ、これで問題なく動いているみたいです。

https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo/blob/master/.travis.yml

```yaml
language: perl
perl:
  - 5.16
  - 5.18
  - "5.20"
before_install:
  - sudo apt-get remove postgresql-client
  - sudo apt-get install postgresql-client
  - cpanm --force Test::mysqld Test::PostgreSQL
  - cpanm -n Devel::Cover::Report::Coveralls
  - cover -delete 
script:
  perl Build.PL && ./Build build && cover -test -report coveralls
```
