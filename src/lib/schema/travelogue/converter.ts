import assert from "node:assert/strict";

import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { type CollectionEntry, getEntry, getEntries } from "astro:content";
import { getImage } from "astro:assets";

import type {
  CollectionTravelogueSchema,
  TravelogueThumbSchema,
} from "./collectionSchema";
import { CollectionsBlogPostEntry, getAllImagesData } from "../blog";
import { CollectionsTravelRouteEntry } from "../travelRoute";

import type { ContentsImage, ToEntryObject } from "@lib/types";
import type { TravelogueEntry } from "@lib/contents/travelogue";
import type { BlogPostEntry } from "@lib/contents/blog";
import type { TravelRouteEntry } from "@lib/other/station-collections";

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsTravelogueEntry
  implements ToEntryObject<TravelogueEntry>, CollectionTravelogueSchema
{
  public id: string;
  public title: string;
  public description: string;
  public thumbnail: TravelogueThumbSchema;
  public startDate: Date;
  public endDate: Date;
  public CommentContent!: AstroComponentFactory;
  public posts: { collection: "blog"; slug: CollectionEntry<"blog">["slug"] }[];
  public routes: {
    collection: "travelRoute";
    id: CollectionEntry<"travelRoute">["id"];
  };

  private thumbnailImage!: ContentsImage;
  private THUMB_WIDTH: number = 1024;
  private routeObj!: TravelRouteEntry;
  private postsObj!: BlogPostEntry[];

  private constructor(rawEntry: CollectionEntry<"travelogue">) {
    this.id = rawEntry.slug;
    const data = rawEntry.data;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.posts = data.posts;
    this.routes = data.routes;
  }

  public static async create(rawEntry: CollectionEntry<"travelogue">) {
    const entry = new CollectionsTravelogueEntry(rawEntry);
    const rendered = await rawEntry.render();
    const { Content } = rendered;
    entry.CommentContent = Content;

    const route = await getEntry(rawEntry.data.routes);
    const posts = await getEntries(rawEntry.data.posts);

    entry.postsObj = await Promise.all(
      posts.map(async (post) => {
        const collectionsEntry = await CollectionsBlogPostEntry.create(post);
        const blogEntry = collectionsEntry.toEntryObject();
        return blogEntry;
      }),
    );
    entry.routeObj = (
      await CollectionsTravelRouteEntry.create(route)
    ).toEntryObject();

    // リモートの画像を取得する
    // TODO: assertを用いるなどの処理はblog/converter.tsにも反映する.
    const getThumbImageFromRemote = async () => {
      // 以下entry.thumbnailはリモートであるとして扱える.
      assert(entry.thumbnail.type === "remote");

      // ビルド時のバンドルされるファイルのURLがどうなるかはあまりわかっていないのでうまくいくようにしている.
      // `dist/generated/`にはintegrationにより`images-data.json`がコピーされているものとする.
      const dataDir = import.meta.env.DEV
        ? "../../../generated/images-data.json"
        : "../../../dist/generated/images-data.json";
      const resolvedDataPath = new URL(dataDir, import.meta.url);
      const allImagesData = getAllImagesData(
        resolvedDataPath,
        "[travelogue/converter.ts]",
      );
      // if (!fs.existsSync(resolvedDataPath)) {
      //   const errorMessage =
      //     "[blog/converter.ts]: Images data does not exist. Check the path settings output to the console." +
      //     `\n\`import.meta.url\` : ${import.meta.url}` +
      //     `\nreferencing path (\`path.href\`) : ${resolvedDataPath.href}`;
      //   throw Error(errorMessage);
      // }
      // const allImagesData: ImagesStorageSchema = JSON.parse(
      //   fs.readFileSync(resolvedDataPath, "utf8"),
      // );

      const imagesData = allImagesData[entry.thumbnail.id];
      if (imagesData === undefined) {
        throw Error(
          `[blog/converter.ts]: The specified id \`${entry.id}\` cannot be found.`,
        );
      }
      const image = imagesData.thumbnail;
      const specifiedWidth = Math.min(
        Math.round(image.width),
        entry.THUMB_WIDTH,
      );
      const queriedUrl = `${image.url}?w=${specifiedWidth}&fm=webp`;
      const thumbHeight = Math.round(
        (entry.THUMB_WIDTH * image.height) / image.width,
      );
      // srcが`string`型のリモート画像の場合は`height`が必要.
      // microCMSから大きさ情報を取得できるので計算して渡す.
      return await getImage({
        src: queriedUrl,
        width: entry.THUMB_WIDTH,
        height: thumbHeight,
      });
    };
    const getThumbImageFromLocal = async () => {
      assert(entry.thumbnail.type === "local");
      const filename = `${entry.thumbnail.filename}.${entry.thumbnail.format}`;
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
    const getThumbImageFromExistingBlog = () => {
      assert(entry.thumbnail.type === "fromPost");
      if (entry.postsObj.length === 0) {
        throw Error("既存のブログ記事がないためサムネイルを指定できません。");
      }
      return entry.postsObj[0].thumbnail;
    };
    const createThumbData = async () => {
      if (entry.thumbnail.type === "fromPost") {
        const existing = getThumbImageFromExistingBlog();
        existing.alt = "thumbnail of " + entry.id;
        return existing;
      } else {
        const thumb =
          entry.thumbnail.type === "remote"
            ? await getThumbImageFromRemote()
            : await getThumbImageFromLocal();

        return {
          url: thumb.src,
          width: entry.THUMB_WIDTH,
          height: thumb.options.height as number,
          alt: "thumbnail of " + entry.id,
        };
      }
    };
    entry.thumbnailImage = await createThumbData();

    return entry;
  }

  toEntryObject() {
    const { postsObj, routeObj, CommentContent, ...rest } = this;

    return {
      ...rest,
      posts: postsObj,
      routes: routeObj,
      Content: CommentContent,
      thumbnail: this.thumbnailImage,
      // * IsEntrySchemaで要求されるこれらの値はここでは無意味なのでダミーにする（設計が悪い）
      createdAt: this.startDate,
      updatedAt: this.startDate,
      isEntrySchema: null,
    } satisfies TravelogueEntry;
  }
}
