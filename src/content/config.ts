import { defineCollection } from "astro:content";

import {
  CollectionBlogZodSchema,
  CollectionStationZodSchema,
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

export const collections = {
  blog: blogCollection,
  station: stationcCollection,
};
