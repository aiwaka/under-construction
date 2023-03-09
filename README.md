# Under Construction

## 概要

私のプロフィールサイトのリポジトリです.
[GitHub Pages](https://littleikawa.github.io/under-construction/)で公開しています.

~~SvelteKitで書き,~~ Svelteを用いてAstroで生成し, GitHub Actionsで自動でビルドを公開しています.

## ブランチについて

ブランチ構造について備忘録的に記します.

- `main`：メインブランチ. ここにpushされるとビルドが始まる.
- ~~`gh-pages`：ホスティング用ブランチ. ビルド結果がここに吐き出され, ホスティングされる.~~ GitHub Actionsを用いるようになったため使用しない.
- `develop`：主に`main`にマージする前のステージのように使う.
- `post`：記事投稿やポートフォリオ改訂用ブランチ. ここではコンテンツ記述・markdownと画像を増やす以外の処理は行わない. `main`に直接マージする.
- `style`：サイトのデザインを修正するためのブランチ.
- `old-svelte/...`：以前のSvelteKitを用いたコードを保存しているブランチ.

`main`が更新された場合, 他のブランチは`main`をマージして変更を取り込む.
