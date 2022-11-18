import { ArticleAttribute } from "./article";
import type { PageLoad } from "./../../../.svelte-kit/types/src/routes/blog/$types.d";
// const retrieveMetaFromMarkdown = (fileName) => {
//   const path = fileName.split(".")[0]; // 拡張子.mdを取り除く
//   return {
//     path: path,
//     meta: frontMatter(fs.readFileSync(fileName))
//   };
// };

export const load: PageLoad = async () => {
  // contentsフォルダのmdファイル一覧をモジュールとして取得する
  const mdModules = import.meta.glob("./contents/*.md");

  const attributeList: ArticleAttribute[] = [];
  for (const modulePath in mdModules) {
    // パスからファイル名を取得
    const filename = modulePath.split("/").reverse()[0].split(".")[0];
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // に従い, ファイル名パターンや拡張子を含み, 相対パス指定を行う形式でimportする.
    const markdown = await import(`./contents/${filename}.md`);
    const attributes = markdown.metadata;
    const newData = new ArticleAttribute(
      filename,
      attributes.title,
      attributes.thumbnail,
      new Date(),
      attributes.tags
    );
    attributeList.push(newData);
    // const post = {
    //   meta: markdown.attributes,
    //   body: markdown.html
    // };
    // console.log(post);
  }
  // console.log(attributeList);
  // const posts = fs.readdirSync("contens/blog").map(retrieveMetaFromMarkdown);

  return {
    post: attributeList
  };
};
