/**
 * @typedef {Object} NormalizedOptions - このプラグインのオプション
 * @property {boolean=} dummy - ダミーフィールド
 *
 */

export class NormalizedOptions {
  dummy;

  constructor(options = {}) {
    this.dummy = true;
  }
}

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
 * ノードが脚注テキストかどうか判定（タイプガード）
 * `remark-gfm`の脚注で自動で挿入されるデータを元に判断している.
 * @param {Node} node
 */
function isFootnoteTextNode(node) {
  return (
    isHtmlElementNode(node) &&
    node.tagName === "li" &&
    node.properties.id.startsWith("user-content-fn-")
  );
}

/**
 * ノードが脚注ラベルかどうか判定（タイプガード）
 * `remark-gfm`の脚注で自動で挿入されるデータを元に判断している.
 * @param {Node} node
 */
function isFootnoteLabelNode(node) {
  return (
    isHtmlElementNode(node) &&
    node.tagName === "a" &&
    "dataFootnoteRef" in node.properties &&
    node.properties.id.startsWith("user-content-fnref-")
  );
}

/**
 * @param {Node} node
 * @param {NormalizedOptions} options
 */
function findFootnoteText(node, options) {
  /** @type {Node[]} */
  let footnoteTextNodes = [];
  findTargetNodeRecursive(node, footnoteTextNodes, options, isFootnoteTextNode);
  return footnoteTextNodes;
}
/**
 * @param {Node} node
 * @param {NormalizedOptions} options
 */
function findFootnoteLabel(node, options) {
  /** @type {Node[]} */
  let footnoteLabelNodes = [];
  findTargetNodeRecursive(
    node,
    footnoteLabelNodes,
    options,
    isFootnoteLabelNode
  );
  return footnoteLabelNodes;
}

/**
 * HAST木を探索して渡された配列に目的の要素を入れるのを再帰的に行う.
 * @param {Node} node
 * @param {Node[]} targetNodes
 * @param {NormalizedOptions} options
 * @param {TypeGuard} typeGuard
 */
function findTargetNodeRecursive(node, targetNodes, options, typeGuard) {
  if (typeGuard(node)) {
    targetNodes.push(node);
  }

  if (node.children) {
    /** @type {Parent} */
    let parent = node;
    for (let child of parent.children) {
      findTargetNodeRecursive(child, targetNodes, options, typeGuard);
    }
  }
}

/**
 * 脚注のノード列を元に, idをキーとするオブジェクトを作成する.
 * @param {Node[]} texts - 脚注テキストノード列
 */
function createTextDict(texts) {
  const footnoteTextDict = {};
  for (const textNode of texts) {
    for (const child of textNode.children) {
      if (isHtmlElementNode(child) && child.tagName === "p") {
        const targetText = child.children
          .find((node) => node.type === "text")
          .value.trim();
        footnoteTextDict[textNode.properties.id] = targetText;
      }
    }
  }
  return footnoteTextDict;
}

function insertTitleToLabel(texts, labels) {
  const textDict = createTextDict(texts);
  for (const labelAnchorNode of labels) {
    // 脚注へのリンクを持つノードにテキストを埋め込む.
    const labelHref = labelAnchorNode.properties.href.substring(1);
    labelAnchorNode.properties["title"] = textDict[labelHref];
  }
}

/**
 * remark-gfmの脚注機能で生成された脚注のテキストに対応するラベルのtitle属性を作成する.
 * @param {Options} [opts]
 * @return {Transformer}
 */
export function insertTitlePlugin(opts) {
  let options = new NormalizedOptions(opts);

  /**
   * @param {Node} root
   * @return {Node}
   */
  return function transformer(root) {
    // user-content-fn-* のidを持つ<li>要素のidをリストアップする.
    let footnoteTexts = findFootnoteText(root, options);

    // user-content-fnref-* のidを持つ<a>要素をリストアップする.
    let footnoteLabels = findFootnoteLabel(root, options);

    // ラベルリンクのtitle属性に対応するテキストを入れる
    insertTitleToLabel(footnoteTexts, footnoteLabels);
  };
}

export default insertTitlePlugin;
