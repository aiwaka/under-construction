import { z } from "astro:content";

export enum BlogThumbFormatEnum {
  png = "png",
  jpg = "jpg",
}
const BlogThumbFormatZodSchema = z.nativeEnum(BlogThumbFormatEnum);

const BlogThumbZodSchema = z.union([
  z.object({
    type: z.literal("local"),
    filename: z.string(),
    format: BlogThumbFormatZodSchema,
  }),
  z.object({
    type: z.literal("remote"),
  }),
]);

export type BlogThumbSchema = z.infer<typeof BlogThumbZodSchema>;

// ルートの深さを1とするため、h1を目次に入れるのは禁止する.
const TOCHeadingTagDepthsZodSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);
export type TOCHeadingTagDepths = z.infer<typeof TOCHeadingTagDepthsZodSchema>;

export const CollectionBlogZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: BlogThumbZodSchema,
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
  tocTarget: TOCHeadingTagDepthsZodSchema.array().default([2, 3]),
  draft: z.boolean().default(false),
});

/**
 * ブログ記事のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"blog">["data"]`と同等.
 */
export type CollectionBlogSchema = z.infer<typeof CollectionBlogZodSchema>;
