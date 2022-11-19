import { ArticleAttribute } from "./article";
import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/$types.d";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api/posts");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articleData: { meta: Record<string, any>; path: string }[] = await response.json();

  const attributeList: ArticleAttribute[] = articleData.map(({ meta }) => {
    return new ArticleAttribute(
      meta.id,
      meta.title,
      meta.thumbnail,
      new Date(meta.date),
      meta.tags
    );
  });
  // for (const modulePath in mdModules) {
  //   // パスからファイル名を取得
  //   const filename = modulePath.split("/").reverse()[0].split(".")[0];
  //   // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
  //   // に従い, ファイル名パターンや拡張子を含み, 相対パス指定を行う形式でimportする.
  //   const markdown = await import(`./contents/${filename}.md`);
  //   const meta = markdown.metadata;
  //   const newData = new ArticleAttribute(
  //     filename,
  //     meta.title,
  //     meta.thumbnail,
  //     new Date(meta.date),
  //     meta.tags
  //   );
  //   attributeList.push(newData);
  // }

  return {
    post: attributeList
  };
};
