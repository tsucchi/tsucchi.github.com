私の作ったもの
==========

<address>Takuya Tsuchida (tsucchi)</address>


作ったものについて
---

基本的に、バックエンドの処理で使うものばかりなので、紹介スライドを書きました。すべて Perl のモジュールです。  
<br>

+ Test::Mock::ExternalCommand
+ SQL::Executor
+ Kappa(ORM)


メンテナンスしているもの
---

私が作ったわけではないが、引き継いでメンテナンスしているもの。Pure Perl の MySQL データベースドライバ関係です。
<br>
<br>

+ Net::MySQL
+ DBD::mysqlPP


Test::Mock::ExternalCommand
---

コマンドの出力や終了ステータスを置き換えるモジュール。Nagios のプラグインを書く際のテストなどに使っています。

    use Test::Mock::ExternalCommand;
    my $m = Test::Mock::ExternalCommand->new();
    $m->set_command( 'ls', "file1\nfile2\n", 0);
    # use 'ls' in your test.


SQL::Executor(1 of 2)
---

基本的な CRUD 操作と難しい SQL を投げやすくするための名前つきプレースホルダをサポートしています

    my $ex = SQL::Executor->new($dbh);
    my @rows = $ex->select('employee', { id => 123 });
    $ex->insert('employee', {
	    id   => 124,
		name => 'Smith'
    });
    $ex->delete('employee', { id => 124 });


SQL::Executor(2 of 2)
---
名前つきプレースホルダの例

    $sql = 'SELECT id, name 
	          FROM employee 
	          WHERE value2 = :arg1';
    @rows= $ex->select_named($sql, {
	    arg1 => 'aaa'
    });


Kappa
---

私が作成した ORM。SQL::Executor を基本に、Row オブジェクトを返したり、テーブル毎に機能拡張できるようにしています。

    use Kappa;
    my $db = Kappa->new($dbh);
    my $row_obj = $db->select('SOME_TABLE', { id => 123 });
    print $row_obj->id, $row_obj->value;


開発の背景
---
+ テーブルが多く、スキーマ定義をすべて書けなかった
+ LEFT JOIN を多用する長い SQL が多い
+ 処理自体は SQL を投げて終わり、の簡単なものがほとんど


Kappa の特長と設計思想
---

+ 簡単な CRUD 操作は簡単に実行したい
+ 複雑な SQL も投げられるようにしたい
    + 複雑な SQL を投げても Row オブジェクトが欲しい
+ テーブル単位にモデルクラスを拡張したい 
    + モデルクラスやスキーマクラスが無くても動くようにしたい


機能
---

ORM としての基本機能以外で、特徴的なものとして下記がある
<br>

+ ガードつきの Row オブジェクトの有効/無効切り替え
+ テーブル毎の拡張と拡張時の省略記法
+ SQL のデータセクションへの配置
 

ガードつきの Row オブジェクトの有効/無効切り替え
---
スコープ単位で Row オブジェクトを生成するかしないかを切り替えることができる。

    my $db = Kappa->new($dbh);
    { #スコープ定義
        my $guard = $db->row_object_enable(0);
        my $row = $db->select('employee', { id => 1 });
        # ここでは Row オブジェクトが無効
        # => { id => 1, name => '山田　太郎' }
    } 
    # スコープを抜けると戻る(Row オブジェクトが返る)


テーブル毎の拡張と拡張時の省略記法
---
テーブル毎にクラスを作って、メソッドを追加できます。クラス内では、テーブル名を省略できます。

    package MyProj::DB::Table::employee;
    use parent qw(Kappa);
    sub sections_name_from_id {
        my($self, $id) = @_;
        my $row = $self->select_row({ id => $id });
        return $row->section_name;
    }
    1;


SQL のデータセクションへの配置(1 of 2)
---
SQL をデータセクション(ファイルの末尾)に置いて、それを呼び出すことができます。

    package MyProj::DB::Table::employee;
    use parent qw(Kappa);
    1;
    __DATA__
    @@ section_name_from_id
    SELECT * FROM employee WHERE id = :id; 

SQL のデータセクションへの配置(2 of 2)
---
呼び出し側では、下記のようにします。また、省略時はメソッドと同名の SQL を呼び出します。

    $self->sql('section_name_from_id')

省略記法を用意した理由
---
「省略できるように」書いていくと、ある程度綺麗なクラス分割ができるようにしたかったため。テーブル名が入らないようにメソッドを書いていくと、自然にクラス毎に責任分割されるようになる。

以上です
===


