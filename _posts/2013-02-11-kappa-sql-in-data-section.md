---
layout: post
category: kappa
tags: perl db orm kappa
title: Kappa の飼い方(Kappa という ORM の話) その9 SQL をテーブルクラスに置く
---
{% include JB/setup %}

お久しぶりなこの企画。

僕が作っている[Kappa](https://github.com/tsucchi/p5-Kappa) という ORM の話。

わりと最近いれた変更の話です。

{% include kappa_template/mokuji %}

## まえおき

昨年の YAPC Asia 2012 で、「SQL がコード中にあるとキモいから、SQL::Library とか Data::Section::Simple とか使って、
外出しするといいですよ」。んで、「同一ファイルにあった方が見やすいから、Data::Section::Simple がいいかなー、でもウチ mod\_perl 環境
なんで、\_\_DATA\_\_ 読めないんだよねー」みたいな話をしたら、いくつかフィードバックがあって、いろいろ頑張ってみたらできた！

ってのが、多分この話。(↓)

- [mod_perl 環境でも Data::Section::Simple 使えるかも](/mod_perl/2012/10/19/mod_perl_and_data_section)

んで、しばらく実環境で試したけど、安定してるし便利なので、アプリ側じゃなくて ORM に入れたほうが幸せかな、と思って本体に入れました。

## つかいかた
ドキュメントにも書いてますが、テーブルクラスで、sql\_from\_data_section というメソッドが使えます。こんな感じ。

{% highlight perl %}
package MilkyHolmes::DB::Table::detective;
use parent qw(MilkyHolmes::DB::Table);
use strict;
use warnings;

sub toys_name_from_detective_id {
    my($self, $id) = @_;
	my $sql = $self->sql_from_data_section('toys_name_from_detective_id');
	my $row = $self->select_row_named($sql, { 
	    id => $id
    });
	return '' if ( !defined $row );
	return $row->toys_name;
}

1;

__DATA__

@@ toys_name_from_detective_id
SELECT *
  FROM detective
  WHERE id = :id
; 
{% endhighlight %}

まあこの例の SQL だと外出しする意味ない(どころか可読性悪化してるん)ですけど、いくつか JOIN するような長い SQL なんかは外出ししたほうがいいよね、と思います。

SQL 名は省略可能で、省略するとメソッド名と同名の SQL を取ってきます。なので、この例だと

{% highlight perl %}
sub toys_name_from_detective_id {
    #...
	my $sql = $self->sql_from_data_section();
    #...
}
{% endhighlight %}

と書いても同じです。あと、「メソッド名長いなー、sql() でも良くね？」と思ってて、自分のアプリではそういうメソッドエイリアス使ってるので、そのうち本家にも反映するかも、です。

## おわりに
みんなは SQL どこに置いてるんですかね？

僕は、「SQL は処理の本質とはだいぶ違う」と考えているので、基本的に外出ししたい派(インデントが崩れるのがキモい、ってのもある)、なのですが、逆に「処理の近くに置かなきゃ何してるか分からねーだろJK」って考えもありうるかな、と思ってます。「いやオレの使ってる ORM 賢いから SQL なんて書かないし」ってのもありうるか。

外出しする場合も、「別ファイルに置きたい場合」、「置きたくない場合」、「長い SQL だけメソッドにしとけばよくね？」、などなど色々考えがありうるかなー、と思います。不思議な事に、DBIx 的なやつとか、ORM でその辺考慮したインターフェース持ってるやつ無いんですよね。誰かがベストプラクティスを提供してくれても良さそうなものなのに。

というわけで、うーんやっぱみんなどうやってるんだろ？ って話でした。
