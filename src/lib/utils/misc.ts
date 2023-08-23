export const getFilenameFromPath = (path: string): string | null => {
  const matched = path.match(".+/(.+?).[a-z]+([?#;].*)?$");
  return matched ? matched[1] : null;
};

/**
 * 日付をこのサイトで用いる書式に変換する
 */
export const dateText = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * このメソッドは引数で渡した配列自体を操作し変更することに注意.
 * Date型の`updatedAt`フィールドを持つオブジェクトの列をこれにより降順に並び替える.
 * @param arr
 */
export const sortArrayByDate = <T extends { updatedAt: Date }>(arr: T[]) => {
  arr.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
};
