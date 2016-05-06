---
layout: post
category: perl
tags: perl kichijojipm
title: 吉祥寺.pm7 に行ってきました
---
{% include JB/setup %}

4/22 に開催された、[吉祥寺.pm7](http://kichijojipm.connpass.com/event/28818/) に行ってきました。

だんだん記憶が薄れゆく感じなので、雑な感想を書きます。

## Talk1:Perl の use strict をもっと活かすための,fields、保存時検査、そして import の使い方(hkoba501)

fields はなんとなく知ってるけど、全く使ったことなくて、なかなか面白い話だった。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=tsucchisblog-22&o=9&p=8&l=as1&asins=4894713004&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

オブジェクト指向Perlマスターコース(↑)くらいの時代に考えられてた、理想のオブジェクト指向Perlの完成系がこんな感じなのかなー、とか思いながら聞いてた。

## Talk2:技術的負債だらけのチームで技術マネージメントしてみた(やっさん)

(2016/05/05 追記)スライド公開されてたみたいです(↓)

+ [Kichijoji pm7[talk2]技術的負債だらけのチームで技術マネージメントしてみた](http://www.slideshare.net/yasukazunagatomi/kichijoji-pm7talk2)

チームのマインドを変えながら勉強会を立ち上げたり色々やる話。大変そうな環境だけど、ちゃんと変えられているっぽくて、なかなかすごいな、と思いました。

## Talk3:その時、君にガンダムに乗る決意をさせたものは何だ(i47_rozary)

ブライトさんの名言を中心にマネージメントについて、もしくはマネージメントをどうして志すことになったか、と言う話。(変な方向に?)完成度が高くてとても面白かった。

## 特別企画:PCバッグ現状確認会

PC バッグについて、どんなのを使ってて、どういうところがコダワリかという話。凝っている人は凝っているみたいだし、papixさんみたいに徹底的にこだわらない(YAPCのトートバッグを使ってる。あれはあれで確かに便利なやつだ)人もいるし、みなさん色々ですね。

## LT1:Perl入学式と現場のギャップ(htk291)

Perl 入学式を終えて、実際に Perl を使う仕事をするようになって、そこで知ったこととか。ソートとか、なるほど確かに、って思った。

## LT2:「超カジュアルかつ自由にモジュールを使う方法」(karupanerura)

fatpack とか大変なので、一枚スクリプトを実行したタイミングで、一時ディレクトリにモジュールをインストールして実行する、というやつ。キワモノなのかと思いきや、本番とか安易にモジュール入れられないところで使うスクリプトを想定してるみたい。

## LT3:データベースマイグレーションの話(タイトル忘れちゃいましたすいません)(papix)

(2016/05/05追記)
データベースマイグレーションツールの話。マイグレーション自体はそんなに難しくない(難しさはあるけど、ツールだけで解決できないものが多い)けど、ORMと一緒にあれこれできると単純に便利になっていいよね、みたいな話を懇親会でしていたのに、本編の方を忘れてました。。。記憶力がやばい。。。

デモが失敗気味でちょっと分からなかったのですが、DDLの差分を見ながら ALTER を出してくれる君？なのかな。(ちゃんと動けば)便利そうでした。
(2016/05/05追記ここまで)

## LT4:PerlでBDD(dokechin)

Perl で Cucumber 使って BDD する話。最近僕も Selenium WebDriver 使ってテスト書いてたので、なるほどと思いながら聞いてたけど、BDD はやっぱり大変そうだなー。

## LT5:LT about Moosex-App (https://metacpan.org/release/MooseX-App) in English(Maroš Kollár)

Moosex::App なかなか便利そうだな、と思った。コマンドラインツール作ることあんまり無いけど、今度作る時は検討してみてもいいのかなぁ。

懇親会で、「日本だと Mouse とか Moo とか使うけどやっぱ Mooseなんですか？」みたいなことを聞いてみたら、やっぱり「Moo がちょっと使われてるけど Moose が多い」(僕の聞き取りが間違ってなければ)とのことでした。

## LT6:(すいません、タイトル覚えてないです)YAPCの話(makamaka)

[YAPC::Asia Hachioji 2016 mid in Shinagawa](http://yapcasia8oji-2016mid.hachiojipm.org/) の宣伝的な話。楽しみ。

## 懇親会
なんかデータベースマイグレーションの話とか、海外の話(Maroš さんとちょっとだけ話した。上述のやつ)とか、金沢行くとミルキィが見れる話とかをしてた。

と、いうわけで今回もとても楽しかったのでまた参加したいです。