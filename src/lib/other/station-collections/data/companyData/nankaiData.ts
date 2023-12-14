import { createCompanyData } from "../utils";

const nankaiData = createCompanyData("nankai", "南海電気鉄道", [
  "major-private",
  "private",
]);

nankaiData.addLineData("nankai-main", "南海本線", [
  "namba",
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
    "namba",
    "imamiya-ebisu",
    "shin-imamiya",
    "tengachaya",
    "kishinosato-tamade",
    "nakamozu",
    "kawachi-nagano",
    "hashimoto",
    "kii-kamiya",
    "gokurakubashi",
  ],
);
nankaiData.addLineData(
  "shiomibashi",
  ["南海高野線（汐見橋線）", "高野線"],
  ["shiomibashi", "kishinosato-tamade"],
);

export default nankaiData;
