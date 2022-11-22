import { base } from "$app/paths";
import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/tag/[tag]/$types.d";
import { ArticleAttribute, ArticleAttributeJson } from "$lib/articles";

export const load: PageLoad = async ({ fetch, params: { tag } }) => {
  const response = await fetch(`${base}/api/articles`);
  const attributeJsonList: ArticleAttributeJson[] = await response.json();
  // jsonを日付つきのデータに変換し, attrのtagに指定されたものを含むものを抽出
  const attributeList = attributeJsonList
    .map(ArticleAttribute.fromJson)
    .filter((attr) => attr.tags.includes(tag));

  return {
    tag,
    post: attributeList
  };
};
