import { createCompanyData } from "../utils";

const hankyuData = createCompanyData("hankyu", "阪急電鉄", [
  "major-private",
  "private",
]);

hankyuData.addLineData(
  "hankyu-kobe",
  ["阪急神戸本線", "神戸本線"],
  [
    "osaka-umeda--hankyu",
    "nakatsu--hankyu",
    "juso",
    "nishinomiya-kitaguchi",
    "shukugawa",
    "ashiyagawa",
    "kobe-sannnomiya--hankyu",
  ],
);
hankyuData.addLineData(
  "hankyu-takarazuka",
  ["阪急宝塚本線", "宝塚本線"],
  [
    "osaka-umeda--hankyu",
    "nakatsu--hankyu",
    "juso",
    "ishibashi-handaimae",
    "takarazuka",
  ],
);
hankyuData.addLineData(
  "hankyu-kyoto",
  ["阪急京都本線", "京都本線"],
  [
    "osaka-umeda--hankyu",
    "juso",
    "minamigata",
    "awaji",
    "shojaku",
    "saiin",
    "omiya",
    "karasuma",
    "kyoto-kawaramachi",
  ],
);

export default hankyuData;
