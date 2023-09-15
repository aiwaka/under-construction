import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";
import { z } from "astro/zod";
import { DateTime } from "luxon";

import type {
  DownloadedStationCollection,
  DownloadedStationImage,
} from "./../../integrations/load-station-collections";

import type { StationEntry } from "@lib/more/station-collections";
import type { ToEntryObject } from "@lib/types";
import { dateText } from "@lib/utils";

/** 鉄道駅コレクションコンテンツのスキーマ */
export const CollectionStationSchema = z.object({
  name: z.string(),
  lines: z.string().array(),
  firstVisitDate: z.date().optional(),
  comment: z.string().optional(),
});

export type CollectionStationSchemaDataType =
  CollectionEntry<"station">["data"];

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsStationEntry
  implements ToEntryObject<StationEntry>, CollectionStationSchemaDataType
{
  public id: string;
  public name: string;
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
      id,
      CommentContent,
      updatedAt,
      createdAt,
      lines,
      images: microCMSImages,
      ...rest
    } = this;
    const images = microCMSImages.map((img, i) => {
      const photoDateText = img.date ? dateText(new Date(img.date)) : "不明";
      return {
        src: img.image.url,
        width: img.image.width,
        height: img.image.height,
        alt: `${img.type}の画像${i + 1}`,
        caption:
          `${photoDateText}撮影` + (img.comment ? "：" + img.comment : ""),
        type: img.type,
        comment: img.comment,
        date: img.date,
      };
    });
    return {
      id,
      lineNames: lines,
      createdAt: DateTime.fromISO(createdAt, {
        zone: "Asia/Tokyo",
      }).toJSDate(),
      updatedAt: DateTime.fromISO(updatedAt, {
        zone: "Asia/Tokyo",
      }).toJSDate(),
      CommentContent,
      images,
      ...rest,
      isEntrySchema: null,
    } satisfies StationEntry;
  }
}
