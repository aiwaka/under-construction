import { defineCollection } from "astro:content";
import { CollectionBlogSchema } from "@lib/schema";

// ブログコレクション用スキーマ定義
const blogCollection = defineCollection({
  // type: "content",
  schema: CollectionBlogSchema,
});

export const collections = {
  blog: blogCollection,
};
