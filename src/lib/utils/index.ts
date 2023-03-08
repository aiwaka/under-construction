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
 * サムネイルファイル名を参照すべきパスに変換する
 * @param filename 拡張子付きファイル名
 */
const thumbnailPath = (filename: string): string => {
  return `/blog/thumb/${filename}`;
};

export { getFilenameFromPath, dateText, thumbnailPath };
