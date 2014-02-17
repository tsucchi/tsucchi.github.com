---
layout: post
category: perl
tags: perl ruby bash
title: bash のプロンプトに Perl や Ruby のバージョンを表示する
---
{% include JB/setup %}

## やりかた
下記のような関数を定義しておけばよい。PS1では`$(__perl_ps1)`とか`$(__ruby_ps1)`のようにして参照する。僕の場合は[こんな感じ](https://github.com/tsucchi/dotfiles/blob/master/.bashrc#L10-L51)になっている。僕は perlbrew と rbenv を使っているので、それしか対応させてないけど、rvm とか plenv に対応させるのもそんなに難しくないはず。(必要ないから僕はやらない)


```bash
__ruby_ps1 ()
{
  if [ -f `which rbenv` ] ; then
    rbenv_ruby_version=`rbenv version | sed -e 's/ .*//'`
    if [ "$rbenv_ruby_version" = "" ] ; then
      printf ""
    elif [ "$rbenv_ruby_version" = "system" ] ; then
      printf "[system-ruby]"
    else
      printf "[ruby-$rbenv_ruby_version]"
    fi
  else
    printf ""
  fi
}

__perl_ps1 ()
{
  if [ -f `which perlbrew` ] ; then
    perlbrew_perl_version=`perlbrew list | grep '*' | sed 's/\* //'`
    if [ "$perlbrew_perl_version" = "" ] ; then
      printf "[system-perl]"
    else
      printf "[$perlbrew_perl_version]"
    fi
  else
    printf ""
  fi
}
```

## 余談
職場の環境だとsystem perl を併用してたりするので、プロンプトに「perl-5.18」とか出せたら便利なんじゃないかなー、と思ってた。
zsh だと割と簡単っぽいってどっかで見た事ある気がするけど、僕は数年前にようやく tcsh を卒業したばかりなので再度の乗り換えとかしたくない。ましてやプロンプトだけのために乗り換えとか。。。

で、「perlbrew bash プロンプト」とか検索してもソレっぽい記事がなかなか出てこない。しばらく試行錯誤してみたり、git のリポジトリ出すやつ見たりしてみたけど、
良くわからない。仕方ないので、「rbenv bash プロンプト」で検索したら、下記の記事がヒット。「ちくしょう、これが噂の『Perlリスク』かよ」と思ったけど、Perl でもまったく
同じように書けば良い話なので、パクらせてもらった次第。

+ [bashでgitやrbenvの情報をプロンプトに表示する](http://samidarehetima.blog9.fc2.com/blog-entry-189.html)
+ [bashrc prompt git && rbenv](https://gist.github.com/kyanny/1668822)
