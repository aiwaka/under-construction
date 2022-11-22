import { fetchMarkdownArticles } from "$lib/utils";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const allArticles = await fetchMarkdownArticles();

  const sortedArticles = allArticles.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  return json(sortedArticles);
};
