import { z, reference } from "astro:content";

export enum TravelogueThumbFormatEnum {
  png = "png",
  jpg = "jpg",
}
const TravelogueThumbFormatZodSchema = z.nativeEnum(TravelogueThumbFormatEnum);

export const CollectionTravelogueZodSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    // TODO: このサムネイル情報は使っていない. ブログのサムネイルから持ってこられると嬉しいのでなんとかする. その後はプロパティを削除する.
    thumbnail: z.string(),
    thumbnailFormat: TravelogueThumbFormatZodSchema.nullable().default(null),
    // TODO: これらはpostsから自動で算出できるのが望ましい. blogのdateの仕様を旅行記に限り変更する.
    startDate: z.date(),
    endDate: z.date(),
    posts: reference("blog").array(),
    routes: reference("travelRoute"),
  })
  .refine(
    ({ thumbnail, thumbnailFormat }) => {
      return thumbnail === "remote" || thumbnailFormat !== null;
    },
    {
      path: ["thumbnailFormat"],
      message: "`thumbnail`が`remote`でない場合`thumbnailFormat`は必須です。",
    },
  );

/**
 * 旅行記のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"blog">["data"]`と同等.
 */
export type CollectionTravelogueSchema = z.infer<
  typeof CollectionTravelogueZodSchema
>;
