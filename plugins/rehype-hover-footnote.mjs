import visit from "unist-util-visit";
import is from "unist-util-is";

export default function attacher() {
  return transformer;

  /**
   * @param {import("unist").Node} tree
   */
  function transformer(tree) {
    visit(tree, visitor);

    function visitor(node) {
      if (is(node, { tagName: "a" })) {
        let props = node.properties || (node.properties = {});

        props.target = "_blank";
        props.rel = "noopener noreferrer";
      }
    }
  }
}
