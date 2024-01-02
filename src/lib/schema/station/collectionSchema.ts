import { z } from "zod";

/** 鉄道駅コレクションコンテンツのスキーマ */
export const CollectionStationZodSchema = z.object({
  name: z.string(),
  lines: z.string().array(),
  firstVisitDate: z.date().optional(),
  localUpdatedAt: z.date().optional(),
});

/**
 * 駅のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"station">["data"]`と同等.
 */
export type CollectionStationSchema = z.infer<
  typeof CollectionStationZodSchema
>;
