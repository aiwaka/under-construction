import type { IsEntrySchema, ContentsImage } from "@lib/types";

/**
 * ブログ記事のオブジェクト
 */
export interface BlogPostEntry extends IsEntrySchema {
  /** 記事タイトル */
  title: string;
  /** 記事の説明文 */
  description: string;
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
  /** 文字数（remarkで付与される） */
  wordCount: number | null;
  /** LaTeXを使用するか */
  latex: boolean;
  /** 下書きならばtrue */
  draft: boolean;
}
export interface RelatedBlogPost {
  id: string;
  title: string;
  date: Date;
  /** 関連するに至った理由となるタグ文字列, または指定されていることを示す */
  factor: string[] | "specified";
}
