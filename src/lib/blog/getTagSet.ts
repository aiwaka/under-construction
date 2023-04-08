import type { CollectionEntry } from "astro:content";

/**
 * Collections APIで得られたブログ記事のリストからタグ一覧のSetを返す.
 * @param posts `getCollection`で取得したデータ列
 * @param includeDraft 作成中記事を含めるかどうか. trueならdraftがtrueの記事のタグも含める.
 */
export const getAllTagSet = (
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
