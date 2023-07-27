import type { MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/dist/runtime/server";
import type { CollectionEntry } from "astro:content";
import { z } from "astro:content";

import type { BlogPostEntry } from "@lib/contents/blog";
import type { ToEntryObject } from "@lib/types";
import { getImage } from "@astrojs/image";

enum ThumbnailFormatEnum {
  png = "png",
  jpg = "jpg",
}
const ThumbnailFormatSchema = z.nativeEnum(ThumbnailFormatEnum);
export type ThumbnailFormatType = z.infer<typeof ThumbnailFormatSchema>;

export const CollectionBlogSchema = z.object({
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

/** ブログ記事のfrontmatterのスキーマを表す型 */
export type CollectionBlogSchemaDataType = CollectionEntry<"blog">["data"];

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsBlogPostEntry
  implements ToEntryObject<BlogPostEntry>, CollectionBlogSchemaDataType
{
  public id: string;
  public title: string;
  public description: string;
  public Content!: AstroComponentFactory;
  public thumbnail: string;
  public thumbnailFormat: ThumbnailFormatEnum;
  public date: Date;
  public updateDate: Date | undefined;
  public tags: string[];
  public related: string[];
  public headings!: MarkdownHeading[];
  public wordCount!: number;
  public latex: boolean;
  public draft: boolean;

  private thumbnailImage!: astroHTML.JSX.ImgHTMLAttributes;

  private constructor(rawEntry: CollectionEntry<"blog">) {
    this.id = rawEntry.slug;
    const data = rawEntry.data;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.thumbnailFormat = data.thumbnailFormat;
    this.date = data.date;
    this.updateDate = data.updateDate;
    this.tags = [...data.tags];
    this.related = [...data.related];
    this.latex = data.latex;
    this.draft = data.draft;
  }

  public static async create(rawEntry: CollectionEntry<"blog">) {
    const entry = new CollectionsBlogPostEntry(rawEntry);
    const rendered = await rawEntry.render();
    const { Content, headings, remarkPluginFrontmatter } = rendered;
    entry.Content = Content;
    entry.wordCount = remarkPluginFrontmatter.wordCount as number;
    // parseとstringifyで完全に復元できるためこれでよい.
    entry.headings = JSON.parse(JSON.stringify(headings));

    entry.thumbnailImage = await getImage({
      src: import(
        `../../blog-images/thumbnails/${entry.thumbnail}.${entry.thumbnailFormat}`
      ),
      width: 1024,
      format: "webp",
      alt: "thumbnail",
    });
    return entry;
  }

  toEntryObject() {
    const {
      date,
      updateDate,
      id,
      Content,
      thumbnail,
      thumbnailFormat,
      ...rest
    } = this;
    if (!this.thumbnailImage.src) {
      throw Error(`thumbnail loading failed in \`${this.title}\``);
    }
    const thumbHeight =
      typeof this.thumbnailImage.height! === "string"
        ? parseInt(this.thumbnailImage.height)
        : this.thumbnailImage.height!;
    return {
      thumbnail: {
        url: this.thumbnailImage.src,
        width: 1024,
        height: thumbHeight,
        alt: "thumbnail",
      },
      id,
      createdAt: new Date(date),
      updatedAt: new Date(updateDate ?? date),
      isEntrySchema: null,
      Content,
      ...rest,
    } satisfies BlogPostEntry;
  }
}
