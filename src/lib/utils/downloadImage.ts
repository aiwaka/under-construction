import fs from "fs";
import path from "path";
import { PRELOAD_DIR } from "src/integrations/download-remote-images";

/**
 * 指定したURLのファイルをPRELOAD_DIR（`public`以下）にダウンロードする.
 * 拡張子はURLから自動で判別される.
 * @param filename 保存するファイル名を指定する. 拡張子は除く
 * @param url
 */
export const downloadImage = async (filename: string, urlStr: string) => {
  if (!urlStr.startsWith("https://")) {
    throw Error("[downloadImage] url must start with 'https://'.");
  }
  const url = new URL(urlStr);
  // フォーマット指定がされていたら取得
  const format = url.searchParams.get("fm");
  // 拡張子は存在するなら`.`を除いたもの, しないなら空文字列.
  const extension = path.extname(url.pathname).startsWith(".")
    ? path.extname(url.pathname).substring(1)
    : "";
  const preloadPath = `${PRELOAD_DIR}/${filename}.${format ?? extension}`;

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
      `[downloadImage] '${filename}'はすでに存在するためダウンロードをスキップします。`,
    );
    return preloadPath;
  }
};
