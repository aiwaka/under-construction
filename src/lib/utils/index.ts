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
  return `${import.meta.env.BASE_URL}blog/thumb/${filename}`;
};

/**
 * 1ページあたりの記事数
 */
const POST_PER_PAGE = 9 as const satisfies number;

interface FetchPostsOptions {
  tag?: string;
}
/**
 * MDXオブジェクトのリストからdraftフラグがついたものを除き, 各ページの情報をまとめて日付でソートしたリストを返す. オプションでタグによるフィルタリングができる.
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
      frontmatter.updateDate ? new Date(frontmatter.updateDate) : null,
      frontmatter.tags
    );
  });
  // ソート
  attrList.sort((a, b) => (a.date < b.date ? 1 : -1));
  return attrList;
};

/**
 * MDXオブジェクトのリストからタグ一覧のSetを返す.
 * @param posts Astro.globで取得したMDXオブジェクトのリスト.
 * @param includeDraft 作成中記事を含めるかどうか. trueならdraftがtrueの記事のタグも含める.
 */
const getAllTagSet = (
  posts: MDXInstance<Record<string, any>>[],
  includeDraft: boolean = false
) => {
  const nonDraftPosts = posts.filter(
    (post) => includeDraft || !post.frontmatter.draft
  );
  // タグ一覧を取得
  const allTags = nonDraftPosts.reduce((prev, curr) => {
    return prev.concat(curr.frontmatter.tags);
  }, [] as string[]);
  return new Set(allTags);
};

export {
  getFilenameFromPath,
  dateText,
  thumbnailPath,
  getAttrList,
  getAllTagSet,
  POST_PER_PAGE,
};
