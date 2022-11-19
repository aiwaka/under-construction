import { fetchMarkdownArticles } from "$lib/utils";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const allPosts = await fetchMarkdownArticles();

  const sortedPosts = allPosts.sort((a, b) => {
    return b.meta.date > a.meta.date ? 1 : -1;
  });

  return json(sortedPosts);
};
