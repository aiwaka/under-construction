import { z } from "astro/zod";
import { MicroCMSImageSchema } from "../../lib/schema/image";
import type { MicroCMSImageComplete } from "@lib/contents/types";

const imageTypeOptionsSchema = z.union([
  z.literal("駅舎"),
  z.literal("駅構内"),
  z.literal("駅前"),
  z.literal("駅名標"),
  z.literal("車両"),
  z.literal("路線図"),
  z.literal("スタンプ"),
  z.literal("切符"),
]);

/** microCMSから取得する鉄道駅コレクションコンテンツのスキーマ */
export const MicroCMSStationCollectionsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    lineNames: z.string(),
    images: z.array(
      z.object({
        fieldId: z.literal("images"),
        type: imageTypeOptionsSchema.array(),
        image: MicroCMSImageSchema,
        comment: z.string().optional(),
        date: z.string().datetime().optional(),
      }),
    ),
    firstVisitDate: z.string().datetime().optional(),
    comment: z.string().optional(),
    updatedAt: z.string().datetime(),
  }),
);

/** 利用したい形式の鉄道駅コレクションのスキーマ */
export type StationCollectionsSchema = {
  [id: string]: {
    id: string;
    name: string;
    lineNames: string;
    comment?: string;
    firstVisitDate?: string;
    updatedAt: string;
    images: {
      type: z.infer<typeof imageTypeOptionsSchema>[];
      image: MicroCMSImageComplete;
      date?: string;
      comment?: string;
    }[];
  };
};
