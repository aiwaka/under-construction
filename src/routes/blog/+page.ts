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
    const markdown = await import(modulePath);
    const attributes = markdown.attributes;
    const newData = new ArticleAttribute(
      // パスからファイル名を取得
      modulePath.split("/").reverse()[0].split(".")[0],
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
