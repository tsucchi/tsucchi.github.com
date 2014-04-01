---
layout: post
category: perl
tags: perl db orm Otogiri
title: 最近の Reply-Otogiri 環境の話
---
{% include JB/setup %}

おはよーおはよー。今日はエイプリルフールですが、これは真面目な(?)話です。

[REPLでORMを使えるようにすると、めっちゃ便利だ、という話](http://tsucchi.github.io/perl/2014/03/14/repl-and-otogiri)の続き。

とりあえず僕がほしかった環境が大体できたので、公開してみようと思う。

やりたかった事は

+ Reply の設定ファイルをコピペするのが良く無いので、1つにしたい(プラグインを追加するたびに全部書き換えとか嫌)
+ せっかく Reply::Plugin::Otogiri あるし使ってみるか

の2点です。

## Reply::Plugin::Otogiri について
前回紹介した、

+ [｢Reply::Plugin::Otogiri｣を書いた](http://masteries.papix.net/entry/2014-03-22-reply-plugin-otogiri.html)

ですが、R::P::Otogiri はバージョンアップしてちょっと中身が変わったので内容が古くなっています。SYNOPSIS とか見ると分かるのですが、
新しいバージョンでは、設定ファイルを指定できてそこに DB の接続情報書いたりできます。んで、環境変数でどの設定を使うかを切り替える感じになっています。

### .replyrc_otogiri
Reply の設定ファイルです。こんな感じ。DBの設定を書くファイルと、ロードしたいプラグインを指定します。[TableInfo](https://github.com/tsucchi/p5-Otogiri-Plugin-TableInfo)
ってのは、最近僕が書いてるプラグインで、MySQL で言う所の、`SHOW TABLES` や `SHOW CREATE TABLE`相当の処理をやってくれる物体です。

```toml
[Otogiri]
config=.otogiri_connect_info.pl
plugins = DeleteCascade,TableInfo
```

### .bashrc (alias)
alias をきってサービス毎にコマンドを作っています。こんな感じ。あたらしい Reply::Plugin::Otogiri は環境変数 `PERL_REPLY_PLUGIN_OTOGIRI`
でどのDB接続を使うかを指定できるので、ここで切り替えます。

```
alias reply-service1="env PERL_REPLY_PLUGIN_OTOGIRI=service1 reply --cfg $HOME/.replyrc_otogiri"
alias reply-service2="env PERL_REPLY_PLUGIN_OTOGIRI=service2 reply --cfg $HOME/.replyrc_otogiri"
```

### .otogiri_connect_info.pl
.replyrc_otogiri で指定した DB 毎の設定ファイルです。

```perl
+{
    service1 => {
        connect_info => [
            'dbi:Pg:dbname=service1;host=db.example.com;port=5432',
            'tsucchi',
            'passdayo',
            { AutoCommit => 1, RaiseError => 1,PrintError => 0, pg_enable_utf8 => 1,},
        ]
    },
},
```

### 使い方
サービス毎に alias でコマンドを作ってあるので、普通にそれを呼ぶだけです。

```
% reply-service1
1> Select('detective', { id => 1 });
$res[1] = {
    id => 1,
    name => 'Sherlock Shellingford',
    age => 15,
    toys => 'psychokinesis'
	birthday => '3/31',
}
```

こんな感じで、<del>シャーロック・シェリンフォードちゃん(昨日は誕生日だったね。おめでとう)の情報がゲットできて、</del> Otogiri のメソッドが呼べて、最高便利です。
新しい Reply::Plugin::Otogiri では、Otogiri のメソッドは大文字で始まるようになっています。($db とかの変数を経由せずに直接呼べます)。
また、タブを押すと Otogiri のメソッド名に対して補完が効きます。便利。



