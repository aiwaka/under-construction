---
title: LaTeXを記事中で使えるようになった
description: ""
thumbnail: latex.png
date: 2022-11-23
tags:
  - Node
  - プログラミング
  - LaTeX
---

タイトルの通りです.

ちょっと前言及したところで調べてみたところできそうだったので$\LaTeX$を書けるようにしました.

めちゃくちゃ簡単で, 便利な世の中だと思いました（小並感）.

せっかくなのでやったことだけ書いておこうと思います.

## 使用したライブラリ

とりあえず, 「rehype」と「Remark」というライブラリ（規格？）を使いました.

### KaTeX

ウェブ上でLaTeXを書きたいときにはMathJaxが有名と思いますが, おそらく後発のKaTeXというものもあります.
Qiitaとかでも使われているらしいです.
高速, 見た目の質, 依存性のなさ等で優れているようです.

### remark

[Remark](https://github.com/remarkjs/remark)はMarkdownプロセッサであり, [unified](https://github.com/unifiedjs/unified)というプロジェクトの一部という位置づけのようです.

この辺のプロジェクトの全体像はOSSとしては今までに触れたことがないくらい混沌としていたのであまり詳しく調べたわけではないです.
~~（フロントエンド関連のヤバい側面のように見える）~~

unifiedはテキストと抽象構文木を関連付けて操作するライブラリ全般を扱うようです.
その中で, Markdownの文法に対応したものがremarkだと理解しました.

関連ライブラリが様々にあるようで, 処理自体に影響を与えるもの, 構造要素に色々味付けができるもの, 他の構造化文書に変換するものなど多岐にわたります.

### rehype

これもunifiedプロジェクトの一部です.

こちらはHTML処理を担当するようで, 思想はremarkと似ています.
remarkと組み合わせて美味しいことができそうな感じがします.
こちらも大量に関連ライブラリがあります.

### mdsvex

このブログはどうしてもmarkdownで書きたかったので, Svelte用にmarkdownを処理してくれるライブラリを用いています.
それが`mdsvex`です（読み方がわからん. React用のMDXというやつが由来らしいです）.
これをSvelteのConfigファイルでプリプロセッサとして書いてあげると, ビルド時にマークダウンファイルをよしなにSvelteの要素として扱ってくれます.

この`mdsvex`, 上記の`remark`や`rehype`をさらに中で走らせることができます.
つまり, markdownを読みこんだときにremarkで処理したり, 処理したhtmlをrehypeで処理したりできます.
好きな機能を選んで使えることになります.

### 結局使ったもの

というわけでその中で使ったのが以下です.

- [`remark-math`](https://github.com/remarkjs/remark-math)
- [`rehype-katex-svelte`](https://github.com/kwshi/rehype-katex-svelte)

`remark-math`は, markdown中の$\LaTeX$構文をunifiedで扱える構造に置き換えるものです（だと思っています）.
`rehype-katex-svelte`は, [`rehype-katex`](https://github.com/remarkjs/remark-math/tree/HEAD/packages/rehype-katex)というプラグインをSvelteで扱えるようにチューニングされたものです（公式のrehypeプラグインとはなっていないようです）.
`rehype-katex`は適当なunified構造を`KaTeX`を用いてマークアップするものです.

ここまでで, できそうな気がしてきました.

## Svelteにおける設定

あとはほとんど用意してもらった構造を使うだけです.

`svelte.config.js`を以下のようにセットします.

```js
import { mdsvex } from "mdsvex";
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from "remark-math";

const config = {
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: [".md"],
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatexSvelte]
    })
  ],
  ...
}
```

のようにします.
これで, markdown中に\$\\LaTeX\$と書けば$\LaTeX$となります.

ディスプレイ数式も,

```latex
$$
\\frac{1}{c^2}\ddot{u}(\\bm{x}, t)
- u_{,ii}(\\bm{x},t) = 0,
\\quad \\bm{x}\\in D, t>0
$$
```

でOKです.

$$
\frac{1}{c^2}\ddot{u}(\bm{x}, t) - u_{,ii}(\bm{x},t) = 0, \quad \bm{x}\in D, t>0
$$
