データベースのテストのお話::Lite
==========

<address>[@tsucchi](http://twitter.com/tsucchi)</address>


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
+ 普段は Perl とか SQL とか書いてます
+ <img src="./icon.jpeg"> こんなかんじのアイコンです
+ `Perl` と `ミルキィホームズ`が好きです
+ 最近「艦これ」にはまってます。E-4クリアできないよー...


で、今回のテーマについて
---
+ 何でしたっけ？

まあいいや
---

特にあんまりネタ無いので、既出のやつから
---


最近のお仕事の話
---
+ わりとレガシーな Perl アプリケーションのメンテしてます
+ テスト一応あるんだけど、少ない
+ テストの仕組み自体も割と辛い感じだった

で、やったこと
---
+ Test::Mock::Guard の劣化コピーみたいの作った
    + Class::Load の依存がきついので、本物はインストールできず
+ O/R Mapper のモックを簡単に作れる物体を作った
+ DBI をスタブするやつを作った <- コレについて説明します

それ、DBD::Mock でよくね？
---

それ、DBD::Mock でよくね？
---
+ [DBD::Mock](http://search.cpan.org/~dichi/DBD-Mock-1.45/lib/DBD/Mock.pm)に慣れてるなら、それでいいと思います
+ 僕は慣れてません。毎回ぐぐってる
+ 割と何でも出来るんだけど、結構めんどくさい(と個人的に思います)
+ あと、毎度の事ながら、レガシー環境で縛りプレイしてるので、安易にモジュール追加なんてできない

じゃあ、Test::Mock::Guard(とか)で、DBI の振る舞い偽装すればよくね？
---

じゃあ、Test::Mock::Guard(とか)で、DBI の振る舞い偽装すればよくね？
---
+ それはそれで、めんどくさい
+ $dbh ってなんだっけ？みたいな
    + 正解は DBI::db。普段はあんま見ることは無い
+ あと、$sth とかを偽装しようとすると結構めんどい
    + 「...is not a DBI handle (has no magic)」とかいう訳の分からないエラーが出て泣きそうになる

つーわけで作った
---
+ 会社版のやつは、会社のアプリに密結合してるので、そうじゃない版をご紹介
+ [Test::Stub::DBI - github](https://github.com/tsucchi/p5-Test-Stub-DBI)

使い方(1) $sth をなんとかするやつ
---
```perl
use Test::Stub::DBI;
my $count = 0;
my $guard = stub_dbi(
    sth => {
        fetchrow_arrayref => sub { 
            $count++;
            return [0] if ( $count == 1 );
            return;
        }
    },
);
my $dbh = Test::Stub::DBI->connect();
my $sth = $dbh->prepare('SELECT * FROM SOME_TABLE');
$sth->execute();
is_deeply( $sth->fetchrow_arrayref, [0] );
is( $sth->fetchrow_arrayref, undef );

```

使い方(2) $dbh をなんとかするやつ
---
```perl
my $count = 0;
my $guard = stub_dbi(
    dbh => { prepare => sub { die "prepare failed" }, },
);
my $dbh = Test::Stub::DBI->connect();
try {
    my $sth = $dbh->prepare('SELECT * FROM SOME_TABLE');
    fail 'exception expected';
} catch {
    like( $_, qr/^prepare failed/ );
};
```

使い方(3) DBI をなんとかするやつ
---
```perl
my $count = 0;
my $guard = stub_dbi(
    dbi => {
        connect => sub { die "connect failed" },
    },
);
try {
    my $dbh = DBI->connect('dbd::dummy');
    fail 'exception expected';
} catch {
    like( $_, qr/^connect failed/ );
};
```

注意
---
+ 手抜き実装なので、色々おかしいかも
+ GitHub止まりモジュールです
+ SQL毎に処理を変えるとか、今のところはできません
    + そのうち実装したい


おしまい
===
