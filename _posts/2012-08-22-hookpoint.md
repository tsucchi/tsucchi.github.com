---
layout: post
category: programming
tags: プログラミング perl
title: フックポイントとかの話
---
{% include JB/setup %}

フレームワークやそれに類するものを作っているとして、こんなのがあるとします。

{% highlight perl %}
sub run {
    my($self, $executor, %param) = @_;
	my @result = $executor->execute(%param);
	return @result;
}
{% endhighlight %}

で、本処理の前後に何かを挟みたくなって、フックポイントをつけたりします。

{% highlight perl %}
sub run {
    my($self, $executor, %param) = @_;
	$executor->pre_execute(\%param); #事前に引数を加工する処理とか
	my @result = $executor->execute(%param);
	$executor->post_execute(\@result, %param); #あとで結果を加工する処理とか
	return @result;
}

# ...
package SomeExecutorBase;
sub pre_execute {};#デフォルトは何もしない
sub post_execute {};#デフォルトは何もしない

{% endhighlight %}

なんでこんなのが欲しくなるか、というと、主に継承してる場合とかに、本処理は同じなんだけど、ちょっと前提が違うとか
大抵そんな感じのことです。

ただ、最近は、「フックポイントって分かりにくくね？？」とか思ったりしていて、こういう処理を書くことが多いです。

{% highlight perl %}
sub run {
    my($self, $executor, %param) = @_;
	my @result = $executor->execute(%param);# こっちは最初のまま
	return @result;
}

# ...
package SomeExecutorBase;
sub execute {
    my($self, %param) = @_;
	return $self->default_execute(%param);
}
sub default_execute {
    my($self, %param) = @_;
	#...デフォルトの本処理がここに入る
	return @result;
}
{% endhighlight %}

こんな感じにしておくと、継承した際には、

{% highlight perl %}
package SomeExecutorChild;
sub execute {
    my($self, %param) = @_;
	my %new_param = $self->_nanrakano_kakou(%param);
	return $self->default_execute(%new_param);
}
{% endhighlight %}

こんな感じで、実装を入れ替えたければ入れ替えればいいし、加工してからデフォルトの処理を呼ぶとかそういうことができます。

ただし、本処理がこの例みたいに1パターンしかない場合はあまりメリットはありません。

僕が普段作ってるのはある種の Web-API なので、こういう処理が沢山でてきます。
まあ基本は CRUD +αくらいなのですが、それでも 1つのモデルに対して最低4つの実装があるので、十分面倒くさいです。
で、こういうときに継承関係作りつつモデルクラスを作ったりしていると、こっちの方が取扱いしやすいなー、と思っています。

たとえば、CREATE + DELETE の replace という API を作りたい場合も

{% highlight perl %}
package SomeExecutorBase;
sub replace {
    my($self, %param) = @_;
	return $self->default_replace(%param);
}

sub default_replace {
    my($self, %param) = @_;
	my %delete_param = $self->_delete_param(%param);
	$self->default_delete(%delete_param);
	return $self->default_create(%param);
}

{% endhighlight %}

みたいな感じにしとけば良いです。

で、これの欠点ですが、この replace の例みたいなのは、実はあんまり良くないやり方でして、ある API からほかの default\_\* を呼ぶと、
その default\_hogehoge が、ほかの default\_fuga を使ってたりして、意図せず無限再帰呼び出しになってしまうことがあります。ですので、
default\_\* 内でほかの default_系メソッドを呼ぶ際は細心の注意を払う必要があります。(まあ一回テストすれば見つかりますが。とはいえ
無限再帰呼び出しは発生するとビックリするからねー。)

まあこういうのの実装方法としては、ほかには

* Hook::LexWrap みたいな、処理の前後をフックするモジュールを使う
* Moose とかのクラスビルダーのそういう機能を使う
* 最初の例に書いたようなフックポイントをつける

みたいな感じで、いろいろやり方はあると思うので、用途や環境に応じて使い分けるといいんじゃないかなー、と思います。
