AngularJS を触ってみた
==========
社内勉強会資料@2014/01/27

<address>土田　拓也</address>


注意
---
+ まだがっつり使ったわけではないので、ハードな突っ込みが入ってもお答えできません...


AngularJS
---
+ Google を中心に開発されている JavaScript のフレームワーク
    + いわゆる「クライアントサイド MVC」(Angular の開発者は「MVW」と言っている)
+ MVW -- Model, View, Whatever
    + MVCを語りだすと宗教戦争になりがち
	+ 「モデルと、ビューと、あとは何でもいいじゃん(Whatever)」というノリらしい
+ JS というより、`テンプレート + そこからコールバックされる一連の仕組み`、という感じ
    + なのでやはり「フレームワーク」

テンプレート(1)
---
+ JavaScript 式、変数の参照

```
{{ javascript の式 }}
```

例)

```javascript
{{ 1 + 2 }}
{{ phone.name }}
```

テンプレート(2)
---
+ HTML タグに ng- で始まる独自の属性を使うといろいろな事が出来る
+ 繰り返しは ng-repeat
+ 下記の例だと、phones という配列から phone という値を取り出す。(いわゆる foreach)

```html
<li ng-repeat="phone in phones">
    {{phone.name}}
    <p>{{phone.snippet}}</p>
</li>
```


テンプレート(3)
---
+ TTだと下記のような感じ
+ Angular のテンプレートだと、HTMLの構造がテンプレートのディレクティブで崩されない

```html
※ AngularJS ではなく、TemplateToolkit です!
[% FOREACH phone = phones %]
    <li>
	    phone.name
	    <p>phone.snippet</p>
	</li>
[% END %]
```

フィルタ
---
+ フィルタは、テンプレートから | で呼び出せる
+ 独自のフィルタも使用可能

```html
<dd>{{phone.connectivity.gps | checkmark}}</dd>
```

コールバック
---
+ クリック時の動作を ng-click で指定できる
+ 下記の例だと、画像をクリックした際に、setImage がコールバックされる

```html
<img ng-src="{{img}}" ng-click="setImage(img)">
```



データ
---
+ サーバから受け取るデータは、JSON を使うと簡単


テスト
---
+ 特に決まりは無く、JavaScript の Testing Framework を普通に使う
    + Jasmine がよく使われているらしい


アプリケーションのアーキテクチャ
---
+ データが JSON で受け取るのが便利なので、サーバサイドはシンプルな JSON-API にしておくのが良さそう
+ クライアントは API を叩くものを各種用意する(...という事が AngularJS を使っているとやりやすそう)
    + AngularJS を使った HTML ベース
	+ Android/iOS アプリ
	+ etc.
	

情報リソース
---
+ 公式のチュートリアルが分かりやすい。有志による日本語訳バージョンもある
    + (公式) http://angularjs.org/
	+ (チュートリアル) http://docs.angularjs.org/tutorial
	+ (同日本語訳) https://github.com/angularjs-jp/angular.js/wiki
+ 2013年のアドベントカレンダー
    + http://qiita.com/advent-calendar/2013/angularjs-startup

おしまい
===
