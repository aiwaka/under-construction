import type { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import type { MicroCMSImagesInArticleSchema } from "./dto";
import { MicroCMSImagesInArticle } from "./dto";
import { microCMSClient } from "../client";

// TODO: zodを用いてバリデーションしても良さそう
/** microCMSからAPIを呼び出してデータを取得し、型を付けて返す. */
export const getMicroCMSImagesInArticleResponse = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<MicroCMSImagesInArticle>> => {
  const { contents: rawContents, ...rest } = await microCMSClient.get<
    MicroCMSListResponse<MicroCMSImagesInArticleSchema>
  >({
    endpoint: "blogs",
    queries,
  });
  // コンテンツオブジェクトは変換メソッドを持ったクラスに変換
  const contents = rawContents.map((raw) => new MicroCMSImagesInArticle(raw));
  return { contents, ...rest };
};

export const getOneMicroCMSImagesInArticleContent = async (
  id: string,
  queries?: MicroCMSQueries,
) => {
  const rawContents = await microCMSClient.get<MicroCMSImagesInArticleSchema>({
    endpoint: "blogs",
    contentId: id,
    queries,
  });
  // コンテンツオブジェクトは変換メソッドを持ったクラスに変換
  const contents = new MicroCMSImagesInArticle(rawContents);
  return contents;
};
