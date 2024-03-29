import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";
import { DateTime } from "luxon";

import type {
  DownloadedStationCollection,
  DownloadedStationImage,
} from "./image";
import type { CollectionStationSchema } from "./collectionSchema";

import type {
  StationEntry,
  StationImage,
} from "@lib/other/station-collections";
import type { ToEntryObject } from "@lib/types";
import { dateText } from "@lib/utils";
import { Address, addressFromStr } from "@lib/utils/address";

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
  public createdAt!: DateTime;
  public updatedAt!: DateTime;
  public images!: DownloadedStationImage[];
  public address?: string | Record<string, string>;
  public CommentContent!: AstroComponentFactory;

  public localUpdatedAt?: Date;

  private constructor(rawEntry: CollectionEntry<"station">) {
    this.id = rawEntry.slug;
    const data = rawEntry.data;
    this.name = data.name;
    this.lines = data.lines;
    this.address = data.address;
    this.firstVisitDate = data.firstVisitDate;
    this.localUpdatedAt = data.localUpdatedAt;
  }

  public static async create(
    rawEntry: CollectionEntry<"station">,
    remoteDataSet: DownloadedStationCollection,
  ) {
    const entry = new CollectionsStationEntry(rawEntry);
    const rendered = await rawEntry.render();
    // const { Content, headings, remarkPluginFrontmatter } = rendered;
    const { Content } = rendered;
    entry.CommentContent = Content;

    const remoteData = remoteDataSet[entry.id];
    entry.createdAt = DateTime.fromISO(remoteData.createdAt, {
      zone: "Asia/Tokyo",
    });
    // リモートの更新日時と手動で設定した更新日時を比較して新しい方を採用する
    const remoteUpdatedAt = remoteData.updatedAt;
    // リモートの時刻は日本時間のUTC表現なのでzone指定で補正
    const luxonRemoteUpdatedAt = DateTime.fromJSDate(
      new Date(remoteUpdatedAt),
      { zone: "Asia/Tokyo" },
    );
    const updatedAt =
      entry.localUpdatedAt === undefined
        ? luxonRemoteUpdatedAt
        : (() => {
            // ローカルのfrontmatterでの日付指定はUTCとして解釈する
            const luxonLocalUpdatedAt = DateTime.fromJSDate(
              entry.localUpdatedAt,
              { zone: "UTC" },
            );
            return luxonRemoteUpdatedAt < luxonLocalUpdatedAt
              ? luxonLocalUpdatedAt
              : luxonRemoteUpdatedAt;
          })();

    entry.updatedAt = updatedAt;
    entry.images = remoteData.images;

    return entry;
  }

  toEntryObject() {
    const {
      updatedAt,
      createdAt,
      lines,
      images: microCMSImages,
      address,
      ...rest
    } = this;
    /** サムネイルであるという指定がなされた画像の数. 0か1であるべきなので2以上の場合警告を出す */
    let thumbImgNum = 0;
    const images = microCMSImages.map((img) => {
      const photoTypeText = img.type.includes("スタンプ") ? "押印" : "撮影";
      const photoDateText = img.date
        ? dateText(new Date(img.date), "Asia/Tokyo") + photoTypeText
        : `${photoTypeText}日不明`;
      // commentがundefinedや空文字列の場合があるので、論理否定二回によってbooleanに変換している
      const isThumb = !!img.comment?.startsWith("[isThumb]");
      if (isThumb) {
        // 接頭辞が検出された場合はそれを消しておく
        img.comment = img.comment?.replace("[isThumb]", "");
        thumbImgNum += 1;
      }
      return {
        src: img.image.url,
        width: img.image.width,
        height: img.image.height,
        alt: `${img.type.join("・")}の画像`,
        caption: `${photoDateText}` + (img.comment ? "：" + img.comment : ""),
        type: img.type,
        comment: img.comment,
        date: img.date,
        isThumb,
      } satisfies StationImage;
    });
    if (thumbImgNum > 1) {
      console.log(
        "[station/converter]: Images including the string `[isThumb]` exist multiple.",
      );
    }
    const addressRecord: StationEntry["address"] = {};
    if (typeof address !== "undefined") {
      if (typeof address === "string") {
        const obj = addressFromStr(address);
        addressRecord["_"] = obj === null ? null : new Address(obj);
      } else {
        Object.entries(address).forEach(([key, value]) => {
          const obj = addressFromStr(value);
          addressRecord[key] = obj === null ? null : new Address(obj);
        });
      }
    }
    return {
      lineIds: lines,
      address: addressRecord,
      createdAt,
      updatedAt,
      images,
      ...rest,
      isEntrySchema: null,
    } satisfies StationEntry;
  }
}
