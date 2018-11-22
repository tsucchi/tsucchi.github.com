プロキシサーバを作って覚えるHTTP
---

[@tsucchi](http://twitter.com/tsucchi)


自己紹介
---
+ 土田　拓也(つちだ　たくや)
+ [@tsucchi](http://twitter.com/tsucchi) とか [blog(http://tsucchi.github.io/)](http://tsucchi.github.io/)とか
    + <img src="./icon.jpeg"> こんなかんじのアイコンです
    + `Perl` と `ミルキィホームズ`が好きです

+ [株式会社シャノン](http://shanon-tech.blogspot.jp/)というところで、エンジニアやってます
    + Perl とか SQL とか書いたり
	+ パフォーマンスとかセキュリティのこと考えたり
    + たまにスクラムっぽいことやってたり、そんな感じ

今回のテーマ
---
+ 「エンジニアとして何を考え、何をみて、どんな行動をしているか？」 又は、「エンジニア以外の立場から視たエンジニアについて」
+ で、今日のタイトル

プロキシサーバを作って覚えるHTTP
---

[@tsucchi](http://twitter.com/tsucchi)


今回のテーマ
---
+ すいません。あんまり関係なかったかも...

背景
---
+ 昨今のWebアプリケーションは、複数のサービスを組み合わせて動かしています
+ 一方で、サービスのドメインは単一だったりします
    + 顧客から見ると、ワンストップの方が安心感があるから(?)
	+ そもそもモノリシックだったものを管理性のためにマイクロサービス化してたりとか

例
---
+ /static 以下の画像, CSS, JSなどは CDN(CloudFrontとかAkamaiとかFastly etc)に
+ /aaa 以下は「サービスAに」
+ /bbb 以下は「サービスBに」

...みたいな

困っていること
---
+ 開発時に複数のサービスを立てたい
+ 本番と同じように、複数のサービスに振り分けるやつが欲しい

困っていること
---
+ 開発時に複数のサービスを立てたい
    + foreman(Ruby) とか Proclet(Perl)とか使えば可能
+ 本番と同じように、複数のサービスに振り分けるやつが欲しい
    + プロキシサーバを立てれば可能

プロキシサーバを立てれば可能
---


プロキシサーバを立てれば可能
---
+ そうなんだけど、割と面倒くさい
    + 最近は docker あるので、nginx か apache のイメージ配ればいいんだけど...
    	+ ので他のメンバーはそうしてもらっている
+ 僕は開発用のプロキシを分けたかった
    + 次回のメンテで実施する為の設定を試してたりする
	+ 設定を頻繁に変えてるので、開発環境の想定と齟齬が出て割と困る


そうだ、プロキシサーバを作ろう
---


今回のテーマ
---
+ 「エンジニアとして何を考え、何をみて、どんな行動をしているか？」 又は、「エンジニア以外の立場から視たエンジニアについて」

よかった。テーマっぽい話ができた(本当か？)
---

そうだ、プロキシサーバを作ろう
---
+ 実際にプロキシサーバを作ってみると、色々ハマりどころがあって、HTTP の理解が進みます

本質的な部分
---
+ https://gist.github.com/tsucchi/582f2b5eb0cea09236348b95d15e5e9e
+ このくらいの短いコードでだいたい動く
+ 基本的には
    + ブラウザからもらったパラメータで Furl を叩く
	+ 帰って来た結果をブラウザに返す

だけ

ハマりどころ1(リダイレクト)
---
+ https://gist.github.com/tsucchi/582f2b5eb0cea09236348b95d15e5e9e#file-reproxy-pl-L16
+ Furl などの HTTP クライアントは「いい感じに」リダイレクトを処理してくれる
+ 一方、プロキシサーバは勝手にリダイレクトされると困る
    + リダイレクト前にブラウザに渡している色々な情報が欠落して訳分からない動作になる
    + その辺を処理してあげてもいいかもだけど、リダイレクトをやめてブラウザにやらせる方が楽

ハマりどころ2(ヘッダ)
---
+ https://gist.github.com/tsucchi/582f2b5eb0cea09236348b95d15e5e9e#file-reproxy-pl-L22-L23
+ Cookie や Content-Length はちゃんと渡そう
+ 突然ログアウトしたり、クエリパラメータをうまく渡せなくて、訳分からない動作になります


ハマりどころ3(レスポンスの圧縮)
---
+ https://gist.github.com/tsucchi/582f2b5eb0cea09236348b95d15e5e9e#file-reproxy-pl-L27-L29
+ アプリが gzip 圧縮したレスポンスを返すことがある
    https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Encoding
+ gzip 圧縮は「なかったことにする」(or 圧縮しなおして返す)
    + Furl(などのHTTPクライアント)が自動で gzip 圧縮レスポンスをほどいてしまう為
+ そうしないとレスポンスの Content-Length 合わなくて訳分からない動作になります

ハマりどころ4(body)
---
+ https://gist.github.com/tsucchi/582f2b5eb0cea09236348b95d15e5e9e#file-reproxy-pl-L19
+ すいません。ごまかしました。ここに色々あります
    + https://gist.github.com/tsucchi/52fd6354f496da65212670fdfc013093
	+ ざっくりこのくらい

ハマりどころ4(body)
---

```perl
my $uri_for_body = URI->new();
$uri_for_body->query_form( $c->req->body_parameters );
(my $body = $uri_for_body->as_string) =~ s{\A\?}{};
return $body
```

+ とはいえ、POSTパラメータだけでしょ？
    + そうなんだけど、そうじゃない

ハマりどころ4(body)
---
+ ファイルアップロード
+ https://gist.github.com/tsucchi/52fd6354f496da65212670fdfc013093#file-create_body-pl-L10-L19
+ `$c->req->{_body}->upload `(Catalystの場合)に色々入っているので、これを使ってファイル名と実体を取り出します

ハマりどころ4(body)
---
+ multipart/form-data
+ https://gist.github.com/tsucchi/52fd6354f496da65212670fdfc013093#file-create_body-pl-L22-L33
+ https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Disposition
+ ブラウザはこの形式で投げている
    + シンプルな、「クエリパラメータをそのまま body に書いたやつ」は投げない
    + URLエンコードとか考えなくて良くなるので、こちらの方が楽なんだと思う

That's all?
---
+ この辺の対応を入れたら、ほぼそれっぽく動くようになった
+ 完璧かどうか、と言われると微妙

まとめ
---
+ プロキシサーバを作ってみました
+ シンプルだけど、微妙にハマりどころがある
    + ブラウザからもらった値をサーバに渡す
	+ サーバから返った値をブラウザに返す
	+ ...だけなんだけど、だけじゃない
+ 作ってみると、HTTP の知らなかったことが知れて結構楽しい
    + multipart/form-data のパラメータ渡しとか、知らなかった

おしまい
===

