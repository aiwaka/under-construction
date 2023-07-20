import { sortArrayByDate } from "@lib/utils";
import { getCollection, type CollectionEntry } from "astro:content";

import type { BlogPostEntry } from "./types";
import { CollectionsBlogPostEntry } from "@lib/schema/blog";

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
  tagListRef?: string[],
  options: FetchPostsOptions = {}
): Promise<BlogPostEntry[]> => {
  // ビルド時のみdraftがtrueのものを除く
  const allBlogPosts = await getCollection("blog", (post) => {
    const isNotDraft = import.meta.env.DEV || !post.data.draft;
    const tagFiltered = options.tag
      ? post.data.tags.includes(options.tag)
      : true;
    return isNotDraft && tagFiltered;
  });
  // console.log(allBlogPosts[0]);
  // スキーマに従ったオブジェクトのリストにremarkで追加される情報を付与する
  const postEntries = await Promise.all(
    allBlogPosts.map(async (post) => {
      const collectionsEntry = await CollectionsBlogPostEntry.create(post);
      const blogEntry = collectionsEntry.toEntryObject();
      return blogEntry;
    })
    // allBlogPosts.map(async (post) => {
    //   const frontmatter: BlogArticleSchemaType & {
    //     wordCount?: number;
    //   } = post.data;
    //   // remarkによる処理を行うためにレンダーを行う
    //   const { remarkPluginFrontmatter } = await post.render();
    //   frontmatter.wordCount = remarkPluginFrontmatter.wordCount as number;
    //   // NOTE: ここが微妙に型安全ではないが, `wordCount`フィールドが追加された`post.data`になっている.
    //   post.data = frontmatter;
    //   return post as FinalBlogCollectionEntry;
    // })
  );
  // 日付順にソート
  sortArrayByDate(postEntries);
  // タグを集め, 一覧をセットする.
  const tagSet = new Set<string>();
  postEntries.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  tagListRef?.splice(0, 0, ...tagSet);
  return postEntries;
};
