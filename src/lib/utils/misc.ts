import { DateTime, Zone } from "luxon";

export const getFilenameFromPath = (path: string): string | null => {
  const matched = path.match(".+/(.+?).[a-z]+([?#;].*)?$");
  return matched ? matched[1] : null;
};

/**
 * 日付をこのサイトで用いる書式に変換する. Dateはデフォルトで標準時として解釈されるが`zone`で修正できる.
 * luxonの`DateTime`を渡した場合は`zone`は意味がない.
 * Zod経由でパースしたDateオブジェクトは指定した時刻をUTCで表しており,
 * microCMSは指定した日本時刻に対応するUTCの文字列を返す（9時間巻き戻っている）ため,
 * 前者ではUTC, 後者ではAsia/Tokyoを指定するとよい.
 * @param zone タイムゾーン指定. デフォルトは`"UTC"`. 日本時刻にする場合は`"Asia/Tokyo"`を指定する.
 */
export const dateText = (
  date: Date | DateTime,
  zone: string | Zone | undefined = "UTC",
): string => {
  const luxonDate =
    date instanceof DateTime ? date : DateTime.fromJSDate(date, { zone });
  return luxonDate.toFormat("yyyy-L-d");
};

/**
 * 時刻をこのサイトで用いる書式に変換する. Dateはデフォルトで標準時として解釈されるが`zone`で修正できる.
 * Zod経由でパースしたDateオブジェクトは指定した時刻をUTCで表しており,
 * microCMSは指定した日本時刻に対応するUTCの文字列を返す（9時間巻き戻っている）ため,
 * 前者ではUTC, 後者ではAsia/Tokyoを指定するとよい.
 * @param useSec 秒もテキストに含めるかどうか. デフォルトは`false`.
 * @param zone タイムゾーン指定. デフォルトは`"UTC"`. 日本時刻にする場合は`"Asia/Tokyo"`を指定する.
 */
export const timeText = (
  date: Date,
  useSec: boolean = false,
  zone: string | Zone | undefined = "UTC",
) => {
  const luxonDate = DateTime.fromJSDate(date, { zone });
  const formatStr = "HH:mm" + (useSec ? ":ss" : "");
  return luxonDate.toFormat(formatStr);
};

/**
 * このメソッドは引数で渡した配列自体を操作し変更することに注意.
 * luxonの`DateTime`型である`updatedAt`フィールドを持つオブジェクトの列をこれにより降順に並び替える.
 * @param arr
 */
export const sortArrayByDateTime = <T extends { updatedAt: DateTime }>(
  arr: T[],
) => {
  arr.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
};
