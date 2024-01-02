import { getCollection } from "astro:content";

import type { BlogPostEntry } from "./types";

import { CollectionsBlogPostEntry } from "@lib/schema/blog";
import { sortArrayByDateTime } from "@lib/utils";

interface FetchPostsOptions {
  tag?: string;
}

/**
 * Collections APIで得られたブログ記事のリストからdraftフラグがついたものを除き,
 * 各ページの情報をまとめたリストを返す.
 * この時点でupdatedAtによるソートを行う.
 * オプションでタグによるフィルタリングができる.
 * @param tagListRef この引数に配列を渡すとタグ一覧がセットされる
 * @param options
 */
export const getBlogPostEntries = async (
  tagListRef?: string[],
  options: FetchPostsOptions = {},
): Promise<BlogPostEntry[]> => {
  // ビルド時のみdraftがtrueのものを除く
  const allBlogPosts = await getCollection("blog", (post) => {
    const isNotDraft = import.meta.env.DEV || !post.data.draft;
    const tagFiltered = options.tag
      ? post.data.tags.includes(options.tag)
      : true;
    return isNotDraft && tagFiltered;
  });
  // スキーマに従ったオブジェクトのリストにremarkで追加される情報を付与する
  const postEntries = await Promise.all(
    allBlogPosts.map(async (post) => {
      const collectionsEntry = await CollectionsBlogPostEntry.create(post);
      const blogEntry = collectionsEntry.toEntryObject();
      return blogEntry;
    }),
  );
  // 日付順にソート
  sortArrayByDateTime(postEntries);
  // タグを集め, 一覧をセットする.
  const tagSet = new Set<string>();
  postEntries.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  tagListRef?.splice(0, 0, ...tagSet);
  return postEntries;
};
