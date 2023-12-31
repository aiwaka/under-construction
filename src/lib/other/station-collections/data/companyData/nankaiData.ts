import { createCompanyData } from "../utils";

const nankaiData = createCompanyData("nankai", "南海電気鉄道", [
  "major-private",
  "private",
]);

nankaiData.addLineData("nankai-main", "南海本線", [
  "namba",
  "imamiya-ebisu",
  "shin-imamiya",
  "tengachaya",
  "kishinosato-tamade",
  "hagurazaki",
  "wakayamashi",
  "wakayamako",
]);
nankaiData.addLineData(
  "koya",
  ["南海高野線", "高野線"],
  [
    "shiomibashi",
    "kishinosato-tamade",
    "nakamozu",
    "kawachi-nagano",
    "hashimoto",
    "kii-kamiya",
    "gokurakubashi",
  ],
);

export default nankaiData;
