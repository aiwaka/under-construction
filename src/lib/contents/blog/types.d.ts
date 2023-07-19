/**
 * 記事内の画像オブジェクト
 */
export interface ImageInArticle {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

import type { IsEntrySchema, ContentsImage } from "@lib/types";

/**
 * ブログ記事のオブジェクト
 */
export interface BlogPostEntry extends IsEntrySchema {
  /** 記事タイトル */
  title: string;
  /** 著者 */
  author: string;
  /** コンテンツで, HTML文字列. そのままページに埋め込む. */
  content: string;
  /** サムネイル */
  thumbnail: ContentsImage;
  /** タグ一覧. 文字列の羅列にする（整合性等は別で担保する）. */
  tags: string[];
  /** 関連記事. 各記事のid, titleと, 関連した理由となるタグの列を持つ. */
  related: RelatedBlogPost[];
}
export interface RelatedBlogPost {
  id: string;
  title: string;
  reason: string[] | "specified";
}

// /** `BlogPostEntry`に変換する */
// export interface ToBlogPostEntry {
//   toBlogPostEntry(): BlogPostEntry;
// }
