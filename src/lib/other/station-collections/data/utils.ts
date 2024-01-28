import { getCollection } from "astro:content";

import { CompanyData } from "./dataclasses";

/** 全駅のIDと駅名対応マップ */
// const stationDict: Record<string, string> = yaml.parse(
//   fs.readFileSync("src/pages/station-collections/stationDict.yaml", "utf8"),
// );
const stationCollections = await getCollection("station");
export const stationDict = Object.fromEntries(
  stationCollections.map((sta) => [sta.slug, sta.data]),
);

export const createCompanyData = (id: string, name: string, tags: string[]) => {
  return new CompanyData(id, name, stationDict, tags);
};
