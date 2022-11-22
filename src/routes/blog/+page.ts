import { base } from "$app/paths";
import { ArticleAttribute, ArticleAttributeJson } from "$lib/articles";
import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/$types.d";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(`${base}/api/articles`);
  const attributeJsonList: ArticleAttributeJson[] = await response.json();
  const attributeList = attributeJsonList.map(ArticleAttribute.fromJson);

  return {
    post: attributeList
  };
};
