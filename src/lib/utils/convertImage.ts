import fs from "fs";
import { pathToFileURL } from "node:url";
import path from "path";
import sharp from "sharp";

/**
 * 指定したパス（プロジェクトルートからの相対パス）の画像を指定したフォーマットに変換する。
 * @param filePath 変換したいファイルのパス
 * @param format 変換先のフォーマット. デフォルトは"webp"
 */
export const convertImage = async (filePath: string, format = "webp") => {
  if (!fs.existsSync(filePath)) {
    throw Error("指定されたパスが存在しません。");
  }
  const dirName = path.dirname(filePath);
  const extension = path.extname(filePath);
  const filename = path.basename(filePath, extension);
  const outputPath = `${dirName}/${filename}.webp`;
  await sharp(filePath).webp().toFile(outputPath);
  return `${import.meta.env.BASE_URL}assets/preloaded/${filename}.webp`;
};
