const getFilenameFromPath = (path: string): string | null => {
  const matched = path.match(".+/(.+?).[a-z]+([?#;].*)?$");
  return matched ? matched[1] : null;
};

/**
 * 日付をこのサイトで用いる書式に変換する
 */
const dateText = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * 1ページあたりの記事数
 */
const POST_PER_PAGE = 9 as const satisfies number;

export { getFilenameFromPath, dateText, POST_PER_PAGE };
