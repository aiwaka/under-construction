import fs from "node:fs";

import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import { createClient } from "microcms-js-sdk";

import {
  MicroCMSStationCollectionZod,
  type DownloadedStationCollection,
} from "../../lib/schema/station/image";

const PKG_NAME = "load-station-collections";

/** このインテグレーションのオプション */
interface LoadMicroCMSImageOptions {
  /** 画像データのCMSからの取得をスキップするフラグ（デフォルト：`false`） */
  skip?: boolean;
  /** 画像データ取得時エラーが出ても続行可能かどうか.
   * devモードのみ有効で, buildモードなら強制的に`false`になる.（デフォルト：`false`）
   */
  ignoreNoData?: boolean;
}

const DATA_FILE_NAME = "station-collections.json" as const satisfies string;
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

          type MicroCMSStationCollectionsSchema = z.infer<
            typeof MicroCMSStationCollectionZod
          >;
          // 取得エラーの場合, 開発モードかつデータファイルが既にあれば続行する. なければ終了させる.
          const getStationCollectionsFromMicroCMS = async (): Promise<
            typeof DATA_ALREADY_EXISTS_FLAG | MicroCMSStationCollectionsSchema[]
          > => {
            const microCMSClient = createClient({
              serviceDomain: MICROCMS_SERVICE_DOMAIN,
              apiKey: MICROCMS_API_KEY,
            });
            try {
              const dataFromMicroCMS =
                await microCMSClient.getAllContents<MicroCMSStationCollectionsSchema>(
                  {
                    endpoint: "station-collections",
                    queries: {
                      fields: "id,images,createdAt,updatedAt",
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
          const staCollectionsFromMicroCMS =
            await getStationCollectionsFromMicroCMS();
          if (staCollectionsFromMicroCMS === DATA_ALREADY_EXISTS_FLAG) {
            logger.warn(
              "fetch failed, but data file already exists. using it in dev mode.",
            );
            return;
          }

          const contents = MicroCMSStationCollectionZod.parse(
            staCollectionsFromMicroCMS,
          );
          const resultContents: DownloadedStationCollection = {};
          contents.forEach((content) => {
            // imagesから`fieldId`を除く
            const { images, ...rest } = content;
            const literalRemovedImages = images.map((img) => {
              const { fieldId, ...temp } = img;
              return temp;
            });
            resultContents[content.id] = {
              images: literalRemovedImages,
              ...rest,
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
