import type { CollectionsBlogPostEntry } from "@lib/schema/blog";
import type { IsEntrySchema, ContentsImage } from "@lib/types";
import type { MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/dist/runtime/server";
import type { BlogPostEntry } from "@lib/contents/blog";
import type { TravelRouteEntry } from "@lib/other/station-collections";

/**
 * 旅行記のオブジェクト
 */
export interface TravelogueEntry extends IsEntrySchema {
  /** 旅行記のタイトル */
  title: string;
  /** 説明文 */
  description: string;
  /** 開始日 */
  startDate: Date;
  /** 終了日 */
  endDate: Date;
  /** コンテンツで, HTML文字列. そのままページに埋め込む. */
  Content: string | AstroComponentFactory;
  /** サムネイル */
  thumbnail: ContentsImage;
  /** 記事のslug一覧 */
  posts: BlogPostEntry[];
  routes: TravelRouteEntry;
}
