import type {
  BlogArticleSchemaType,
  FinalBlogCollectionEntry,
  FrontmatterByRemarkPlugin,
} from "@lib/schema";
import type { CollectionEntry } from "astro:content";

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
 * Collections APIで得られたブログ記事のリストからdraftフラグがついたものを除き,
 * 各ページの情報をまとめたリストを返す（ソートは行わない）.
 * オプションでタグによるフィルタリングができる.
 * @param posts `getCollection`で取得したデータ列
 * @param options
 */
const getBlogPostEntries = async (
  posts: CollectionEntry<"blog">[],
  options: FetchPostsOptions = {}
): Promise<FinalBlogCollectionEntry[]> => {
  // draftがtrueのものを除く
  const nonDraftPosts = posts.filter((post) => !post.data.draft);
  // タグがある場合はそれを含むもののみ取得し, 指定がない場合はなにもしない.
  const filteredPosts = nonDraftPosts.filter((post) =>
    options.tag ? post.data.tags.includes(options.tag) : true
  );
  // スキーマに従ったオブジェクトのリストにremarkで追加される情報を付与する
  const postEntries = await Promise.all(
    filteredPosts.map(async (post) => {
      const frontmatter = post.data as BlogArticleSchemaType &
        Partial<FrontmatterByRemarkPlugin>;
      // remarkによる処理を行うためにレンダーを行う
      const { remarkPluginFrontmatter } = await post.render();
      frontmatter.wordCount = remarkPluginFrontmatter.wordCount as number;
      // NOTE: ここが微妙に型安全ではないが, `wordCount`フィールドが追加された`post.data`になっている.
      post.data = frontmatter;
      return post as FinalBlogCollectionEntry;
    })
  );
  return postEntries;
};

/**
 * Collections APIで得られたブログ記事のリストからタグ一覧のSetを返す.
 * @param posts `getCollection`で取得したデータ列
 * @param includeDraft 作成中記事を含めるかどうか. trueならdraftがtrueの記事のタグも含める.
 */
const getAllTagSet = (
  posts: CollectionEntry<"blog">[],
  includeDraft: boolean = false
) => {
  const nonDraftPosts = posts.filter(
    (post) => includeDraft || !post.data.draft
  );
  // タグ一覧を取得
  const allTags = nonDraftPosts.reduce((prev, curr) => {
    return prev.concat(curr.data.tags);
  }, [] as string[]);
  return new Set(allTags);
};

export {
  getFilenameFromPath,
  dateText,
  thumbnailPath,
  getBlogPostEntries,
  getAllTagSet,
  POST_PER_PAGE,
};
