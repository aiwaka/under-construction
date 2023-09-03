// import fs from "fs";
// import path from "path";
// import sharp from "sharp";
// import { PRELOAD_DIR } from "src/integrations/download-remote-images";

// type AllowedOutputFormat = "webp" | "avif";

// /**
//  * 指定したパス（プロジェクトルートからの相対パス）の画像を指定したフォーマットに変換する。
//  * @param filePath 変換したいファイルのパス
//  * @param format 変換先のフォーマット. デフォルトは"webp"
//  */
// export const convertImage = async (
//   filePath: string,
//   format: AllowedOutputFormat = "webp",
// ) => {
//   if (!fs.existsSync(filePath)) {
//     throw Error("指定されたパスが存在しません。");
//   }
//   // `public/...`の`xxx`をsrcとして指定することでファイルをAstroに処理させずに用いることができる.
//   const preloadDirUnderPublic = PRELOAD_DIR.replace("public/", "");
//   if (path.extname(filePath) === "." + format) {
//     console.log("[convertImage] すでに指定された形式になっています。");
//     return `${import.meta.env.BASE_URL}${preloadDirUnderPublic}/${path.basename(
//       filePath,
//     )}`;
//   }
//   const dirName = path.dirname(filePath);
//   const extension = path.extname(filePath);
//   const filename = path.basename(filePath, extension);
//   const outputPath = `${dirName}/${filename}.${format}`;
//   switch (format) {
//     case "webp":
//       await sharp(filePath).webp().toFile(outputPath);
//       break;
//     case "avif":
//       await sharp(filePath).avif().toFile(outputPath);
//       break;
//     default:
//       throw Error("[convertImage] invalid format");
//   }
//   return `${
//     import.meta.env.BASE_URL
//   }${preloadDirUnderPublic}/${filename}.${format}`;
// };
