import type { BlogImageProps } from "@lib/contents/blog/image";
import { dateText } from "@lib/utils";
import { getLocalStationCollectionsData } from "./getData";

const stationData = getLocalStationCollectionsData();

/**
 * 駅画像データの列をブログと同様の画像形式に変換する
 */
export const toBlogImageList = (
  images: (typeof stationData)[string]["images"],
  filter: (typeof stationData)[string]["images"][number]["type"][number],
): Required<BlogImageProps>[] => {
  return images
    .filter((img) => img.type.includes(filter))
    .map((img, i) => {
      const photoDateText = img.date ? dateText(new Date(img.date)) : "不明";
      return {
        src: img.image.url,
        width: img.image.width,
        height: img.image.height,
        alt: `駅舎の画像${i + 1}`,
        caption:
          `${photoDateText}撮影` + (img.comment ? "：" + img.comment : ""),
      };
    });
};
