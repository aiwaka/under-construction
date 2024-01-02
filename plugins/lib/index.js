/**
 * ノードがHTML要素かどうかの判定
 * @param {Node} node
 */
function isHtmlElementNode(node) {
  return (
    typeof node === "object" &&
    node.type === "element" &&
    typeof node.tagName === "string" &&
    "properties" in node &&
    typeof node.properties === "object"
  );
}

/**
 * HAST木を探索して渡された配列に目的の要素を入れるのを再帰的に行う.
 * @param {Node} node
 * @param {Node[]} targetNodes
 * @param {TypeGuard} typeGuard
 */
function findTargetNodeRecursive(node, targetNodes, typeGuard) {
  if (typeGuard(node)) {
    targetNodes.push(node);
  }

  if (node.children) {
    let parent = node;
    for (let child of parent.children) {
      findTargetNodeRecursive(child, targetNodes, typeGuard);
    }
  }
}

export { isHtmlElementNode, findTargetNodeRecursive };
