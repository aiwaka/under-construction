import { ArticleAttributeJson } from "$lib/articles";

export interface FetchOptions {
  tag?: string;
}

/**
 * contentsディレクトリのmarkdownファイルを読み取って情報の一覧を返す.
 * そのままjsonに変換できるように日付は文字列で保持したデータ形式とする.
 * @param options 取得オプションを含むオブジェクト.
 */
export const fetchMarkdownArticles = async (options: FetchOptions = {}) => {
  // contentsフォルダのmdファイル一覧をモジュールとして取得する
  const mdModules = import.meta.glob("../../routes/blog/contents/*.md");

  const attributeList: ArticleAttributeJson[] = [];
  for (const modulePath in mdModules) {
    // パスからファイル名を取得
    const filename = modulePath.split("/").reverse()[0].split(".")[0];
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // に従い, ファイル名パターンや拡張子を含み, 相対パス指定を行う形式でimportする.
    const markdown = await import(`../../routes/blog/contents/${filename}.md`);
    const meta = markdown.metadata;
    if (options.tag && !meta.tags.includes(options.tag)) {
      continue;
    }
    const newData = new ArticleAttributeJson(
      filename,
      meta.title,
      meta.description,
      meta.thumbnail,
      meta.date,
      meta.tags
    );
    attributeList.push(newData);
  }

  return attributeList;
};
