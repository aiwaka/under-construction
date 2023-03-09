import { ArticleAttribute } from "@lib/articles";
import type { AstroGlobal, MDXInstance } from "astro";

const getFilenameFromPath = (path: string): string | null => {
  const matched = path.match(".+/(.+?).[a-z]+([?#;].*)?$");
  return matched ? matched[1] : null;
};

/**
 * 日付をこのサイトで用いる書式に変換する
 */
const dateText = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * サムネイルファイル名を参照すべきパスに変換する
 * @param filename 拡張子付きファイル名
 */
const thumbnailPath = (filename: string): string => {
  return `/blog/thumb/${filename}`;
};

/**
 * 1ページあたりの記事数
 */
const POST_PER_PAGE = 1 as const satisfies number;

interface FetchPostsOptions {
  tag?: string;
}
/**
 * mdxが保存されている箇所へのパスを指定し, draftフラグがついたものを除き, 各ページの情報をまとめたリストを返す. オプションでタグによるフィルタリングができる.
 * @param posts Astro.globで取得したMDXオブジェクトのリスト.
 * @param options
 */
const getAttrList = (
  posts: MDXInstance<Record<string, any>>[],
  options: FetchPostsOptions = {}
) => {
  // draftがtrueのものを除く
  const nonDraftPosts = posts.filter((post) => !post.frontmatter.draft);
  // タグがある場合はそれを含むもののみ取得し, 指定がない場合はなにもしない.
  const filteredPosts = nonDraftPosts.filter((post) =>
    options.tag ? post.frontmatter.tags.includes(options.tag) : true
  );
  // mdxオブジェクトのpostリストを自分のデータ形式に変換する
  const attrList = filteredPosts.map((post) => {
    const frontmatter = post.frontmatter as Record<string, any> &
      ArticleAttribute;
    const filename = getFilenameFromPath(post.file) ?? "";
    return new ArticleAttribute(
      filename,
      frontmatter.title,
      frontmatter.description,
      frontmatter.thumbnail,
      new Date(frontmatter.date),
      frontmatter.tags
    );
  });
  // ソート
  attrList.sort((a, b) => (a.date < b.date ? 1 : -1));
  return attrList;
};

export {
  getFilenameFromPath,
  dateText,
  thumbnailPath,
  getAttrList,
  POST_PER_PAGE,
};
