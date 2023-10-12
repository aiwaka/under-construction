import { createCompanyData } from "../utils";

const kikudenData = createCompanyData("kikuden", "熊本電気鉄道", ["private"]);

kikudenData.addLineData(
  "kikuchi",
  ["熊本電鉄菊池線", "菊池線"],
  [
    "miyoshi--kumamoto",
    "kuroishi--kumamoto",
    "shin-suya",
    "kitakumamoto",
    "kamikumamoto",
  ],
);
kikudenData.addLineData(
  "fujisaki",
  ["熊本電鉄藤崎線", "藤崎線"],
  ["kitakumamoto", "fujisakigumae"],
);

export default kikudenData;
