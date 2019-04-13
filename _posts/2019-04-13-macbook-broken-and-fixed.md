---
layout: post
category: mac
tags: mac
title: macbook が調子悪くなって、完全に壊して、治った、という話
---
{% include JB/setup %}

1月14日に、macbook にビールをこぼして壊してしまいました。

twitter を発掘したところ、当時の状況はこんな感じだったっぽい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">[悲報] macbookにビール飲ませて壊したっぽい。まじで凹んでいます</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1084800504322904065?ref_src=twsrc%5Etfw">January 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">充電のUSB指したときのビープは鳴るので、息はしてるのかもしれんけど、とにかく応答しないので、意識不明の重体といった感じ</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1084802175438446593?ref_src=twsrc%5Etfw">January 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

しばらくは電源も入らず、完全に死んでいるっぽい状態でしたが、しばらくしたら電源は入るようになりました。
しかしキーボードはおかしいし、タッチパッドは全く動かない状態。。。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">キーボードがだいぶ怪しくて、タッチパッドが死んでしまった模様...乾いたら治るかな。。。治るといいな。。。</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1084814348634091520?ref_src=twsrc%5Etfw">January 14, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

翌日以降はキーボードはだいたい動くように、タッチパッドは完全に怪しい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">s/まとお/まとも/ やっぱグリッチしてるw</p>&mdash; tsucchi (@tsucchi) <a href="https://twitter.com/tsucchi/status/1085005307695194113?ref_src=twsrc%5Etfw">January 15, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そのあとも、騙し騙し使って来て、キーボードはエアダスター吹いたら、ほぼ問題無くなりました。タッチパッドは相変らず怪しくて、カーソルが勝手に動いたり、そうかと思えば全く動かなくなったり。エアダスター吹いてみても、構造的に意味なさそうだし、実際に意味無かったです。

Bluetooth のマウス使ってしのぐも、カーソルが勝手に動いてしまうのが致命的で、とにかく使いにくいので、修理しよう、と思いました。


公式にせよ、非公式にせよ、トラックパッドの交換修理は高そうなので、まずは分解掃除してみようと思って、[ifixit](https://jp.ifixit.com/Guide/Retina+MacBook+2017+Trackpad+Assembly+Replacement/104470) のサイトを見て調べたら、「これくらいならできそうだし、部品もココで買えるべ」と思ったので、まずは分解するためのドライバーを買うことにしました。

しかしながら、ifixit だと空輸する分、送料とか時間がかかるし、かといって、修理に必要そうな部品とか工具一式買って分解掃除だけで治ったら勿体ない(トラックパッドとか1万以上する)ので、amazon でこれを買いました。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=tsucchisblog-22&m=amazon&o=9&p=8&l=as1&IS2=1&detail=1&asins=B075GHTC74&linkId=651627753902c7a014f9862b946e9213&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr">
</iframe>

で、[ifixit](https://jp.ifixit.com/Guide/Retina+MacBook+2017+Trackpad+Assembly+Replacement/104470) を見ながら、分解していったのだけど。。。

ケーブル切りました orz

この[「手順5」](https://jp.ifixit.com/Guide/Retina+MacBook+2017+Trackpad+Assembly+Replacement/104470#s20821)は要注意。フタは「45度以上開けないように」と書いてありますが、これは絶対です。開きすぎると、上面側にあるトラックパッドと、下面側にあるシステムボードを繋いでいるケーブルが強く引っ張られて切れてしまうのです。

組み直して、「最悪トラックパッドだけ使えないならいいか」と思い電源を入れてみましたが、全く動かず。。。諦めて ifixit に部品(切ったケーブルとトラックパッド)と工具一式を注文しました。(切ってしまったケーブルはここでも紹介されている[IPD Flex Cable](https://jp.ifixit.com/Store/Mac/MacBook-12-Inch-Retina-Early-2016-2017-IPD-Flex-Cable/IF301-019?o=1)というやつ)

ifixit すごくて、注文したらすぐに空輸されて、1週間もしないうちに届きました(4/6深夜に発注して4/11の昼頃宅配ボックスに入ったようです)。

で、届いた部品と追加した工具で、例の[ifixit の手順](https://jp.ifixit.com/Guide/Retina+MacBook+2017+Trackpad+Assembly+Replacement/104470)を見ながら部品交換したところ、無事復活しました。本当に良かった。

やっちまったケーブル

<img src="https://lh3.googleusercontent.com/z4ZuQ3E1s4aiUEnVbBiY5MulT9tK355iO--WPHnv0Hc9LT1gldezLlg_pjguvX7esJwreNfyuNzDOwWAXbyEOKxvjqk7DJHHZL1PhsfNDfTxJafKAcY24WVwEdx50F3IFbA6RXdixU8DSUh1BY2SEdSVQ-MthtEiJmswVWuXrTTKC35wGC29MAujE2rqd4J40WM5sOAb4pB_tmjLXQlYX2RHLCUN6n3vAnitgt42wTXpjF9tPVsHU2xpb6NNF6VTviyw_ao5T3WUDR3auj0_DMS-F7yi8GBQk-OYv3wT02k_tfiC-Xvn-OXdquKH25K2LRpSFq1xhZ_Q40V-qb-7hAKcifcWiLTxlWrEUA_eq8kLczvyyMd3uisTdeO_-YWHLsr7AEKzd4KW3QG1Zn3lIBA5zkLJ6E9oHZGiWKHC-1_P9D99NiZihBy63p6V30wEIROjeHa_1CIsYV2I6dRg-69Nsdh_0FbVOUoUOWa8X5byWuL-DsxzneOmzmKYGRcLJpykPY0CU5cop_3orNrl-HNbcFGmdi2_ryeGQtar4WX4JOJ1TXAvwZR8I1ga_9fRZgstsXw3t8qHAfDdqoZw4LxMtBBe5hVSI7gT1QvUHA3Q05Oco2vO8FRoVwB4RQGKMWnZqDw8VnXZPvcMtVamv01KBcNRyRhDhNSrPAnnhMv2jUPVZTCq29nbNkBUVaXEfeQxoKOP42m7N1RxGxBLju-0=w1440-h720-no">

ビールを飲んだトラックパッド

<img src="https://lh3.googleusercontent.com/ZXPYYjTZl_3UHRFJxvKOXko7yiLyTEYmXd-xBAR4_1K3d9n3ePfczUF23cXMhTR90rD6q3vDTcKFbas6WER7GeNCpAnEsVLux43Ht1R8VxDeNOl-APkmFEowK7xNQ9pEgMPdHjqqtcqb_NPTompBjCLczAMeYH65pdGPD3-bRAmGED84s--gRdle5GMi_vSCevPF3w9BX4XviavQj1lokejiOAVMTYuOLgSJzzoqwsPdYl-gi6SyqpqyghNbyoOxCl3tV7xyj3SMvWDxHH4FzvsYBwiVwWOU5NEEMrx95Btkcfs2zrZ1v8fdeMuB708x-Dz4PdKmrkjWiqc08Xk2gp5XcxmZyhohCzMY2ToAuNjsilQePzGlZXHKu7V1eI9j0wVRtjRusQGx4DBa7ylt8s342RtswvXKXoy1X3C0vg6rnmwg7ICrl_rp6SXxkk9KaOqAmk0hRIhYJslB4U9s_9j01ApMguyi9G03QvyCp-7tljn88ccbxSIVBMOUvuPAI383FhlBxN_Ba4r87guNg5XFnWAhebHlBlGHTaQyrGIeX42R3spkmjsAsaN4vZwZPxqQQbBZwmGdh0urlzjsAnDHN7YjtCpEs4WHgdcytfUtMYKOYfeoRanUcpXaSo1yD-xCsEIvcqusi-WQaQFn45O7PB73sZbEFAWc0RECJ4lXp6c-vn3m_2OZm498pu0RmgSRRQl4MH9JYNyWcvFZ44U2=w1440-h720-no">

画像の真ん中あたり、ちょっと青っぽく見えると思います。(写真の光の加減なので、実際はもう少し黄色っぽい感じの色です)。ビールが付着してダメになっているのがわかると思います。(これでも一応掃除したあと)

いやはや、本当に治って良かった。
