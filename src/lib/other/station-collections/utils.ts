/**
 * 路線の見出しに付与するidを作る
 */
export const createLineSlug = (companyId: string, lineId: string) => {
  return companyId.startsWith("JR") ? `${companyId}-${lineId}` : lineId;
};
