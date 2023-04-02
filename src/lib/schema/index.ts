import { z } from "astro:content";

enum ThumbnailFormatEnum {
  png = "png",
  jpg = "jpg",
}
const ThumbnailFormatSchema = z.nativeEnum(ThumbnailFormatEnum);
export type ThumbnailFormat = z.infer<typeof ThumbnailFormatSchema>;

export const BlogArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  thumbnailFormat: ThumbnailFormatSchema.default(ThumbnailFormatEnum.png),
  date: z.date(),
  updateDate: z.date().optional(),
  tags: z.string().array(),
  latex: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type BlogArticleSchemaType = z.infer<typeof BlogArticleSchema>;

/** Remarkによって書き換えられて追加される属性 */
export interface FrontmatterByRemarkPlugin {
  wordCount: number;
}

export type FinalFrontmatter = BlogArticleSchemaType &
  FrontmatterByRemarkPlugin;
