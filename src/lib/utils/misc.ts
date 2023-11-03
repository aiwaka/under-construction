import { DateTime, Zone } from "luxon";

export const getFilenameFromPath = (path: string): string | null => {
  const matched = path.match(".+/(.+?).[a-z]+([?#;].*)?$");
  return matched ? matched[1] : null;
};

/**
 * 日付をこのサイトで用いる書式に変換する. Dateはデフォルトで標準時として解釈されるが`zone`で修正できる.
 * Zod経由でパースしたDateオブジェクトは指定した時刻をUTCで表しており,
 * microCMSは指定した日本時刻に対応するUTCの文字列を返す（9時間巻き戻っている）ため,
 * 前者ではUTC, 後者ではAsia/Tokyoを指定するとよい.
 * @param zone タイムゾーン指定. デフォルトは`"UTC"`. 日本時刻にする場合は`"Asia/Tokyo"`を指定する.
 */
export const dateText = (
  date: Date,
  zone: string | Zone | undefined = "UTC",
): string => {
  const luxonDate = DateTime.fromJSDate(date, { zone });
  return luxonDate.toFormat("yyyy-L-d");
};

/**
 * このメソッドは引数で渡した配列自体を操作し変更することに注意.
 * Date型の`updatedAt`フィールドを持つオブジェクトの列をこれにより降順に並び替える.
 * @param arr
 */
export const sortArrayByDate = <T extends { updatedAt: Date }>(arr: T[]) => {
  arr.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
};
