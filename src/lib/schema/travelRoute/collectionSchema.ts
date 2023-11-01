import { reference } from "astro:content";
import { z } from "zod";

/** 旅行ルートコレクションデータのスキーマ */
export const CollectionTravelRouteZodSchema = z.object({
  name: z.string(),
  date: z.date(),
  route: z
    .object({
      name: z.string(),
      station: reference("station").optional(),
      nextTransport: z.string().optional(),
      arrivalTime: z.date(),
      departureTime: z.date().optional(),
      marker: z
        .object({
          type: z.union([
            z.literal("single"),
            z.literal("start"),
            z.literal("relay"),
            z.literal("end"),
          ]),
          label: z.string(),
        })
        .array()
        .optional(),
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
