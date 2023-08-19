import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PRELOAD_DIR = "public/assets/preloaded";

/**
 * 指定したURLのファイルを`public/assets/preloaded`にダウンロードする.
 * @param url
 */
export const downloadImage = async (url: string) => {
  if (!url.startsWith("https://")) {
    throw Error("[downloadImage] url must start with 'https://'.");
  }
  // urlからファイル名を抜き出す
  const basename = path.basename(url);
  const preloadPath = `${PRELOAD_DIR}/${basename}`;

  // ファイルパスが存在する場合スキップ
  if (!fs.existsSync(preloadPath)) {
    if (!fs.existsSync(PRELOAD_DIR)) {
      // ディレクトリが存在しない場合作成
      fs.mkdirSync(PRELOAD_DIR, { recursive: true });
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      fs.writeFileSync(preloadPath, new Uint8Array(await blob.arrayBuffer()));
      console.log(
        `[downloadImage]: ${preloadPath}にファイルをダウンロードしました。`,
      );
      return preloadPath;
    } catch (e) {
      console.log(
        `[downloadImage]: リモート画像のダウンロードに失敗したため、代わりに'${url}'をそのまま使用します。`,
      );
      console.log(e);
    }
  } else {
    console.log(`[downloadImage] skip '${basename}' download`);
    return preloadPath;
  }
};
