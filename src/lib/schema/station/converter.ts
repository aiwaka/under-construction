import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";
import { DateTime } from "luxon";

import type {
  DownloadedStationCollection,
  DownloadedStationImage,
} from "./image";
import type { CollectionStationSchema } from "./collectionSchema";

import type { StationEntry } from "@lib/more/station-collections";
import type { ToEntryObject } from "@lib/types";
import { dateText } from "@lib/utils";

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsStationEntry
  implements ToEntryObject<StationEntry>, CollectionStationSchema
{
  public id: string;
  public name: string;
  /** 路線ID文字列の列 */
  public lines: string[];
  public firstVisitDate?: Date;
  /** UTC文字列で保持 */
  public createdAt!: string;
  public updatedAt!: string;
  public images!: DownloadedStationImage[];
  public CommentContent!: AstroComponentFactory;

  private constructor(rawEntry: CollectionEntry<"station">) {
    this.id = rawEntry.slug;
    const data = rawEntry.data;
    this.name = data.name;
    this.lines = data.lines;
    this.firstVisitDate = data.firstVisitDate;
  }

  public static async create(
    rawEntry: CollectionEntry<"station">,
    remoteDataSet: DownloadedStationCollection,
  ) {
    const entry = new CollectionsStationEntry(rawEntry);
    const rendered = await rawEntry.render();
    const { Content, headings, remarkPluginFrontmatter } = rendered;
    entry.CommentContent = Content;

    const remoteData = remoteDataSet[entry.id];
    entry.createdAt = remoteData.createdAt;
    entry.updatedAt = remoteData.updatedAt;
    entry.images = remoteData.images;

    return entry;
  }

  toEntryObject() {
    const {
      updatedAt,
      createdAt,
      lines,
      images: microCMSImages,
      ...rest
    } = this;
    const images = microCMSImages.map((img) => {
      const photoOrStampText = img.type.includes("スタンプ") ? "押印" : "撮影";
      const photoDateText = img.date
        ? dateText(new Date(img.date)) + photoOrStampText
        : photoOrStampText + "日不明";
      const captionText =
        photoDateText + (img.comment ? "：" + img.comment : "");
      return {
        src: img.image.url,
        width: img.image.width,
        height: img.image.height,
        alt: `${img.type}の画像`,
        caption: captionText,
        type: img.type,
        comment: img.comment,
        date: img.date,
      };
    });
    return {
      lineIds: lines,
      createdAt: DateTime.fromISO(createdAt, {
        zone: "Asia/Tokyo",
      }).toJSDate(),
      updatedAt: DateTime.fromISO(updatedAt, {
        zone: "Asia/Tokyo",
      }).toJSDate(),
      images,
      ...rest,
      isEntrySchema: null,
    } satisfies StationEntry;
  }
}
