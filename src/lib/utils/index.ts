/**
 * 1ページあたりの記事数
 */
export const POST_PER_PAGE = 9 as const satisfies number;

export {
  getFilenameFromPath,
  dateText,
  timeText,
  sortArrayByDateTime,
} from "./misc";
