import type { RequestHandler } from "@/../.svelte-kit/types/src/routes/api/posts/$types.d";
import { fetchMarkdownArticles } from "$lib/utils";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const allArticles = await fetchMarkdownArticles();

  // 文字列で取得された日付データを日付オブジェクトに変換した上でソート（降順）
  const sortedArticles = allArticles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  // 日付を文字列として保持するjson形式レスポンスを返す
  return json(sortedArticles);
};
