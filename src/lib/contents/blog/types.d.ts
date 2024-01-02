import type { TOCHeadingTagDepths } from "@lib/schema/blog/collectionSchema";
import type { IsEntrySchema, ContentsImage } from "@lib/types";
import type { MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/dist/runtime/server";
import type { DateTime } from "luxon";

/**
 * ブログ記事のオブジェクト
 */
export interface BlogPostEntry extends IsEntrySchema {
  /** 記事タイトル */
  title: string;
  /** 記事の説明文 */
  description: string;
  /** コンテンツで, HTML文字列. そのままページに埋め込む. */
  Content: string | AstroComponentFactory;
  /** サムネイル */
  thumbnail: ContentsImage;
  /** タグ一覧. 文字列の羅列にする（整合性等は別で担保する）. */
  tags: string[];
  /** （特別に指定する）関連記事. 記事のidの列. */
  related: string[];
  /** 見出しの列. */
  headings: MarkdownHeading[];
  /** 文字数（remarkで付与される） */
  wordCount: number | null;
  /** LaTeXを使用するか */
  latex: boolean;
  /** 見出しを作成する対象の見出しタグレベル. デフォルトは [2, 3] */
  tocTarget: TOCHeadingTagDepths[];
  /** 下書きならばtrue */
  draft: boolean;
}
export interface RelatedBlogPost {
  id: string;
  title: string;
  date: DateTime;
  /** 関連するに至った理由となるタグ文字列, または指定されていることを示す */
  factor: string[] | "specified";
}
