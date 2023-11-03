import { z, reference } from "astro:content";

export enum TravelogueThumbFormatEnum {
  png = "png",
  jpg = "jpg",
}
const TravelogueThumbFormatZodSchema = z.nativeEnum(TravelogueThumbFormatEnum);

const TravelogueThumbZodSchema = z.union([
  z.object({
    type: z.literal("local"),
    filename: z.string(),
    format: TravelogueThumbFormatZodSchema,
  }),
  z.object({
    type: z.literal("remote"),
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    type: z.literal("fromPost"),
    id: z.string(),
  }),
]);

export type TravelogueThumbSchema = z.infer<typeof TravelogueThumbZodSchema>;

export const CollectionTravelogueZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: TravelogueThumbZodSchema,
  // TODO: これらはpostsから自動で算出できるのが望ましい. blogのdateの仕様を旅行記に限り変更する.
  startDate: z.date(),
  endDate: z.date(),
  posts: reference("blog").array(),
  routes: reference("travelRoute"),
});

/**
 * 旅行記のfrontmatterのスキーマを表す型.
 * Astroによる型生成後に得られる`CollectionEntry<"blog">["data"]`と同等.
 */
export type CollectionTravelogueSchema = z.infer<
  typeof CollectionTravelogueZodSchema
>;
