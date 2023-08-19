import fs from "fs";
import type { ImageMetadata, MarkdownHeading } from "astro";
import { getImage } from "astro:assets";
import type { AstroComponentFactory } from "astro/dist/runtime/server";
import type { CollectionEntry } from "astro:content";
import { z } from "astro:content";

import type { BlogPostEntry } from "@lib/contents/blog";
import type { ToEntryObject } from "@lib/types";
import type { ImagesStorageSchema } from "src/integrations/astro-load-microcms-image";

enum ThumbnailFormatEnum {
  png = "png",
  jpg = "jpg",
}
const ThumbnailFormatSchema = z.nativeEnum(ThumbnailFormatEnum);
// export type ThumbnailFormatType = z.infer<typeof ThumbnailFormatSchema>;

export const CollectionBlogSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    thumbnailFormat: ThumbnailFormatSchema.nullable().default(null),
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
  public thumbnailFormat: ThumbnailFormatEnum | null;
  public date: Date;
  public updateDate: Date | undefined;
  public tags: string[];
  public related: string[];
  public headings!: MarkdownHeading[];
  public wordCount!: number;
  public latex: boolean;
  public draft: boolean;

  // private thumbnailImage!: astroHTML.JSX.ImgHTMLAttributes | null;
  private thumbnailImage!: astroHTML.JSX.ImgHTMLAttributes | null;
  private THUMB_WIDTH: number = 1024;

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

    if (entry.thumbnail !== "remote" && entry.thumbnailFormat === null) {
      throw Error(
        "サムネイルに関するバリデーションが不正です。`thumbnail`が`remote`であるか、そうでないなら`thumbnailFormat`が指定されている必要があります。",
      );
    }
    // リモートの画像を取得する処理
    const getThumbImageFromRemote = async () => {
      // ビルド時のバンドルされるファイルのURLがどうなるかはあまりわかっていないのでうまくいくようにしている.
      // `dist/generated/`にはintegrationにより`images-data.json`がコピーされているものとする.
      // const dataDir = import.meta.env.DEV
      //   ? "../../generated/images-data.json"
      //   : "../../generated/images-data.json";
      const dataDir = "../../generated/images-data.json";
      const path = new URL(dataDir, import.meta.url);
      if (!fs.existsSync(path)) {
        const errorMessage =
          "Images data does not exist. Check the path settings output to the console." +
          `\n\`import.meta.url\` : ${import.meta.url}` +
          `\nreferencing path (\`path.href\`) : ${path.href}`;
        throw Error(errorMessage);
      }
      const allImagesData: ImagesStorageSchema = JSON.parse(
        fs.readFileSync(path, "utf8"),
      );

      const imagesData = allImagesData[entry.id];
      if (imagesData === undefined) {
        throw Error(`The specified id \`${entry.id}\` cannot be found.`);
      }
      const image = imagesData.thumbnail;
      // widthはURLクエリで指定し取得時点で縮小する（基本元の画像より小さめのサイズを指定するはずなので）.
      const queriedUrl = `${image.url}?w=1024`;
      const thumbHeight = (entry.THUMB_WIDTH * image.height) / image.width;
      // srcが`string`型のリモート画像の場合は`height`が必要. 従来の`aspectRatio`は受け付けなくなった.
      // microCMSから大きさ情報を取得できるので計算して渡す.
      return await getImage({
        src: queriedUrl,
        width: entry.THUMB_WIDTH,
        height: thumbHeight,
        format: "webp",
        alt: "thumbnail",
      });
    };
    const getThumbImageFromLocal = async () => {
      const filename = `${entry.thumbnail}.${entry.thumbnailFormat}`;
      const localImagePath = `../../blog-images/thumbnails/${filename}`;

      // NOTE: ここの処理は"../../components/blog/BlogImagesLocal.astro"を参照.
      const globImages = import.meta.glob<ImageMetadata>(
        "../../blog-images/**/*",
        { import: "default" },
      );
      const localImageMetaData = await globImages[localImagePath]();

      // ImageMetaDataを直接与える場合`height`は不要
      return await getImage({
        src: localImageMetaData,
        width: 1024,
        format: "webp",
        alt: "thumbnail",
      });
    };
    const getThumbImage = async () => {
      try {
        return entry.thumbnail === "remote"
          ? await getThumbImageFromRemote()
          : await getThumbImageFromLocal();
      } catch (e) {
        console.log(e);
        return null;
      }
    };
    entry.thumbnailImage = await getThumbImage();
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
    const createThumbData = () => {
      if (!this.thumbnailImage?.src) {
        // throw Error(`Failed to load thumbnail in \`${this.title}\``);
        console.error(`Failed to load thumbnail in \'${this.title}\'`);
        return {
          url: "no-image", // このURLはダミーで必ず404が出る.
          width: 1024,
          height: 1024,
          alt: "no-image",
        };
      } else {
        return {
          url: this.thumbnailImage.src,
          width: 1024,
          height: Math.round((this.thumbnailImage.height as number) + 0),
          alt: "thumbnail",
        };
      }
    };

    return {
      thumbnail: createThumbData(),
      id,
      createdAt: new Date(date),
      updatedAt: new Date(updateDate ?? date),
      isEntrySchema: null,
      Content,
      ...rest,
    } satisfies BlogPostEntry;
  }
}
