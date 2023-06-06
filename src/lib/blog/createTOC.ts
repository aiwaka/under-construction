import type { MarkdownHeading } from "astro";

class TOCHeadingNode {
  heading: MarkdownHeading;
  parent: TOCHeadingNode | null;
  children: TOCHeadingNode[];

  constructor(heading: MarkdownHeading, parent: TOCHeadingNode | null) {
    this.heading = heading;
    this.parent = parent;
    this.children = [];
  }
}

// h1を目次に入れるのは禁止する（ルートの深さを1とするため）.
type HeadingTagDepths = 2 | 3 | 4 | 5 | 6;
interface TOCOptions {
  target?: HeadingTagDepths[];
}

const createTOCTree = (headings: MarkdownHeading[], options?: TOCOptions) => {
  // 適当なルートノードを作成しこれを起点とする.
  const rootHeading: MarkdownHeading = {
    depth: 1,
    slug: "root",
    text: "#root",
  };
  const root = new TOCHeadingNode(rootHeading, null);
  // 注目するノード変数を作ってこれを中心に木をつくる.
  let currentNode = root;
  for (const heading of headings) {
    // Array.includes()を使うと型エラーになるのでevery()を使う
    if (options?.target && options.target.every((v) => v !== heading.depth)) {
      continue;
    }
    if (heading.depth > currentNode.heading.depth) {
      // より深い見出しなら注目対象を移す.
      const nextNode = new TOCHeadingNode(heading, currentNode);
      currentNode.children.push(nextNode);
      currentNode = nextNode;
    } else {
      if (heading.depth < currentNode.heading.depth) {
        // 浅い場合, 番号が一致するまで深さを戻す
        while (currentNode.heading.depth !== heading.depth) {
          if (currentNode.parent === null) {
            throw new Error("the depth of tree is incorrect");
          }
          currentNode = currentNode.parent;
        }
      }
      // このifは常にtrueになるはず. TSのエラー回避の明文化をしている.
      if (currentNode.parent) {
        // 兄弟ノードを作成する. 注目対象も移動する.
        const nextNode = new TOCHeadingNode(heading, currentNode.parent);
        currentNode.parent.children.push(nextNode);
        currentNode = nextNode;
      }
    }
  }
  // NOTE: rootのchildrenが空だったときの処理をしてもよさそう
  return root;
};

/**
 * 目次として<nav>要素を作成しHTML文字列で返す.
 */
const createTOCElement = (
  headings: MarkdownHeading[],
  options?: TOCOptions
) => {
  const root = createTOCTree(headings, options);
  const list = createListBlockElement(root);
  const classes = ["toc"];
  return `<nav class="${classes.join(" ")}">${list}</nav>`;
};

/**
 * 適当な見出しノードを<ol>要素としたHTML文字列を返す.
 * `createListElement`を介して再帰的に呼び出される.
 * @param root 部分木のルート
 */
const createListBlockElement = (root: TOCHeadingNode): string => {
  if (!root) return "";
  const innerHtml = createListElement(root);
  const classes = ["toc-level", `toc-level-${root.heading.depth}`];
  return !innerHtml ? "" : `<ol class="${classes.join(" ")}">${innerHtml}</ol>`;
};
/**
 * 適当な見出しノードの子を<li>要素としたHTML文字列を返す.
 * `createListBlockElement`を介して再帰的に呼び出される.
 * @param root 部分木のルート
 */
const createListElement = (root: TOCHeadingNode): string => {
  if (!root) return "";
  // TODO: 自分しか触らないサーバー上での実行だが, 一応内容をサニタイズする処理を入れた方がいい.
  return root.children
    .map((n) => {
      const classes = ["toc-item", `toc-item-h${n.heading.depth}`];
      return `<li class="${classes.join(" ")}">
        ${createAnchorElement(n.heading)}${createListBlockElement(n)}</li>`;
    })
    .join("");
};
/**
 * 見出しに対応する<a>要素を作成する.
 */
const createAnchorElement = (heading: MarkdownHeading): string => {
  const { depth, slug, text } = heading;
  // textには必ず`#`がついているので除去する.
  const displayText = text.substring(1);
  const classes = ["toc-link", `toc-link-h${depth}`];
  return `<a class="${classes.join(" ")}" href="#${slug}">${displayText}</a>`;
};

export { createTOCElement };
