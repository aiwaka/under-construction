import { z } from "astro/zod";

/** MicroCMSから取得する画像のスキーマ */
export const MicroCMSImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});
