import type { FinalBlogCollectionEntry } from "@lib/schema";

interface RelatedEntry {
  slug: string;
  title: string;
  /** 関連に入れられる基準となったタグ, または'specified' */
  whyRelated: string;
}

/** 共通部分を取得する. */
const intersection = <T>(x: T[], y: T[]) => {
  return [...x].filter((e) => y.includes(e));
};

// TODO: 静的ビルドなのでパフォーマンスに影響はないが, だいぶ冗長なのでコードを見直す
export const createRelated = (
  allEntries: FinalBlogCollectionEntry[],
  targetEntry: FinalBlogCollectionEntry
) => {
  // 以下で関連記事を追加する.
  // 記事のタグごとにリスト化し, タグごとに一つずつ関連記事として取る.
  const relatedSlugList: Omit<RelatedEntry, "title">[] = [];
  targetEntry.data.related.forEach((related) =>
    relatedSlugList.push({ slug: related, whyRelated: "specified" })
  );
  const tags = [...targetEntry.data.tags];
  // タグに対してフィルターした記事情報を保存するオブジェクト
  const filteredDict: { [K: string]: FinalBlogCollectionEntry[] } = {};
  tags.forEach((tag) => (filteredDict[tag] = []));
  // 一度全部のエントリーを見て, タグに重複があるものを辞書オブジェクトに追加する
  for (const tempEntry of allEntries) {
    if (
      tempEntry.slug === targetEntry.slug ||
      relatedSlugList.map((obj) => obj.slug).includes(tempEntry.slug)
    ) {
      continue;
    }
    for (let tempTag of tempEntry.data.tags) {
      if (tags.includes(tempTag)) {
        // spliceで最初に追加することで後でpopで取り出したときの時間順を適切にする
        filteredDict[tempTag].splice(0, 0, tempEntry);
        break;
      }
    }
  }
  // 5個程度になるまで関連記事を追加する.
  while (relatedSlugList.length <= 5) {
    let addedNum = 0;
    // タグを順番に見て一つずつ追加
    for (const tag of tags) {
      const popped = filteredDict[tag].pop();
      if (popped) {
        relatedSlugList.push({ slug: popped.slug, whyRelated: tag });
        addedNum += 1;
      }
    }
    // 追加されることがないなら足りなくても終了
    if (addedNum === 0) break;
  }
  // 得たslugのリストからエントリーを得て必要な形の配列に変換
  const related = relatedSlugList.slice(0, 5).map(({ slug, whyRelated }) => {
    const entry = allEntries.find((entry) => entry.slug === slug);
    if (entry === undefined) {
      throw new Error(`slug '${slug}' is not defined`);
    }
    return {
      slug: entry.slug,
      title: entry.data.title,
      whyRelated,
    } satisfies RelatedEntry;
  });
  return related;
};
