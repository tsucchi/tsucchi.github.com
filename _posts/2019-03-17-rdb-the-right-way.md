---
layout: post
category: db
tags: db 書評
title: 「失敗から学ぶRDBの正しい歩き方」を読みました
---
{% include JB/setup %}

[@soudai1025](https://twitter.com/soudai1025)さんの本、[失敗から学ぶRDBの正しい歩き方](https://www.amazon.co.jp/gp/product/4297104083/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4297104083&linkCode=as2&tag=tsucchisblog-22&linkId=bf855755334071f8c720f61813101d55)を読みました。良い本でした。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=tsucchisblog-22&m=amazon&o=9&p=8&l=as1&IS2=1&detail=1&asins=4297104083&linkId=df616424f90dfcbb84b30d74d33f3fb6&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr">
</iframe>

## オススメの読者層

著者のそーだいさんが、どういった読者層を想定されてるのか分かりませんが、僕が読んだ感じでは

- パフォーマンスや保守性を意識したコードを書きたいけど、どうしたら良いかわからない開発者
- 駆け出しのインフラエンジニア
- アプリもインフラも両方みないといけない人

あたりに良さそうだな、と思いました。(僕はこの中だと3番目かな)

## 内容について

SQLアンチパターンと同じように、RDBMS を使っている際に陥りがちな罠を分かりやすく書いてあると思います。どの章も

- 具体例(実例？)のある逸話
- 起こってしまう問題とその解説
- アンチパターンを防ぐには
- まとめ

といった感じでまとまっていて、とても読みやすいです。技評のサイトに[サンプル](https://gihyo.jp/book/2019/978-4-297-10408-5)があるので、迷っている方はこちらを見ると良いのではないでしょうか。1章あたりの分量も通勤中に少しずつ読んだりするのにもちょうど良く、文章の分かりやすさもあって、良いペースで読み進めることができました。

取り扱っているトピックもとても良くて、「やり過ぎたJOIN」なんかは前職でかなり苦しんだやつですし、「フラグの闇」なんかは現在悩まされているやつだったりします。ロックやインデックスに関する解説が丁寧で分かりやすいのも良かったと思います。

全般的に分かりやすい文章と丁寧な解説なのですが、内容は決して平易では無く、難しかったり面倒な物を丁寧にちゃんと説明している良書だと思いました。

あとは「SQLアンチパターン」なんかにも言えることだけど、「名前をつける」のは大事なことだと思っていて、こうやって名前をつけてパターン化してあげると、「これはそーだいさんの本にも書いてある○○ってアンチパターンだからやめよう」みたいな感じで(コードレビューの時とかに)話が早くなるので、良いです。

と、いうわけで、新学期を迎える前に(?)、ぜひ一家に一冊購入されて見ると良いのではないでしょうか。ではでは。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=tsucchisblog-22&m=amazon&o=9&p=8&l=as1&IS2=1&detail=1&asins=4297104083&linkId=df616424f90dfcbb84b30d74d33f3fb6&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr">
</iframe>







