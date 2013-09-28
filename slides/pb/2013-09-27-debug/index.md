Data::Dumper で print デバッグ
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段はお仕事で Perl とか SQL とか書いてます
    + 最近は SQL あんま書いてなくて、Perl ばっかりかも
    + 今日はミルキィホームズネタはありません

まずはおわび
---
+ 体系立てて、まとめていい感じにしたかったのですが、無理でした。ごめんなさい


で、今回のテーマについて
---
+ バグですよね

バグ...つらいですよね
---
+ 何が辛いって、やっぱり再現させたり原因調査したりとか、そのへん
+ 1日以上頑張って調査して...原因分かったら修正はたった数行とか...

分かってしまえば簡単な事も、分かるまでは辛い
---
+ バグに限らない話かも、ですが
+ 基本的には、頑張ってデバッグするしかない

そんなバグに悩むプログラマの友...それが...
---

Data::Dumper
---

基本の使い方
---
```perl
use Data::Dumper;
...
warn Dumper($nanka_fukuzatsuna_data);
```

```
VAR1 = {
          'key2' => [
                      'value1',
                      'value2'
                    ],
          'key1' => 'some_value'
        };
```

デバッグ用途だとこんな感じ
---
```perl
use Data::Dumper; warn Dumper($nanka_fukuzatsuna_data);
```

+ めんどくさいので1行に押し込んで書いたりします
+ エディタのマクロなどに登録している人も多いですね

長いメソッドのデバッグ
---
```perl
sub nagai_method {
...
   use Data::Dumper; warn Dumper($nanka_fukuzatsuna_data);
...
   use Data::Dumper; warn Dumper($nanka_fukuzatsuna_data);
...
}
```
+ ...わりと辛い

2分探索
---
```perl
sub nagai_method {
...
   use Data::Dumper; warn "1: " . Dumper($nanka_fukuzatsuna_data);
...
   use Data::Dumper; warn "2: " . Dumper($nanka_fukuzatsuna_data);
...
   use Data::Dumper; warn "3: " . Dumper($nanka_fukuzatsuna_data);
...
   use Data::Dumper; warn "4: " . Dumper($nanka_fukuzatsuna_data);
...

```

+ こんな感じで打ちまくっても良いのですが...
+ 沢山打つのつらいので、2分探索します
  + 1と2の間におかしいところがあれば、その間のデバッグプリントを増やし...
    + 3と4は要らないので消す...
	+ で、だんだん範囲を狭めていく

ログに書く場合
---
```perl
use Data::Dumper; write_log Dumper("data_dayo: $nanka_fukuzatsuna_data");
```

+ ログに絶対出ない文字列を付与する(例: data_dayo: )
+ あとで grep とかで検索するときに便利

問題の関数がどこから呼ばれてるか分からない
---
```perl
use Data::Dumper; warn Dumper("dokodaro: " . Dumper([caller()]) );
```
+ 他人が書いたコードとか
+ 仕組みをあんまり理解してないフレームワーク使っている場合とか
+ caller を使う
+ その他スタックトレース出す系のモジュールを使っても良い(Carp::cluck とか)

サブルーチンリファレンス使ってる場合
---
+ Beginners なんで、あんま無いと思うけど...
+ Data::Dumper::Concise を使う
+ モジュール入れられない縛りプレイしている場合は、こんな感じ

```perl
use Data::Dumper;
{
    local $Data::Dumper::Terse = 1;
    local $Data::Dumper::Indent = 1;
    local $Data::Dumper::Useqq = 1;
    local $Data::Dumper::Deparse = 1;
    local $Data::Dumper::Quotekeys = 0;
    local $Data::Dumper::Sortkeys = 1;
    warn Dumper($var);
}
```


print デバッグする際の前提
---
+ git とか svn は使ってますよね？
+ warn "hoge_dayo" とか残ってたら格好わるいです
+ 直したらデバッグプリントは削除するか、適切なログに置き換えましょう


まとめ
---
+ デバッグ辛いけど、特効薬も銀の弾丸は無いので、地道に頑張りましょう

<img src="./mondaikaiketsu.jpg" width="50%" height="50%">

※ 問☆題☆解☆決☆(画像はイメージです)


おしまい
===

