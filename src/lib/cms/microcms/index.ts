import {
  createClient,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from "microcms-js-sdk";

import type { ImageInArticle } from "@lib/blog/types";

/** microCMSに接続するためのクライアントオブジェクト */
const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

/**
 * 画像カスタムフィールド.
 */
export interface MicroCMSCustomImages {
  fieldId: string;
  name: string;
  image: Required<MicroCMSImage>;
  alt: string;
  caption?: string;
}

/**
 * microCMSからGETした際に返ってくるJSONを保存する. すべてのプロパティは文字列または数値となる.
 */
export class MicroCMSImagesInArticlesRaw implements MicroCMSDate {
  constructor(
    public id: string,
    public title: string,
    public thumbnail: Required<MicroCMSImage>,
    public images: MicroCMSCustomImages[],
    public createdAt: string,
    public updatedAt: string
  ) {}
}
/**
 * microCMSから取得したブログ記事データ.
 * こうするとどの段階でスキーマに変更が起きてもフロントエンド部分は変更しないで済む.
 * Dateへの変換は最終的なオブジェクトへの変換時に行う.
 */
export class MicroCMSImagesInArticles {
  public id: string;
  public title: string;
  public thumbnail: Required<MicroCMSImage>;
  public images: { [name: string]: ImageInArticle };
  public createdAt: string;
  public updatedAt: string;

  constructor(raw: MicroCMSImagesInArticlesRaw) {
    this.images = {};
    raw.images.forEach((data) => {
      const { name, image, alt, caption } = data;
      this.images[name] = { ...image, alt, caption };
    });
    this.id = raw.id;
    this.title = raw.title;
    this.thumbnail = raw.thumbnail;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
  }
}
export class MicroCMSResponseRaw {
  constructor(
    public totalCount: number,
    public offset: number,
    public limit: number,
    public contents: MicroCMSImagesInArticlesRaw[]
  ) {}
}
export class MicroCMSResponse implements Omit<MicroCMSResponseRaw, "contents"> {
  public limit: number;
  public offset: number;
  public totalCount: number;
  constructor(
    public contents: MicroCMSImagesInArticles[],
    rest: Omit<MicroCMSResponseRaw, "contents">
  ) {
    this.limit = rest.limit;
    this.offset = rest.offset;
    this.totalCount = rest.totalCount;
  }
}

/** microCMSから記事一覧データを取得する. */
const getBlogResponseFromMicroCMS = async (
  queries?: MicroCMSQueries
): Promise<MicroCMSResponse> => {
  const { contents: rawContents, ...restRawData } =
    await client.get<MicroCMSResponseRaw>({
      endpoint: "images-in-articles",
      queries,
    });
  const contents: MicroCMSImagesInArticles[] = rawContents.map(
    (raw) => new MicroCMSImagesInArticles(raw)
  );
  const response: MicroCMSResponse = {
    contents,
    ...restRawData,
  };
  return response;
};

export { getBlogResponseFromMicroCMS };
