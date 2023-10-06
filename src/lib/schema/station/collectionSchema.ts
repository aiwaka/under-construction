import { stationImageTypeOptionsZodSchema } from "./image";
import { z } from "zod";

/** 鉄道駅コレクションコンテンツのスキーマ */
export const CollectionStationZodSchema = z.object({
  name: z.string(),
  lines: z.string().array(),
  firstVisitDate: z.date().optional(),
  comment: z.string().optional(),
  /** 特定の項目が存在しない場合は明示することを可能にする */
  noDataFlag: stationImageTypeOptionsZodSchema.array().default([]),
});

/**
 * 駅のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"station">["data"]`と同等.
 */
export type CollectionStationSchema = z.infer<
  typeof CollectionStationZodSchema
>;
