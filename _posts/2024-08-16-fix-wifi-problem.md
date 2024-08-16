---
layout: post
category: network
tags: ネットワーク
title: 家の wifi の 2.4GHzが不安定だったのを直した
---
{% include JB/setup %}

家の wifi の 2.4GHz帯がずっと不安定だった。リビングでPCとかスマホとか使う分には困らないのだけど、寝室とかの遠い場所とか、CatlogとかSwitch Botとか2.4GHzしかサポートしない機器もあるので困っていた。

原因がずっと分からなくて、工場出荷時戻しをすれば治るっぽいのでそれで暫定対応していたんだけど、なんか違うなー、って思ってた。

で、ある日 NAS のマウントに失敗してて、timemachine のバックアップが止まってた。その間は wifi が安定していた。「もしかしてこれかな？」と思って、timemachine のバックアップを1日1回に設定変えたらその間やっぱり安定している。で、手動でバックアップしたら不安定になって、ずっと分からなかった原因がやっとわかった。

わかったのはいいんだけど、バックアップ出来ないのも困るのでどうにか解消したくて調べてると。。。

+ [本機を使用すると無線LANやBluetoothの接続が不安定なのですが？](https://www.iodata.jp/support/qanda/answer/s20339.htm)

ハードディスクとwifi 2.4GHzが干渉する事例が色々あるらしい。シールドされたケーブルを使うといいとかあるけど、そんなの持ってないし、とりあえず1mくらい離してみた。そしたら治った。なんなんだこれ。。。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ウチのwifiの2.4GHz帯が落ちまくるのついに解決した。マジで分からなかった。。。timemachineのバックアップが走るとNASとそのJBODのディスクアクセスが発生するけど、それが干渉してたっぽい。物理的に1mくらい離したら発生しなくなった。</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1823330482282729617?ref_src=twsrc%5Etfw">August 13, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ウチのwifiの2.4GHz帯が落ちまくるのついに解決した。マジで分からなかった。。。timemachineのバックアップが走るとNASとそのJBODのディスクアクセスが発生するけど、それが干渉してたっぽい。物理的に1mくらい離したら発生しなくなった。</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1823330482282729617?ref_src=twsrc%5Etfw">August 13, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">上二つがウチで水色が5GHzで黄色が2GHz。黄色がプツプツ切れてたけど今はこういう感じで安定した。んで、その下のオレンジがクソつよバッファロー。ウチの寝室のエアコンもAPにもなっていて、紫がそれなんだけど、壁へだててるのにそれより強いってマジでなんなんだよ、ってずっと思ってた。 <a href="https://t.co/j0fiT6VPs7">pic.twitter.com/j0fiT6VPs7</a></p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1823332577979388264?ref_src=twsrc%5Etfw">August 13, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>