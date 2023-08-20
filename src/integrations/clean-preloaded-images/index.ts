/**
 * プロジェクトの`public`ディレクトリ内からすべての画像ファイルを, 生成された`dist`内の`assets/preloaded`から`.webp`でない画像ファイルを消去する.
 */

import type { AstroIntegration } from "astro";
import fs from "fs";

const PKG_NAME = "clean-preloaded-images";

const consoleLogUsingPackageName = (...args: string[]) => {
  console.log(`[${PKG_NAME}] `, ...args);
};

/** このインテグレーションのオプション */
interface CleanPreloadedImagesOptions {}

export const PRELOAD_DIR: string = "public/assets/preloaded" as const;

export default function preload(
  options: CleanPreloadedImagesOptions = {},
): AstroIntegration {
  return {
    name: PKG_NAME,
    hooks: {
      "astro:build:done": async ({}) => {
        // TODO: 説明に合うように実装する
        let files = fs.readdirSync(PRELOAD_DIR, "utf8");
        let filteredFiles = files.filter((file) => {
          return (
            fs.statSync(`${PRELOAD_DIR}/${file}`).isFile() &&
            /.*\.(png|jpg|jpeg)$/.test(file)
          );
        });
        filteredFiles.forEach((file) => {
          fs.unlinkSync(`${PRELOAD_DIR}/${file}`);
        });
      },
    },
  };
}
