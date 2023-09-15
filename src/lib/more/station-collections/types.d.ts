import type { AstroComponentFactory } from "astro/runtime/server/index.js";

import type { StationImageTypeOptionsType } from "@lib/schema/station";
import type { IsEntrySchema } from "@lib/types";
import type { MicroCMSImageComplete } from "@lib/contents/types";
import type { BlogImageProps } from "@lib/contents/blog";

export interface StationImage {
  type: StationImageTypeOptionsType[];
  image: MicroCMSImageComplete;
  date?: string;
  comment?: string;
}

export interface StationEntry extends IsEntrySchema {
  /** 駅名 */
  name: string;
  /** 所属路線 */
  lineNames: string[];
  /** 画像・タイプ・コメントデータ */
  images: (Required<BlogImageProps> & Omit<StationImage, "image">)[];
  /** 初訪問日 */
  firstVisitDate?: Date;
  /** 駅の説明文. コンテンツで, HTML文字列. そのままページに埋め込む. */
  CommentContent: string | AstroComponentFactory;
}
