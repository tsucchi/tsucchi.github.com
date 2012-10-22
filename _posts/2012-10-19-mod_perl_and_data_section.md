---
layout: post
category: mod_perl
tags: mod_perl perl
title: mod_perl 環境でも Data::Section::Simple 使えるかも
---
{% include JB/setup %}

※まだ結論出きっていないので、間違いあるかもです。おかしなところあれば、ご指摘いただければ幸いです。

一般に、Apache::Registry/PerlRun などの、「速い CGI 環境」としての mod\_perl 環境(うー、この言い回しめんどくさいけど、使わざるを得ない)
では、\_\_DATA\_\_ ファイルハンドルが使えません。

なので、Data::Section::Simple とかの、\_\_DATA\_\_ を読むモジュールも使えません。

と、いうことを[YAPC のトーク](http://yapcasia.org/2012/talk/show/863251ce-d870-11e1-924a-0d4e6aeab6a4)で、ちょっと触れたら、

[@mod_perl_info](https://twitter.com/mod_perl_info/status/253426068847984640)
    あ、どうすればRegistry/PerlRun環境下で__DATA__が使えるかといった話は @tsucchi さんの先日のYAPCでのスライド http://www.slideshare.net/tsucchi/perlsql/32 … から触発されました。 https://twitter.com/mod_perl_info/status/253424577147973634 … 

とか、

[@aloelight](https://twitter.com/aloelight/status/253526345777311744)
    .@tsucchi @xtetsuji ModPerl::Registryしか試してませんが，DATAを読み込めるようにしました．お暇な時にお試しください > p5-apache2-data-section-simple GitHub http://bit.ly/SF5WYg  

とか、そんな話が出てきまして、僕のユースケースだと、[あろえさんのやつ](https://github.com/ysasaki/p5-apache2-data-section-simple)で大体いけそうなだけど、今度はテストコードで困るなぁ、とか思ったりしました。

で、じゃあ $ENV{MOD_PERL}とか見て、素の Data::Section::Simple つかうやつと、あろえさんの Apache2::Data::Section::Simple を切り替える物体とか作るかなー、とか思って、コードとかドキュメントとか読んでたら、Data::Section::Simple って、OO のインターフェース持ってて、パッケージ名を渡せるみたいなんですよね。

Registry/PerlRun 環境って、パッケージとか、ファイルパスとかがいつもと違うから、色々おかしくなるんだけど、Data::Section::Simple のコードをみる限り、OO I/F を使えば、その辺の問題がクリアできそうに思えました。

で、僕が使いたいポイントは、ORM のモデルクラス(正確にいうと、自作 ORM の Kappa のテーブルクラス)なので、基本的にパッケージ名は ref $self すれば取れます。(main パッケージじゃないので、\_\_PACKAGE\_\_ で取っても大丈夫そうだけど、ちょっと自信ない)。

あとは、ここで取ったパッケージ名を渡したときに、\_\_DATA\_\_ が読めてくれれば良いので、↓みたいな簡単なモデルと、テストプログラムを書いて、
軽く実験した感じだと、ちゃんと動いた。

{% highlight perl %}
package MilkyHolms::DB::Table::detective;
use parent qw(MilkyHolms::DB::Table);
use strict;
use warnings;
use Data::Section::Simple;

sub test_data_section_simple {
    my ($self) = @_;
    my $pkg = ref $self;
    my $ds = Data::Section::Simple->new($pkg);
    my $value = $ds->get_data_section('test_sql');
    print $value;
}

1;

__DATA__

@@ test_sql
SELECT *
  FROM detective
  WHERE id = :id
;
{% endhighlight %}

一応何度か F5 連打しても動いていたので、多分キャッシュされた状態でもちゃんと動くと思う。週明けにがっつり実験してみようと思っています。

## 結論
まだ自信ないけど、「mod\_perl 環境では、\_\_DATA\_\_が使えない」というのはかなり不正確な言い方で、「ある種の制限があるよ」くらいが妥当な気がしてきました。

- 少なくとも、mod\_perl の制限ではなく、Registry/PerlRun の制限らしい
- パッケージ名がうまく解決できていないとうまくいかないけど、そこをクリアすれば何とかなるっぽい

ってな感じの結論なんですが、やっぱり自信ないので、識者の方フォローしていただけると嬉しいです
