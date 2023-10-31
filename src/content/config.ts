import { defineCollection } from "astro:content";

import {
  CollectionBlogZodSchema,
  CollectionStationZodSchema,
  CollectionTravelRouteZodSchema,
} from "@lib/schema";

// ブログコレクション用スキーマ定義
const blogCollection = defineCollection({
  // type: "content",
  schema: CollectionBlogZodSchema,
});

// 駅コレクション用データスキーマ
const stationcCollection = defineCollection({
  type: "content",
  schema: CollectionStationZodSchema,
});

// 旅行ルートコレクション用データスキーマ
const travelRouteCollection = defineCollection({
  type: "data",
  schema: CollectionTravelRouteZodSchema,
});

export const collections = {
  blog: blogCollection,
  station: stationcCollection,
  travelRoute: travelRouteCollection,
};
