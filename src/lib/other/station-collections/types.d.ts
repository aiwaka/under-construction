import type { AstroComponentFactory } from "astro/runtime/server/index.js";

import type {
  StationImageTypeOptions,
  StationImageTypeOptionsType,
} from "@lib/schema/station";
import type { IsEntrySchema } from "@lib/types";
import type { MicroCMSImageComplete } from "@lib/contents/types";
import type { CollectionTravelRouteSchema } from "@lib/schema/travelRoute";
import type { Address, AddressSchema } from "@lib/utils/address";

export interface StationImage {
  src: string | ImageMetadata;
  width: number;
  height: number;
  alt: string;
  caption: string;
  type: StationImageTypeOptionsType[];
  date?: string;
  comment?: string;
  /** `true`の場合強制的にサムネイルにする. */
  isThumb?: boolean;
}

export interface StationEntry extends IsEntrySchema {
  /** 駅名 */
  name: string;
  /** 所属路線IDの列 */
  lineIds: string[];
  /** 画像・タイプ・コメントデータ */
  images: StationImage[];
  /** 所在地 */
  address: Record<string, Address | null>;
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
