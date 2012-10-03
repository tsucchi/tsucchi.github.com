---
layout: post
category: yapcasia
tags: yapcasia yapcasia2012 perl sql
title: YAPC::Asia 2012 発表資料「Perl と SQL のいろいろ」
---
{% include JB/setup %}

本日お越しいただいた方、有難うございました。裏番組が超強力(メインホールに宮川さん、お隣が弾さんのうえ、LTソンで gfx さんがやってるとか、まじありえないだろwってかマジでオレ涙目ですわー)でしたが、思いのほか、沢山集まっていただいて嬉しかったです。

発表資料は下記に置いておきます。アニメーションちゃんと動いてないけど、ご了承ください。ちゃんとしたやつ(LibreOffice で書いてます)が欲しい方は
私のところまでご連絡ください。(twitter なら @tsucchi ね。)

<iframe src="http://www.slideshare.net/slideshow/embed_code/14511986" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="http://www.slideshare.net/tsucchi/perlsql" title="PerlとSQLのいろいろ" target="_blank">PerlとSQLのいろいろ</a> </strong> from <strong><a href="http://www.slideshare.net/tsucchi" target="_blank">Takuya Tsuchida</a></strong></div>

あと、スライド中にも紹介した、nihen さんのトークが(はからずも)このトークの続きみたいな感じになっていて、いい感じなので一緒に見ておくと
良いかもしれません。これ => [very simple ORMapper Teng](http://yapcasia.org/2012/talk/show/3570fad2-d484-11e1-964b-37a36aeab6a4)。

## Q.A.
- Q1. トランザクションのところについて。例外処理とかあまり真面目にしなくてよいのが LL の良さなので、try/catch するのはあまり良くないのでは？
- A1. 確かにその通りで、今回紹介できなかったが、トランザクション管理モジュールを使うのがお勧め(DBIx::TransactionManager など)

- Q2. SQL インジェクションについて。プレースホルダを使うのは知っている人は知っている。知らない人に強制させる方法は何かないか？
- A2. DBI では難しい。ORM などを使うのがよいのではないか。

- Q3. SQL を (SQL::Library で)分離した際の、名前付けで注意しなければならないとのことだが、実際にどのようにつけているか？
- A3. ファイル名は SQL の FROM のテーブル名で、SQL 名は呼び出し元のメソッド名をつけています。

毎年マサカリが飛んできて、YAPC マジ怖いですw。
来年あたりは、「一般人だと思った？残念、逸般人でした！」って感じで、サクッとマサカリ投げ返したいですね！

## 補足
Data::Section::Simple (というか \_\_DATA\_\_ ファイルハンドルが mod\_perl では使えない、とスライドにありますが、
厳密には、mod\_perl ではなく、Apache::Registry/PerlRun などの、いわゆる「速いCGI」としての mod\_perl 環境の制限らしいです。
(と、[mod\_perl の神から、お告げがありました](https://twitter.com/mod_perl_info/status/253419203976118273) )
試したことないのですが、素の mod\_perl のハンドラだと使えるらしいです。
