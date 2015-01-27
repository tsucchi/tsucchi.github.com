O/R Mapper へのメソッドの追加について
==========

ORM へのメソッド追加
---
+ 大きく分けて以下のパターンがある

1. inflate/deflate
2. fetch_by_*
3. あるテーブルから派生する情報を引く
4. ちょっと難しいことをしたい

1. inflate/deflate
--
+ inflate
    + Row オブジェクトからデータを引いた際に、生の値ではなく、オブジェクトに変換する
        + 例) timescamp 型のカラムのデータを DateTime オブジェクトに変換
+ deflate
    + inflate の逆。オブジェクトを DB に投入可能な型に変換する
        + 例) DateTime オブジェクトを timestamp 型に変換
+ 参考) [Teng の inflate/deflate](http://perl-users.jp/articles/advent-calendar/2011/teng/11)

2. fetch_by_*
--
+ Rails の ActiveRecord(3系) だと勝手に生えてるメソッド(find_by_xxx / find_all_by_xxx)
    + 参考) [Rails3のfind系メソッドと注意のまとめ](http://techracho.bpsinc.jp/morimorihoge/2012_10_18/6260)
+ 主キー以外でデータを引く場合に使う

3. あるテーブルから派生する情報を引く
--
+ 親テーブルから子テーブルを引くとか
+ N+1問題に注意
    + 参考)[N+1問題 / Eager Loading とは](http://ruby-rails.hatenadiary.com/entry/20141108/1415418367)

4. ちょっと難しいことをしたい
--
+ 実績データから、何か点数を計算するみたいなやつとか
+ 複数のテーブルを使う場合はロジック層を作って、そこでやったほうがよさそう


まとめ
---
+ 以下のようなことをしたい場合は ORM にメソッドを生やすと良い(かも)

1. inflate/deflate
2. fetch_by_*
3. あるテーブルから派生する情報を引く
4. ちょっと難しいことをしたい

+ メソッドを生やした場合はテストを書きましょう

おしまい
===
