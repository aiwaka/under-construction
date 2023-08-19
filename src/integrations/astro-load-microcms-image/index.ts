import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import fs from "fs";
import { MicroCMSListResponse, createClient } from "microcms-js-sdk";

const PKG_NAME = "astro-load-microcms-image";

const consoleLogUsingPackageName = (...args: string[]) => {
  console.log(`[${PKG_NAME}] `, ...args);
};

/** このインテグレーションのオプション */
interface LoadMicroCMSImageOptions {
  /** 画像データのCMSからの取得をスキップするフラグ（デフォルト：`false`） */
  skip?: boolean;
  /** 画像データ取得時エラーが出ても続行可能かどうか.
   * devモードのみ有効で, buildモードなら強制的に`false`になる.（デフォルト：`false`）
   */
  ignoreNoData?: boolean;
}
/** MicroCMSから取得する画像のスキーマ */
const MicroCMSImageSchema = z.object({
  url: z.string().url(),
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

const DATA_FILE_NAME: string = "images-data.json";
/** 開発モード時にデータを取得できなかったが存在している状況を表す一つの単語 */
const DATA_ALREADY_EXISTS_FLAG = "alreadyExists" as const satisfies string;

export default function preload(
  options: LoadMicroCMSImageOptions = {},
): AstroIntegration {
  const { skip = false, ignoreNoData: _ignore = false } = options;
  // devモードかつオプションがtrueのときに無視できる.
  const ignoreNoData = import.meta.env.DEV && _ignore;
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
        try {
          (await import("dotenv")).config();
          const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
          const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;
          if (!(MICROCMS_SERVICE_DOMAIN && MICROCMS_API_KEY)) {
            throw Error(
              "The variables named MICROCMS_XXX_XXX are not defined in `.env`.",
            );
          }
          // データファイルのパス
          const dataPath = new URL(
            `../../generated/${DATA_FILE_NAME}`,
            import.meta.url,
          );

          // 取得エラーの場合, 開発モードかつデータファイルが既にあれば続行する. なければ終了させる.
          const getImagesDataFromMicroCMS = async () => {
            const microCMSClient = createClient({
              serviceDomain: MICROCMS_SERVICE_DOMAIN,
              apiKey: MICROCMS_API_KEY,
            });
            try {
              const imageDataFromMicroCMS = await microCMSClient.get<
                MicroCMSListResponse<z.infer<typeof MicroCMSImagesDataSchema>>
              >({
                endpoint: "images-in-articles",
                queries: { fields: "id,title,thumbnail,images" },
              });
              return imageDataFromMicroCMS;
            } catch (e) {
              consoleLogUsingPackageName("data fetch failed...");
              if (import.meta.env.DEV && fs.existsSync(dataPath)) {
                return DATA_ALREADY_EXISTS_FLAG;
              } else {
                throw e;
              }
            }
          };
          console.log(
            "[load-microcms-image] attempt to fetch data from microCMS.",
          );
          const imageDataFromMicroCMS = await getImagesDataFromMicroCMS();
          if (imageDataFromMicroCMS === DATA_ALREADY_EXISTS_FLAG) {
            console.log(
              "[load-microcms-image] fetch failed, but data file already exists. using it in dev mode.",
            );
            return;
          }

          // TODO: コンテンツが増えると一度で取得しきれないため, 逐次取得する処理が必要.
          const contents = MicroCMSImagesDataSchema.parse(
            imageDataFromMicroCMS["contents"],
          );
          const resultContents: ImagesStorageSchema = {};
          contents.forEach((content) => {
            resultContents[content.title] = {
              thumbnail: content.thumbnail,
              images: Object.fromEntries(
                content.images.map((image) => [image.name, image.image]),
              ),
            };
          });

          fs.writeFileSync(dataPath, JSON.stringify(resultContents));
          console.log("[load-microcms-image] fetch and dump finished.");
        } catch (e) {
          if (ignoreNoData) {
            console.error(e);
            consoleLogUsingPackageName(
              "An error occurs while loading image-data, but ignore option is enabled.",
            );
          } else {
            throw e;
          }
        }
      },
      "astro:build:setup": () => {
        consoleLogUsingPackageName("copying data file.");
        fs.mkdirSync("dist/generated", { recursive: true });
        fs.copyFileSync(
          `src/generated/${DATA_FILE_NAME}`,
          `dist/generated/${DATA_FILE_NAME}`,
        );
      },
    },
  };
}
