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

interface TOCOptions {}

const createTOCTree = (headings: MarkdownHeading[], options?: TOCOptions) => {
  const rootHeading: MarkdownHeading = {
    depth: 1,
    slug: "root",
    text: "#root",
  };
  const root = new TOCHeadingNode(rootHeading, null);
  let currentNode = root;
  for (const heading of headings) {
    if (heading.depth > currentNode.heading.depth) {
      const nextNode = new TOCHeadingNode(heading, currentNode);
      currentNode.children.push(nextNode);
      currentNode = nextNode;
    } else {
      if (heading.depth < currentNode.heading.depth) {
        // 番号が一致するようになるまで深さを戻す
        while (currentNode.heading.depth !== heading.depth) {
          if (currentNode.parent === null) {
            throw new Error("the depth of tree is incorrect");
          }
          currentNode = currentNode.parent;
        }
        // This is a lower heading number, so we need to go up to a previous level
        // for (let i = levels.length - 2; i >= 0; i--) {
        //   let level = levels[i];
        //   if (level.headingNumber === headingNumber) {
        //     // We found the previous level that matches this heading
        //     levels = levels.slice(0, i + 1);
        //     currentLevel = level;
        //     break;
        //   }
        // }
        // If headings are in an incorrect order, then we may need to adjust the headingNumber
        // currentLevel.headingNumber = Math.min(
        //   currentLevel.headingNumber,
        //   headingNumber
        // );
      }

      // This heading is the same level as the previous heading,
      // so just add another <li> to the same <ol>
      currentNode.parent?.children.push();
      // let listItem = createListItem(heading, options);
      // currentLevel.list.children.push(listItem);
    }
  }
  // rootのchildrenが空だったときの処理
  return root;
};

/**
 * Creates a `<nav>` and/or `<ol>` element containing the table of contents.
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

const createListBlockElement = (root: TOCHeadingNode): string => {
  if (!root) return "";
  const innerHtml = createListElement(root);
  return !innerHtml ? "" : `<ol>${innerHtml}</ol>`;
};
const createListElement = (root: TOCHeadingNode): string => {
  if (!root) return "";
  // TODO: 自分しか触らないサーバー上での実行だが, 一応内容をサニタイズする処理を入れた方がいい.
  return root.children
    .map(
      (n) =>
        `<li>${createAnchorElement(n.heading)}${createListBlockElement(n)}</li>`
    )
    .join("");
};
const createAnchorElement = (heading: MarkdownHeading): string => {
  const { depth, slug, text } = heading;
  const displayText = text.substring(1);
  return `<a class="toc-item toc-link-h${depth}" href="#${slug}">${displayText}</a>`;
};

export { createTOCElement };
