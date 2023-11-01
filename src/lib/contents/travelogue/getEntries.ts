import { getCollection } from "astro:content";

import type { TravelogueEntry } from "./types";

import { CollectionsTravelogueEntry } from "@lib/schema/travelogue";
import { sortArrayByDate } from "@lib/utils";

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
export const getTravelogueEntries = async (
  tagListRef?: string[],
  options: FetchPostsOptions = {},
): Promise<TravelogueEntry[]> => {
  // ビルド時のみdraftがtrueのものを除く
  const allTravelogues = await getCollection("travelogue");
  // スキーマに従ったオブジェクトのリストにremarkで追加される情報を付与する
  const postEntries = await Promise.all(
    allTravelogues.map(async (post) => {
      const collectionsEntry = await CollectionsTravelogueEntry.create(post);
      return collectionsEntry.toEntryObject();
    }),
  );
  // 日付順にソート
  sortArrayByDate(postEntries);
  return postEntries;
};
