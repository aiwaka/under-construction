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

          // 取得エラーの場合, 開発モードかつデータファイルが既にあれば続行する. なければ終了させる.
          const getStationCollectionsFromMicroCMS = async () => {
            const microCMSClient = createClient({
              serviceDomain: MICROCMS_SERVICE_DOMAIN,
              apiKey: MICROCMS_API_KEY,
            });
            try {
              const dataFromMicroCMS = await microCMSClient.get<
                MicroCMSListResponse<
                  z.infer<typeof MicroCMSStationCollectionsSchema>
                >
              >({
                endpoint: "station-collections",
                queries: {
                  fields:
                    "id,name,lineNames,images,firstVisitDate,comment,updatedAt",
                },
              });
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

          // TODO: コンテンツが増えると一度で取得しきれないため, 逐次取得する処理が必要.
          const contents = MicroCMSStationCollectionsSchema.parse(
            staCollectionsFromMicroCMS["contents"],
          );
          const resultContents: StationCollectionsSchema = contents;

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
