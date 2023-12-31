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
      // NOTE: 以前あった`type`フィールドは不要（`label`で判別することになるので）
      marker: z
        .union([
          z.object({
            label: z.literal("primary"),
          }),
          z.object({
            label: z.literal("anchor"),
            contents: z.object({
              // ページのURL（`/under-construction/`より下）を指定
              url: z.string(),
              // 空白文字以外の場合, ページにはそのidを持つ要素が埋め込まれている必要がある.
              id: z.string().default(""),
            }),
          }),
        ])
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
