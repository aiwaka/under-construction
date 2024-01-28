import fs from "node:fs";

import { z } from "zod";
import { MicroCMSImageSchema } from "../image";

/** microCMSから取得するブログ用画像コンテンツ管理データのZodスキーマ */
export const MicroCMSBlogImagesDataZod = z.array(
  z.object({
    id: z.string(),
    // title: z.string(),
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
/**
 * CMSから取得したブログ画像データ.
 * ブログ記事IDをkeyとする.
 */
export interface RemoteBlogImageDataSchema {
  [id: string]: {
    thumbnail: z.infer<typeof MicroCMSImageSchema>;
    images: Record<string, z.infer<typeof MicroCMSImageSchema>>;
  };
}

export const getAllImagesData = (
  resolvedDataPath: URL,
  callerName?: string,
) => {
  if (!fs.existsSync(resolvedDataPath)) {
    const errorMessage =
      (callerName && `[${callerName}]:`) +
      "Images data does not exist. Check the path settings output to the console." +
      `\n\`import.meta.url\` : ${import.meta.url}` +
      `\nreferencing path (\`path.href\`) : ${resolvedDataPath.href}`;
    throw Error(errorMessage);
  }
  const allImagesData: RemoteBlogImageDataSchema = JSON.parse(
    fs.readFileSync(resolvedDataPath, "utf8"),
  );
  return allImagesData;
};
