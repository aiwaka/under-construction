import fs from "node:fs";
import type { GetImageResult, ImageMetadata, MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";

import type {
  BlogThumbFormatEnum,
  CollectionBlogSchema,
} from "./collectionSchema";

import type { BlogPostEntry } from "@lib/contents/blog";
import type { ToEntryObject } from "@lib/types";
import type { ImagesStorageSchema } from "./image";

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsBlogPostEntry
  implements ToEntryObject<BlogPostEntry>, CollectionBlogSchema
{
  public id: string;
  public title: string;
  public description: string;
  public Content!: AstroComponentFactory;
  public thumbnail: string;
  public thumbnailFormat: BlogThumbFormatEnum | null;
  public date: Date;
  public updateDate: Date | undefined;
  public tags: string[];
  public related: string[];
  public headings!: MarkdownHeading[];
  public wordCount!: number;
  public latex: boolean;
  public draft: boolean;

  private thumbnailImage!: GetImageResult | null;
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
      const dataDir = "../../../generated/images-data.json";
      // TODO: new URLではなくpathToFileURLを使う
      const resolvedDataPath = new URL(dataDir, import.meta.url);
      if (!fs.existsSync(resolvedDataPath)) {
        const errorMessage =
          "Images data does not exist. Check the path settings output to the console." +
          `\n\`import.meta.url\` : ${import.meta.url}` +
          `\nreferencing path (\`path.href\`) : ${resolvedDataPath.href}`;
        throw Error(errorMessage);
      }
      const allImagesData: ImagesStorageSchema = JSON.parse(
        fs.readFileSync(resolvedDataPath, "utf8"),
      );

      const imagesData = allImagesData[entry.id];
      if (imagesData === undefined) {
        throw Error(`The specified id \`${entry.id}\` cannot be found.`);
      }
      const image = imagesData.thumbnail;
      // widthはURLクエリで指定し取得時点で縮小する（基本元の画像より小さめのサイズを指定するはずなので）.
      const queriedUrl = `${image.url}?w=1024&fm=webp`;
      // 最終的な画像のURL（最初はリモートURL）
      let resultImageUrl = queriedUrl;
      // NOTE: Astroのasset機能がリモート画像のダウンロードをサポートしたのでこれらの処理は不要
      // if (import.meta.env.PROD) {
      //   // ビルドモードなら画像をダウンロードし, webpに変換した結果のファイルパスをURLとする
      //   const filename = `thumb-${entry.id}`;
      //   const downloadedPath = await downloadImage(filename, queriedUrl);
      //   if (downloadedPath === undefined) {
      //     throw Error("[blog.ts] thumbnail download failed.");
      //   }
      //   const convertedImageUrl = await convertImage(downloadedPath);
      //   resultImageUrl = convertedImageUrl;
      // } else {
      //   if (!alreadyWarnedUsingRemote) {
      //     console.log("[blog.ts] 開発モードのためリモートURLを用いています。");
      //     alreadyWarnedUsingRemote = true;
      //   }
      // }

      const thumbHeight = Math.round(
        (entry.THUMB_WIDTH * image.height) / image.width,
      );
      // srcが`string`型のリモート画像の場合は`height`が必要.
      // microCMSから大きさ情報を取得できるので計算して渡す.
      return await getImage({
        src: resultImageUrl,
        width: entry.THUMB_WIDTH,
        height: thumbHeight,
      });
    };
    const getThumbImageFromLocal = async () => {
      const filename = `${entry.thumbnail}.${entry.thumbnailFormat}`;
      const localImagePath = `../../../blog-images/thumbnails/${filename}`;

      // NOTE: ここの処理は"@components/blog/BlogImagesLocal.astro"を参照.
      const globImages = import.meta.glob<ImageMetadata>(
        "../../../blog-images/**/*",
        { import: "default" },
      );
      const localImageMetaData = await globImages[localImagePath]();

      // ImageMetaDataを直接与える場合`height`は不要
      return await getImage({
        src: localImageMetaData,
        width: 1024,
        format: "webp",
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
          height: this.thumbnailImage.options.height as number,
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
