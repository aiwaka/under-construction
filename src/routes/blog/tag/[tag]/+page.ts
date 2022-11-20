import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/tag/[tag]/$types.d";
import { ArticleAttribute } from "../../article";

export const load: PageLoad = async ({ params: { tag } }) => {
  // contentsフォルダのmdファイル一覧をモジュールとして取得する
  const mdModules = import.meta.glob("../../contents/*.md");

  const attributeList: ArticleAttribute[] = [];
  for (const modulePath in mdModules) {
    // パスからファイル名を取得
    const filename = modulePath.split("/").reverse()[0].split(".")[0];
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // に従い, ファイル名パターンや拡張子を含み, 相対パス指定を行う形式でimportする.
    const markdown = await import(`../../contents/${filename}.md`);
    const meta = markdown.metadata;
    if (!meta.tags.includes(tag)) {
      continue;
    }
    const newData = new ArticleAttribute(
      filename,
      meta.title,
      meta.thumbnail,
      new Date(meta.date),
      meta.tags
    );
    attributeList.push(newData);
  }

  return {
    tag,
    post: attributeList
  };
};
