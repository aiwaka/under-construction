import { isHtmlElementNode, findTargetNodeRecursive } from "./lib";

/**
 * @param {Node} node
 * @param {NormalizedOptions} options
 */
function findFootnoteHeading(node, options) {
  /** @type {Node[]} */
  let footnoteHeadingNodes = [];
  findTargetNodeRecursive(
    node,
    footnoteHeadingNodes,
    (node) =>
      isHtmlElementNode(node) &&
      node.tagName === "h2" &&
      "id" in node.properties &&
      node.properties.id === "footnote-label"
  );
  return footnoteHeadingNodes;
}

export default function miniProcessor() {
  /**
   * @param {Node} root
   * @return {Node}
   */
  return function transformer(root) {
    // 脚注の見出しを見つけ, テキストを書き換える.
    const fnHeadingNodes = findFootnoteHeading(root, {});
    if (fnHeadingNodes.length) {
      const targetTextNode = fnHeadingNodes[0].children.find(
        (node) => node.type === "text" && node.value === "Footnotes"
      );
      targetTextNode.value = "脚注";
    }
  };
}
