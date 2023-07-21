import type { MicroCMSObjectContent } from "microcms-js-sdk";
import type { ImagesInArticle } from "@lib/contents/images";
import type { ContentsImage, ToEntryObject } from "@lib/types";
import type { FieldsExcludeMethod } from "@lib/types";
import type { MicroCMSImageComplete } from "@lib/contents/types";

/**
 * microCMS上の画像カスタムフィールド.
 */
export interface MicroCMSCustomImages {
  fieldId: string;
  name: string;
  image: MicroCMSImageComplete;
  alt: string;
  caption?: string;
}

/** 変換メソッドを取り除いたスキーマ */
export type MicroCMSImagesInArticleSchema =
  FieldsExcludeMethod<MicroCMSImagesInArticle>;

/**
 * microCMSから取得した記事内画像データ.
 * Dateへの変換は最終的なオブジェクトへの変換時に行う.
 */
export class MicroCMSImagesInArticle
  implements ToEntryObject<ImagesInArticle>, MicroCMSObjectContent
{
  public id!: string;
  public title!: string;
  public thumbnail!: MicroCMSImageComplete;
  public images!: MicroCMSCustomImages[];
  public createdAt!: string;
  public updatedAt!: string;

  constructor(raw: MicroCMSImagesInArticleSchema) {
    console.log(raw);
    Object.assign(this, raw);
  }

  public toEntryObject() {
    const {
      id,
      title,
      createdAt,
      updatedAt,
      images: rawImages,
      thumbnail,
    } = this;
    const images: { [name: string]: ContentsImage } = {};
    rawImages.forEach((data) => {
      const { name, image, alt, caption } = data;
      images[name] = { ...image, alt, caption };
    });
    return {
      id,
      title,
      thumbnail: { ...thumbnail, alt: "thumbnail" },
      images,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      isEntrySchema: null,
    } satisfies ImagesInArticle;
  }
}
