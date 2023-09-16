import { defineCollection } from "astro:content";

import { CollectionBlogSchema, CollectionStationSchema } from "@lib/schema";

// ブログコレクション用スキーマ定義
const blogCollection = defineCollection({
  // type: "content",
  schema: CollectionBlogSchema,
});

// 駅コレクション用データスキーマ
const stationcCollection = defineCollection({
  type: "content",
  schema: CollectionStationSchema,
});

export const collections = {
  blog: blogCollection,
  station: stationcCollection,
};
