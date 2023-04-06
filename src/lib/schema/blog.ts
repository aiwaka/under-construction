import type { CollectionEntry } from "astro:content";
import { z } from "astro:content";

enum ThumbnailFormatEnum {
  png = "png",
  jpg = "jpg",
}
const ThumbnailFormatSchema = z.nativeEnum(ThumbnailFormatEnum);
export type ThumbnailFormatType = z.infer<typeof ThumbnailFormatSchema>;

export const BlogArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  thumbnailFormat: ThumbnailFormatSchema,
  date: z.date(),
  updateDate: z.date().optional(),
  tags: z.string().array(),
  related: z
    .string()
    .array()
    // 5個以上関連記事をセットできない
    .refine((arg) => arg.length <= 5)
    .default([]),
  latex: z.boolean().default(false),
  draft: z.boolean().default(false),
});

/** Remarkによって書き換えられて追加される属性 */
export interface FrontmatterByRemarkPlugin {
  wordCount: number;
}

/** ブログ記事のfrontmatterのスキーマを表す型 */
export type BlogArticleSchemaType = CollectionEntry<"blog">["data"];

/** コレクション情報のスキーマ部分にremarkによる加工を追加した型 */
export type FinalBlogCollectionEntry = Omit<CollectionEntry<"blog">, "data"> & {
  data: BlogArticleSchemaType & FrontmatterByRemarkPlugin;
};
