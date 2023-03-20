import { toString } from "mdast-util-to-string";

/**
 * コンテンツをプレーンテキストに変換して文字数をカウントするだけのプラグイン
 */
export default function remarkWordCountPlugin() {
  return function (tree, file) {
    const textOnPage = toString(tree);
    file.data.astro.frontmatter.wordCount = textOnPage.length;
  };
}
