import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PRELOAD_DIR } from "src/integrations/clean-preloaded-images";

/**
 * 指定したURLのファイルをPRELOAD_DIR（`public`以下）にダウンロードする.
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
      console.log(
        `[downloadImage] '${PRELOAD_DIR}'ディレクトリを作成しました。`,
      );
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
        `[downloadImage]: リモート画像のダウンロードに失敗したため、代わりに'${url}'をそのまま使用します。エラー内容を次に表示します。`,
      );
      console.log(e);
    }
  } else {
    console.log(
      `[downloadImage] '${basename}'はすでに存在するためダウンロードをスキップします。`,
    );
    return preloadPath;
  }
};
