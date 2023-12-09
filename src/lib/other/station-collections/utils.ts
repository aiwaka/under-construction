/**
 * 路線の見出しに付与するidを作る
 */
export const createLineSlug = (companyId: string, lineId: string) => {
  return companyId.startsWith("JR") ? `${companyId}-${lineId}` : lineId;
};

export const createHrefToLineSlug = (companyId: string, lineId: string) => {
  const slug = createLineSlug(companyId, lineId);
  return `${import.meta.env.BASE_URL}station-collections#${slug}`;
};
