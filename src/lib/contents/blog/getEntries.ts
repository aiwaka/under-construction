import type { CollectionEntry } from "astro:content";

import type {
  BlogArticleSchemaType,
  FinalBlogCollectionEntry,
  FrontmatterByRemarkPlugin,
} from "@lib/schema";

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
export const getBlogPostEntries = async (
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
