// import type {
//   MicroCMSDate,
//   MicroCMSImage,
//   MicroCMSQueries,
// } from "microcms-js-sdk";

// /**
//  * microCMSからGETした際に返ってくるJSONを保存する. すべてのプロパティは文字列または数値となる.
//  */
// export class MicroCMSImagesInArticlesRaw implements MicroCMSDate {
//   constructor(
//     public id: string,
//     public title: string,
//     public thumbnail: Required<MicroCMSImage>,
//     public images: MicroCMSCustomImages[],
//     public createdAt: string,
//     public updatedAt: string
//   ) {}
// }

// /** microCMSから記事一覧データを取得する. */
// const getBlogResponseFromMicroCMS = async (
//   queries?: MicroCMSQueries
// ): Promise<MicroCMSResponse> => {
//   const { contents: rawContents, ...restRawData } =
//     await client.get<MicroCMSResponseRaw>({
//       endpoint: "images-in-articles",
//       queries,
//     });
//   const contents: MicroCMSImagesInArticles[] = rawContents.map(
//     (raw) => new MicroCMSImagesInArticles(raw)
//   );
//   const response: MicroCMSResponse = {
//     contents,
//     ...restRawData,
//   };
//   return response;
// };

// export { getBlogResponseFromMicroCMS };
