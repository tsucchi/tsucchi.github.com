---
layout: post
category: sql
tags: SQL DB
title: 更新で頑張るか、参照で頑張るか
---
{% include JB/setup %}

SQL の話。

たとえば、あるテーブルに status1 と status2 があったとして、両方が満たされると status_complete になる、
みたいな処理があるとします。

こういうときは

{% highlight sql %}

SELECT IF( status1 = '1' AND status2 = '1', '1', '0' ) AS status_complete
  FROM SOME_TABLE
  ...

{% endhighlight %}

みたいな処理を書く人が多いみたいです。僕はこの処理はあんまり好きじゃなくて、status_complete をテーブルのカラムにして、
更新側で

{% highlight sql %}

UPDATE SOME_TABLE SET 
    status_complete =  IF( status1 = '1' AND status2 = '1', '1', '0' )
  WHERE ...

{% endhighlight %}

とする方が良いのではないかなー、と思っています。(SELECT 時は普通に status_complete を出す)

参照側で頑張る、最初のやり方だと、たとえば「status_complete なやつの一覧を出す」とかなった際に、
サブクエリなり、HAVING なりが必要になって、遅い SQL や複雑な SQL になりがちです。インデックスも
張れませんし。

更新側で頑張る場合だと、たとえば「status1 をキャンセルする」みたいな処理があった場合に、
「status_complete も合わせて落とす」みたいな処理を必ず入れなければならないので、状態遷移
が難しい場合は大変かもしれません。正規化も崩れるので、それを嫌がる人もいるかもね。

何故参照ではなく、更新で頑張る方が良い、と考えているかですが、一般的に参照の方が更新よりも多いからです。
それから、アプリの作りにもよるのでしょうが、参照のほうが(JOIN とかサブクエリとか使うので) SQL が難しいことが多いです。
まあでも一番大きな理由は、インデックスが張れないってことかなー。

みんなはどうしてるんだろう？
