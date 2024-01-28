import type { IsEntrySchema, ContentsImage } from "@lib/types";

/**
 * ブログなどの記事で使う画像のリストを保存する.
 */
export interface ImagesInArticle extends IsEntrySchema {
  /** 記事タイトル */
  title: string;
  /** サムネイルは存在しなくてもよいとする */
  thumbnail: ContentsImage | null;
  /** 一意な名前と画像情報を紐付ける形（辞書形式）で保存する */
  images: Record<string, ContentsImage>;
}
