---
layout: post
category: perl
tags: perl db test
title: Test::Stub::DBI ってのを書いてみた
---
{% include JB/setup %}

多分、[これ](http://d.hatena.ne.jp/tsucchi1022/20110628/1309265238)の続きみたいな話。。。なのかな。

生SQLを使うロジックをテストする場合、データを突っ込む仕組みを作って SQL を実際に投げるか、DBD::Mock あたりを使うのが普通なのかな、
と思います。

DBD::Mock は凄く良く出来てて、エラー条件なんかも含めて、ほとんどの DBI の振る舞いを偽装できて便利なのですが、割と長大で設定がめんどい
感じするし(使うときは毎回ググってる)、最初に挙げた記事みたいに微妙に機能が足りなかったりして困る事もしばしばあります。

なので、じゃあ Test::Mock::Guard とか、そのへんのスタブ使って偽装作ろうとすると、それはそれで面倒だったりします。「$dbh ってなんだっけ？」(正解は DBI::db)とか、
「$sth って(ry」(DBI::st)とか、「'...is not a DBI handle (has no magic)' って何だよー。意味分かんないよー」(なにも考えずに DBI::st あたりをスタブするとこの warning が出る)とか、そのへんが。

と、いうわけで作ってみた。

- [Test::Stub::DBI - github](https://github.com/tsucchi/p5-Test-Stub-DBI)

使い方はとりあえずテストコード丸写しで。

```perl
use Test::Stub::DBI;
use Test::More;

my $count = 0;
my $guard = stub_dbi(
    sth => {
        fetchrow_arrayref => sub { 
            $count++;
            return [0] if ( $count == 1 );
            return [1] if ( $count == 2 );
            return;
        }
    },
);
my $dbh = Test::Stub::DBI->connect();
my $sth = $dbh->prepare('SELECT * FROM SOME_TABLE');
$sth->execute();
is_deeply( $sth->fetchrow_arrayref, [0] );
is_deeply( $sth->fetchrow_arrayref, [1] );
is( $sth->fetchrow_arrayref, undef );
```

まあこの例だと全く意味ない感じですが、prepare とか execute とか fetchrow_arrayref がテスト対象のプロダクトコード側に書いてあると脳内補完してください。

この例では、$sth の fetchrow_arrayref を置き換えていますが、sth, dbh, dbi にそれぞれ偽装する内容の subref を渡すとそいつに置き換わるようになってます。

今後の展開としては、SQL 毎に処理を振り分けたりしたい場合があると思うので、「sth(Test::Stub::DBI::st)で SQL を取れるようにしないとなー」、ってのと、「もうちょい
ドキュメント書いた方がいいかなー」、とか思ってますが、今のところ「github 止まりモジュール」にしとくつもりなので、これ以上やる気が出るかどうかは謎。

まあご意見とか頂ければ積極的に取り入れていくつもりですので、使ってみたい人、要望がある人は僕に突っ込みをいれると少し幸せになれるかもしれません。
