import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import fs from "fs";
import { createClient } from "microcms-js-sdk";

const PKG_NAME = "astro-load-microcms-image";

const consoleLogUsingPackageName = (...args: string[]) => {
  console.log(`[${PKG_NAME}] `, ...args);
};

interface LoadMicroCMSImageOptions {
  skip?: boolean;
}
/** MicroCMSから取得する画像のスキーマ */
const MicroCMSImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});
/** microCMSから取得するブログ用画像コンテンツのスキーマ */
const MicroCMSImagesDataSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: MicroCMSImageSchema,
    images: z.array(
      z.object({
        fieldId: z.literal("image"),
        name: z.string(),
        image: MicroCMSImageSchema,
      })
    ),
  })
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

const DATA_FILE_NAME: string = "images-data.json";

export default function preload(
  options: LoadMicroCMSImageOptions = {}
): AstroIntegration {
  const { skip = false } = options;
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": async ({ command, isRestart }) => {
        if (skip) {
          console.log("[load-microcms-image] fetch skipped.");
          return;
        }
        if (isRestart) {
          console.log("[load-microcms-image] fetch skipped when restarting.");
          return;
        }
        (await import("dotenv")).config();
        const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
        const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;
        if (!(MICROCMS_SERVICE_DOMAIN && MICROCMS_API_KEY)) {
          throw Error("MICROCMS_XXX_XXX variables are not defined in `.env`.");
        }

        const microCMSClient = createClient({
          serviceDomain: MICROCMS_SERVICE_DOMAIN,
          apiKey: MICROCMS_API_KEY,
        });
        const imageDataFromMicroCMS = await microCMSClient.get({
          endpoint: "images-in-articles",
          queries: { fields: "id,title,thumbnail,images" },
        });
        const path = new URL(
          `../../generated/${DATA_FILE_NAME}`,
          import.meta.url
        );
        const contents = MicroCMSImagesDataSchema.parse(
          imageDataFromMicroCMS["contents"]
        );
        const resultContents: ImagesStorageSchema = {};
        contents.forEach((content) => {
          resultContents[content.title] = {
            thumbnail: content.thumbnail,
            images: Object.fromEntries(
              content.images.map((image) => [image.name, image.image])
            ),
          };
        });

        fs.writeFileSync(path, JSON.stringify(resultContents));
        console.log("[load-microcms-image] fetch and dump finished.");
      },
      "astro:build:setup": () => {
        consoleLogUsingPackageName("copying data file.");
        fs.mkdirSync("dist/generated", { recursive: true });
        fs.copyFileSync(
          `src/generated/${DATA_FILE_NAME}`,
          `dist/generated/${DATA_FILE_NAME}`
        );
      },
    },
  };
}
