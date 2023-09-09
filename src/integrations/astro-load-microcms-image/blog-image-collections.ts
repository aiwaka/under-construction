import { z } from "astro/zod";
import { MicroCMSImageSchema } from "../../lib/schema/image";

/** microCMSから取得するブログ用画像コンテンツのスキーマ */
export const MicroCMSImagesDataSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: MicroCMSImageSchema,
    images: z.array(
      z.object({
        fieldId: z.literal("image"),
        name: z.string(),
        image: MicroCMSImageSchema,
      }),
    ),
  }),
);
/** このブログプロジェクトで利用したい形式のスキーマ */
export interface ImagesStorageSchema {
  [title: string]: {
    thumbnail: z.infer<typeof MicroCMSImageSchema>;
    images: {
      [name: string]: z.infer<typeof MicroCMSImageSchema>;
    };
  };
}
