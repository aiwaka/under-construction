import fs from "node:fs";
import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import { createClient } from "microcms-js-sdk";
import {
  MicroCMSBlogImagesDataZod,
  type ImagesStorageSchema,
} from "../../lib/schema/blog/image";

const PKG_NAME = "load-microcms-image";

/** このインテグレーションのオプション */
interface LoadMicroCMSImageOptions {
  /** 画像データのCMSからの取得をスキップするフラグ（デフォルト：`false`） */
  skip?: boolean;
  /** 画像データ取得時エラーが出ても続行可能かどうか.
   * devモードのみ有効で, buildモードなら強制的に`false`になる.（デフォルト：`false`）
   */
  ignoreNoData?: boolean;
}

const DATA_FILE_NAME: string = "images-data.json";
/** 開発モード時にデータを取得できなかったが存在している状況を表す一つの単語 */
const DATA_ALREADY_EXISTS_FLAG = "alreadyExists" as const satisfies string;

export default function loadMicroCMSImageData(
  options: LoadMicroCMSImageOptions = {},
): AstroIntegration {
  const { skip = false, ignoreNoData: _ignore = false } = options;
  // devモードかつオプションがtrueのときに無視できる.
  const ignoreNoData = import.meta.env.DEV && _ignore;
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": async ({ command, isRestart, logger }) => {
        if (skip) {
          logger.info("fetch skipped.");
          // consoleLogUsingPackageName("fetch skipped.");
          return;
        }
        if (isRestart) {
          logger.info("fetch skipped when restarting.");
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

          type MicroCMSBlogImagesDataSchema = z.infer<
            typeof MicroCMSBlogImagesDataZod
          >;
          // 取得エラーの場合, 開発モードかつデータファイルが既にあれば続行する. なければ終了させる.
          const getImagesDataFromMicroCMS = async (): Promise<
            typeof DATA_ALREADY_EXISTS_FLAG | MicroCMSBlogImagesDataSchema[]
          > => {
            const microCMSClient = createClient({
              serviceDomain: MICROCMS_SERVICE_DOMAIN,
              apiKey: MICROCMS_API_KEY,
            });
            try {
              // コンテンツが増えると一度で取得しきれないため, 逐次取得する.
              // const dataFromMicroCMS: MicroCMSBlogImagesDataSchema[] = [];
              // const NUMBER_LIMIT = 10 as const satisfies number;
              // // totalCountは最初大きい数字としておき, レスポンスから得られる総数で更新する。
              // let offset = 0;
              // let totalCount = 10000000;
              // while (offset < totalCount) {
              //   const partialResponse = await microCMSClient.get<
              //     MicroCMSListResponse<MicroCMSBlogImagesDataSchema>
              //   >({
              //     endpoint: "images-in-articles",
              //     queries: {
              //       fields: "id,thumbnail,images",
              //       limit: NUMBER_LIMIT,
              //       offset,
              //     },
              //   });
              //   dataFromMicroCMS.push(...partialResponse.contents);
              //   totalCount = partialResponse.totalCount;
              //   offset += NUMBER_LIMIT;
              // }
              const dataFromMicroCMS =
                await microCMSClient.getAllContents<MicroCMSBlogImagesDataSchema>(
                  {
                    endpoint: "images-in-articles",
                    queries: {
                      fields: "id,thumbnail,images",
                    },
                  },
                );
              return dataFromMicroCMS;
            } catch (e) {
              logger.error("data fetch failed...");
              if (import.meta.env.DEV && fs.existsSync(dataPath)) {
                return DATA_ALREADY_EXISTS_FLAG;
              } else {
                throw e;
              }
            }
          };
          logger.info("attempt to fetch data from microCMS.");
          const imageDataFromMicroCMS = await getImagesDataFromMicroCMS();
          if (imageDataFromMicroCMS === DATA_ALREADY_EXISTS_FLAG) {
            logger.warn(
              "fetch failed, but data file already exists. using it in dev mode.",
            );
            return;
          }

          const contents = MicroCMSBlogImagesDataZod.parse(
            imageDataFromMicroCMS,
          );
          const resultContents: ImagesStorageSchema = {};
          contents.forEach((content) => {
            resultContents[content.id] = {
              thumbnail: content.thumbnail,
              images: Object.fromEntries(
                content.images.map((image) => [image.name, image.image]),
              ),
            };
          });

          const stringified = JSON.stringify(resultContents);
          fs.writeFileSync(dataPath, stringified);
          const byteLength = Buffer.byteLength(stringified);
          logger.info(
            `fetch and dump finished. (${
              Math.round(byteLength / 10.24) / 100
            } KiB)`,
          );
        } catch (e) {
          if (ignoreNoData) {
            console.error(e);
            logger.warn(
              "An error occurs while loading image-data, but ignore option is enabled.",
            );
          } else {
            throw e;
          }
        }
      },
      "astro:build:setup": ({ logger }) => {
        logger.info("copying data file.");
        fs.mkdirSync("dist/generated", { recursive: true });
        fs.copyFileSync(
          `src/generated/${DATA_FILE_NAME}`,
          `dist/generated/${DATA_FILE_NAME}`,
        );
      },
    },
  };
}
