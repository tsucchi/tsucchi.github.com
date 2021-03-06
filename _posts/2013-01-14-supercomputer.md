---
layout: post
category: hpc
tags: スパコン
title: スパコンの話。あるいは、僕がちょっとだけ触れたスーパーコンピュータの世界
---
{% include JB/setup %}

[スパコン「京」に関する素朴な疑問](http://satoshi.blogs.com/life/2013/01/kei.html)とかいう、大変ひどい記事があったので、ちょっと昔の事思い出しながら書いてみようと思う。

まず、自分のスタンスを書いときますが、京については、「悪くは無いと思うけど、お金は高すぎだよな」と思ってます。

- [京速計算機とか長崎のアレとかに思うこと](http://d.hatena.ne.jp/tsucchi1022/20091128/1259416601)

その上で、素人(僕も素人に毛の生えた程度なので、対して変わらないけど)がろくすっぽ調査もしないで、適当な事書くのもまあ勝手といえば勝手だけど、記事書いたら100ブクマとか付くような人は、「もうちょい注意してよ」、って思う。

さて、まーいろいろひどいんだけど、特にひどいのはこの3点かな。

- 専用のスパコンに投資するより、GPGPUを搭載した汎用サーバーをクラウドに大量においてサービスとして提供し、ニーズに応じて台数を増やしていった方がはるかに安いし柔軟性があるのではないか？

- 京を使えば６時間で出来ると言っても、その時間を確保するのに６ヶ月かかるんだったらアマゾンからGPGPU付きのサーバーを１０００台借りて数日間走らせた方が手っ取り早くないか？

- 日本のIT業界の将来を考えれば、スパコンで１位を取ることよりも、世界市場でアマゾンのAWSとまっこうから戦えるサービスを提供できる日本企業が存在しないことを問題視すべきではないか？

まず、1点めですが、スパコンの計算って、モノにもよるかもしれないけど、基本的にクラウドサービスでできるもんじゃありません。たとえば、スイッチを複数台またぐだけで性能出ないことがある、とかそのくらいシビアな事もあります(そういうケース実際に見た)。クラウドサービスで、ネットワークのトポロジまでカスタマイズできれば大丈夫でしょうけど、それってもはやクラウドサービスじゃねえよな。

あと、GPGPUとか、アクセラレータの類を使う場合ですが、大抵それ用にコードを書き換えないと性能が出ないらしいです。アレ系は、普通の CPU と癖がかなり違うので、得意な処理と不得意な処理があるため、らしいです(または、そもそもアクセラレータに処理を振るために専用の SDK 使わなきゃだめだったり）。僕が生きている間くらいには、この辺意識しなくてもコンパイラが最適化してくれるようになるかもしれませんが、現状は無理らしいです。京は普通の並列計算機だから、わりとそのままプログラム使えるんじゃないかな。逆にアクセラレータ積んでるやつのほうが、シミュレーションの再利用とか難しいんじゃないかな、と思います。

2点め。スパコンの計算って、数日間走らせるようなものじゃありません。計算する時は、taskset とか numactl つかって、CPU をプロセスに張り付けて、メモリも目一杯つかって走らせたりします。サーバの状態が「CPU が 100% 張り付いて、メモリ使用率も 100% 」って、業務系や Web 系の人たち何て呼びます？そう、「障害」です。まあ実際は計算できてるから障害じゃないけど、HPC 以外のエンジニアであれば、避けなきゃいけないような使い方します。なので、数百台〜1000台とかで、そういう使い方すると、結構な確率で壊れたり、途中で失敗したりします。計算に数日かかるようなやつだと、完走率どのくらいかなー？何回走らせればできるかなー？怖いなー、と思います。数日走らなきゃ終わらせられない場合もあるでしょうけど、基本的には数時間で終わらせたいんじゃないかなー。

3点め。TOP500 の上位は大体、軍事系とかの国策でやっているものです。国として、米国や中国に勝たなくていいんなら、いいんじゃない？僕はダメだと思うけど。あと、AWS は今回 TOP500 の 102位なので、HPC用のやつ全力でそのくらいなのでしょう。普通に京とか TSUBAME とか貸してもらった方がいいんじゃないかな。

あと、長崎のアレは、前に記事かいたので、再掲しておこう。

- [長崎のアレについて](http://d.hatena.ne.jp/tsucchi1022/20091127/1259335066)

「安価」っていってるけど、これ多分 HW 代だけですので、そこのところ注意しないとね、という話。

と、まあこの世界から離れてずいぶん経つし、専門家でもないので、間違いもあるかもしれませんが、こんな感じで。

