import { reference } from "astro:content";
import { z } from "zod";

/** 鉄道駅コレクションコンテンツのスキーマ */
export const CollectionTravelRouteZodSchema = z.object({
  name: z.string(),
  date: z.date(),
  route: z
    .object({
      name: z.string(),
      stationId: z.string().optional(),
      nextTransport: z.string().optional(),
      arrivalTime: z.date(),
      departureTime: z.date().optional(),
    })
    .array(),
});

/**
 * 旅行ルートのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"travelRoute">["data"]`と同等.
 */
export type CollectionTravelRouteSchema = z.infer<
  typeof CollectionTravelRouteZodSchema
>;
