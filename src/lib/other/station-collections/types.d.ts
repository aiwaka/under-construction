import type { AstroComponentFactory } from "astro/runtime/server/index.js";

import type {
  StationImageTypeOptions,
  StationImageTypeOptionsType,
} from "@lib/schema/station";
import type { IsEntrySchema } from "@lib/types";
import type { MicroCMSImageComplete } from "@lib/contents/types";
import type { BlogImageProps } from "@lib/contents/blog";
import type { CollectionTravelRouteSchema } from "@lib/schema/travelRoute";

export interface StationImage {
  type: StationImageTypeOptionsType[];
  image: MicroCMSImageComplete;
  date?: string;
  comment?: string;
}

export interface StationEntry extends IsEntrySchema {
  /** 駅名 */
  name: string;
  /** 所属路線IDの列 */
  lineIds: string[];
  /** 画像・タイプ・コメントデータ */
  images: (Required<BlogImageProps> & Omit<StationImage, "image">)[];
  /** 初訪問日 */
  firstVisitDate?: Date;
  /** 駅の説明文. コンポーネントまたはHTML文字列とし, そのままページに埋め込む. */
  CommentContent: string | AstroComponentFactory;
}

export interface TravelRouteEntry extends IsEntrySchema {
  /** 名前 */
  name: string;
  /** ルート情報 */
  route: {
    name: string;
    stationId?: string;
    nextTransport?: string;
    arrivalTime: Date;
    departureTime?: Date;
    marker?: CollectionTravelRouteSchema["route"][number]["marker"];
  }[];
}
