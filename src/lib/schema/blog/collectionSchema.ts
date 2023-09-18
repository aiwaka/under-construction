import { z } from "astro:content";

export enum BlogThumbFormatEnum {
  png = "png",
  jpg = "jpg",
}
const BlogThumbFormatZodSchema = z.nativeEnum(BlogThumbFormatEnum);

export const CollectionBlogZodSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    thumbnailFormat: BlogThumbFormatZodSchema.nullable().default(null),
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
  })
  .refine(
    ({ thumbnail, thumbnailFormat }) => {
      return thumbnail === "remote" || thumbnailFormat !== null;
    },
    {
      path: ["thumbnailFormat"],
      message: "`thumbnail`が`remote`でない場合`thumbnailFormat`は必須です。",
    },
  );

/**
 * ブログ記事のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"blog">["data"]`と同等.
 */
export type CollectionBlogSchema = z.infer<typeof CollectionBlogZodSchema>;
