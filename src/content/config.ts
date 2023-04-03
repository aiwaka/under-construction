import { defineCollection } from "astro:content";
import { BlogArticleSchema } from "@lib/schema";

// ブログコレクション用スキーマ定義
const blogCollection = defineCollection({ schema: BlogArticleSchema });

export const collections = {
  blog: blogCollection,
};
