---
layout: post
category: perl
tags: perl test
title: Mock::Quick というモジュールがいい感じ
---
{% include JB/setup %}
偶然見つけたのですが、[Mock::Quick](http://search.cpan.org/dist/Mock-Quick/) というモジュールがいい感じです。

Synopsis みると結構色々できそうな感じなのですが、とりあえず[Test::Mock::Guard](http://search.cpan.org/dist/Test-Mock-Guard/)の
代わりとして使っています。こんな感じ(↓)

<script src="https://gist.github.com/tsucchi/a96b508cc8a501270fa1.js"></script>

で、「Test::Mock::Guard で良くね？」と言われると、まあそうなのですが、あのコードかなり難解で、何かミスったり、万一バグ踏んだ時に割と辛いっていうのと、
[Class::Load](http://search.cpan.org/dist/Class-Load/)に依存していて、これの依存が結構多いので既存の環境で使いたくなった際にちょっと躊躇してしまう、
ってのがあります。Mock::Quick はその点、依存がとても少なくていい感じです。

qclass 以外にも便利っぽい機能が色々あるので、もう少し色々試してみたいと思います。
