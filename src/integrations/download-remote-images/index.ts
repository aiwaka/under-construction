/**
 * リモート画像のダウンロードに関するインテグレーション
 */

import type { AstroIntegration } from "astro";
import fs from "fs";

const PKG_NAME = "download-remote-images";

const consoleLogUsingPackageName = (...args: string[]) => {
  console.log(`[${PKG_NAME}] `, ...args);
};

/** このインテグレーションのオプション */
interface DownloadRemoteImagesOptions {}

/** 画像をビルド時にダウンロードするディレクトリ. `public/`で必ず始まることとする. */
export const PRELOAD_DIR: string = "public/remoteImages" as const;

const DIST_OUTPUT_DIR: string = PRELOAD_DIR.replace("public/", "dist/");

export default function downloadRemoteImages(
  options: DownloadRemoteImagesOptions = {},
): AstroIntegration {
  return {
    name: PKG_NAME,
    hooks: {
      // ビルド後に`dist`から変換前の元画像を消去する。
      "astro:build:done": async ({}) => {
        fs.mkdirSync(DIST_OUTPUT_DIR, { recursive: true });
        const downloadedFiles = await fs.readdirSync(PRELOAD_DIR);
        await Promise.all(
          downloadedFiles.map(async (file) =>
            fs.copyFileSync(
              `${PRELOAD_DIR}/${file}`,
              `${DIST_OUTPUT_DIR}/${file}`,
            ),
          ),
        );
        // let files = fs.readdirSync(DIST_OUTPUT_DIR, "utf8");
        // let filteredFiles = files.filter((file) => {
        //   return (
        //     fs.statSync(`${DIST_OUTPUT_DIR}/${file}`).isFile() &&
        //     /.*\.(png|jpg|jpeg)$/.test(file)
        //   );
        // });
        // consoleLogUsingPackageName("test");
        // filteredFiles.forEach((file) => {
        //   // fs.unlinkSync(`${DIST_OUTPUT_DIR}/${file}`);
        //   consoleLogUsingPackageName(`${DIST_OUTPUT_DIR}/${file}`);
        // });
      },
    },
  };
}
