import fs from "fs";
import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

import {
  MicroCMSStationCollectionsSchema,
  type StationCollectionsSchema,
} from "./station-collections";

export type { StationCollectionsSchema };

const PKG_NAME = "load-station-collections";

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
      "astro:config:setup": async ({ command, isRestart }) => {
        if (skip) {
          consoleLogUsingPackageName("fetch skipped.");
          return;
        }
        if (isRestart) {
          consoleLogUsingPackageName("fetch skipped when restarting.");
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

          type MicroCMSStationCollectionsSchemaType = z.infer<
            typeof MicroCMSStationCollectionsSchema
          >;
          // 取得エラーの場合, 開発モードかつデータファイルが既にあれば続行する. なければ終了させる.
          const getStationCollectionsFromMicroCMS = async (): Promise<
            | typeof DATA_ALREADY_EXISTS_FLAG
            | MicroCMSStationCollectionsSchemaType[]
          > => {
            const microCMSClient = createClient({
              serviceDomain: MICROCMS_SERVICE_DOMAIN,
              apiKey: MICROCMS_API_KEY,
            });
            try {
              // コンテンツが増えると一度で取得しきれないため, 逐次取得する.
              const dataFromMicroCMS: MicroCMSStationCollectionsSchemaType[] =
                [];
              const NUMBER_LIMIT = 10 as const satisfies number;
              // totalCountは最初大きい数字としておき, レスポンスから得られる総数で更新する。
              let offset = 0;
              let totalCount = 10000000;
              while (offset < totalCount) {
                const partialResponse = await microCMSClient.get<
                  MicroCMSListResponse<MicroCMSStationCollectionsSchemaType>
                >({
                  endpoint: "station-collections",
                  queries: {
                    fields:
                      "id,name,lineNames,images,firstVisitDate,comment,updatedAt",
                    limit: NUMBER_LIMIT,
                    offset,
                  },
                });
                dataFromMicroCMS.push(...partialResponse.contents);
                totalCount = partialResponse.totalCount;
                offset += NUMBER_LIMIT;
              }

              return dataFromMicroCMS;
            } catch (e) {
              consoleLogUsingPackageName("data fetch failed...");
              if (import.meta.env.DEV && fs.existsSync(dataPath)) {
                return DATA_ALREADY_EXISTS_FLAG;
              } else {
                throw e;
              }
            }
          };
          consoleLogUsingPackageName("attempt to fetch data from microCMS.");
          const staCollectionsFromMicroCMS =
            await getStationCollectionsFromMicroCMS();
          if (staCollectionsFromMicroCMS === DATA_ALREADY_EXISTS_FLAG) {
            consoleLogUsingPackageName(
              "fetch failed, but data file already exists. using it in dev mode.",
            );
            return;
          }

          const contents = MicroCMSStationCollectionsSchema.parse(
            staCollectionsFromMicroCMS,
          );
          const resultContents: StationCollectionsSchema = {};
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

          fs.writeFileSync(dataPath, JSON.stringify(resultContents));
          consoleLogUsingPackageName("fetch and dump finished.");
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
