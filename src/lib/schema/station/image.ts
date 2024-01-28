import { z } from "zod";

import { MicroCMSImageSchema } from "../image";

import type { MicroCMSImageComplete } from "@lib/contents/types";

export const stationImageTypeOptionsZodSchema = z.union([
  z.literal("駅舎"),
  z.literal("駅構内"),
  z.literal("駅周辺"),
  z.literal("駅名標"),
  z.literal("車両"),
  z.literal("時刻表"),
  z.literal("路線図"),
  z.literal("スタンプ"),
  z.literal("切符"),
]);
export type StationImageTypeOptions = z.infer<
  typeof stationImageTypeOptionsZodSchema
>;

/** microCMSの鉄道駅コレクションAPI上のカスタムフィールドを表すスキーマ */
const microCMSStationImageSchema = z.array(
  z.object({
    fieldId: z.literal("images"),
    type: stationImageTypeOptionsZodSchema.array(),
    image: MicroCMSImageSchema,
    comment: z.string().optional(),
    date: z.string().datetime().optional(),
  }),
);

/** microCMSから取得する鉄道駅コレクションコンテンツのスキーマ */
export const MicroCMSStationCollectionZod = z.array(
  z.object({
    id: z.string(),
    images: microCMSStationImageSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

/** ダウンロードされた一つの画像データの形式 */
export interface DownloadedStationImage {
  type: StationImageTypeOptions[];
  image: MicroCMSImageComplete;
  date?: string;
  comment?: string;
}

/**
 * CMSから取得した鉄道駅コレクションデータを表すレコード.
 * 駅IDをkeyとする.
 */
export interface DownloadedStationCollection {
  [id: string]: {
    id: string;
    createdAt: string;
    updatedAt: string;
    images: DownloadedStationImage[];
  };
}
