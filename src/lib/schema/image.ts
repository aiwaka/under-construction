import { z } from "zod";

/** MicroCMSから取得する画像のスキーマ */
export const MicroCMSImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const ImageMetadataSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.union([z.literal("png"), z.literal("jpg")]),
});
