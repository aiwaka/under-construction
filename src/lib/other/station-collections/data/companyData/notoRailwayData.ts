import { createCompanyData } from "../utils";

const notoRailwayData = createCompanyData("noto-railway", "のと鉄道", [
  "semi-public",
]);

notoRailwayData.addLineData("nanao", "七尾線", [
  "nanao",
  "wakura-onsen",
  "anamizu",
]);

export default notoRailwayData;
