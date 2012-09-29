---
layout: post
category: yapcasia
tags: yapcasia yapcasia2012 perl sql
title: YAPC::Asia 2012 発表資料「Perl と SQL のいろいろ」
---
{% include JB/setup %}

本日お越しいただいた方、有難うございました。

発表資料は下記に置いておきます。アニメーションちゃんと動いてないけど、ご了承ください。ちゃんとしたやつ(LibreOffice で書いてます)が欲しい方は
私のところまでご連絡ください。

<iframe src="http://www.slideshare.net/slideshow/embed_code/14511986" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="http://www.slideshare.net/tsucchi/perlsql" title="PerlとSQLのいろいろ" target="_blank">PerlとSQLのいろいろ</a> </strong> from <strong><a href="http://www.slideshare.net/tsucchi" target="_blank">Takuya Tsuchida</a></strong></div>

## Q.A.
- Q1. トランザクションのところで、例外処理とかしなくてよいのが LL の良さなので、try/catch するのはあまり良くないのでは？
- A1. 確かにその通りで、今回紹介できなかったが、トランザクション管理モジュールを使うのがお勧め(DBIx::TransactionManager)

- Q2. SQL インジェクションについて。プレースホルダを使うのは知っている人は知っている。知らない人に強制させる方法は何かないか？
- A2. DBI では難しい。ORM などを使うのがよいのではないか。

