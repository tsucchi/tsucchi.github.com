---
layout: post
category: misc
tags: builderscon
title: builderscon tokyo 2018 に行ってきた
---
{% include JB/setup %}

[builderscon tokyo 2018](https://builderscon.io/tokyo/2018) に行ってきました。本当は全日程参加する気満々だった(でチケットを買った)のですが、仕事が色々バタバタしており、最終の土曜日のみの参加。。。無念。。。

## 見てきたやつの話

### [次世代通信プロトコルにおけるセキュリティ・プライバシー保護・パフォーマンス (Security, privacy, performance of the upcoming transport protocols)](https://builderscon.io/tokyo/2018/session/befa5a63-989f-49b8-8b1c-ef86da52fc58)

TLS1.3とその周辺技術のお話し。プロトコル策定と技術周りの生々しくもとても興味深い話でした。暗号技術は難しくてとっつきにくくて、僕はあまり理解できていると言い難いところがありますが、難しい概念を分かりやすく説明していたし、実装にも関わっているからこそのリアルな話はとても興味深いものでした。

### [あなたの知らないデータベースのロギングの世界](https://builderscon.io/tokyo/2018/session/87e13506-2f80-4fae-af9c-2421c7dbb460)

「知らなかった、を聞く」というテーマにぴったりな話でした。監査ログを取る方法は色々あると思うのですが、エンプラ系のRDBMS(Oracleとか)じゃないと、ツールが揃ってなくて大変そう、と思いました。ウチも Oracle とかじゃないから、他人事ではないんだよな。。。

ProxySQLは、デフォルト(?)でコネクションを束ねちゃうの、あれ大丈夫なんですかね。。。AUTO_INCREMENT だけでなく、トランザクションが破滅するのでは。。。と非常に気になりました。

### [ブログサービスのHTTPS化を支えたAWSで作るピタゴラスイッチ](https://builderscon.io/tokyo/2018/session/57d5f68d-cfa2-4b43-9c4d-71394700090e)

証明書の発行周りを自動化する話。ちゃんとしててすごい。(うちは手動な部分が多いので。。。)
バッチだと大変だからドメインごと1イベントになると良い、というのは最近似たようなことやってたのですごく共感できました。

### [Using Chrome Developer Tools to hack your way into concerts](https://builderscon.io/tokyo/2018/session/a9e04c66-219e-4d33-9315-f597b8f97829)

ライブコーディングならぬ、ライブクラッキング。斬新さという意味では一番面白かった。
Chrome のデベロッパーツールはよく使っていますが、他の人が使っているところを見ると、色々発見があって面白い。(これはライブコーディング系でしか味わえない面白さだと思う。

### [Extending Kubernetes with Custom Resources and Operator Frameworks](https://builderscon.io/tokyo/2018/session/c13209ac-ea4a-4f71-b748-fe9fcebcda9a)

Kubernetes を拡張する話。正直これはチョイスをミスった。。。もうちょっと初心者向けの話だと思ってた。。。k8sをヘビーに使ってる人なら満足できる内容だったんじゃないかな、と思う。僕は初心者なので全然理解できんかった。。。

### [Lightning Talks](https://builderscon.io/tokyo/2018/session/c3499879-85d6-11e8-b5f0-42010af006c2)

毎度のことながらレベルが高くてすごい。面白かった。

## その他諸々

最近技術系イベント・カンファレンスにあまり行っていなかったので、久しぶりにお会いする人が多くて楽しかった。(ので、懇親会とか出たかった。。。)。ってか、初日行けなかったから、うずらさんとか、moznionさんとか、しんぺいさんとかの見れなかったのめっちゃ後悔した。。。

## 名札の話

スポンサーチケットを買ったので、無事謎の名札ガジェットをゲットしました。

が、USB ケーブルがなかったし、二日目ということもあり、微妙なタイミングでやっと遊び始める始末。。。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">名札できた(今更 <a href="https://t.co/S7sMG7L3oR">pic.twitter.com/S7sMG7L3oR</a></p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1038329124203290624?ref_src=twsrc%5Etfw">2018年9月8日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

本当はこんな感じの、[ミルキィホームズのファイナルライブ](http://milky-holmes.com/news/2018/06/09/2904)を宣伝する名札で懇親会出たかったですね。。。

## 最後に

知らなかった話をたくさん聴けました。楽しかった。
来年もぜひ参加したいし、機会があればいつか発表とかできるといいな、と思っています。
