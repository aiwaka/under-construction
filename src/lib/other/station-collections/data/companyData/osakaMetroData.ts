import { createCompanyData } from "../utils";

const osakaMetroData = createCompanyData("osaka-metro", "大阪メトロ", [
  "private",
  "subway",
]);

osakaMetroData.addLineData(
  "midosuji",
  ["大阪メトロ御堂筋線", "御堂筋線"],
  [
    "esaka",
    "shin-osaka",
    "nishinakajima-minamigata",
    "nakatsu--osaka-metro",
    "umeda",
    "yodoyabashi",
    "hommachi",
    "shinsaibashi",
    "namba--metro",
    "daikokucho",
    "dobutsuen-mae",
    "tennnoji",
    "nagai",
    "nakamozu",
  ],
);
osakaMetroData.addLineData(
  "tanimachi",
  ["大阪メトロ谷町線", "谷町線"],
  [
    "tenjimbashisuji-rokuchome",
    "higashiumeda",
    "temmabashi",
    "tanimachi-kyuchome",
    "tennnoji",
    "abeno",
  ],
);
osakaMetroData.addLineData(
  "yotsubashi",
  ["大阪メトロ四つ橋線", "四つ橋線"],
  ["nishiumeda", "higobashi", "hommachi", "namba--metro", "daikokucho"],
);
osakaMetroData.addLineData(
  "osaka-metro-chuo",
  ["大阪メトロ中央線", "中央線"],
  ["bentencho", "hommachi", "morinomiya", "midoribashi", "takaida", "ikoma"],
);
osakaMetroData.addLineData(
  "sennnichimae",
  ["大阪メトロ千日前線", "千日前線"],
  ["namba--metro", "tanimachi-kyuchome", "tsuruhashi"],
);
osakaMetroData.addLineData(
  "sakaisuji",
  ["大阪メトロ堺筋線", "堺筋線"],
  [
    "awaji",
    "tenjimbashisuji-rokuchome",
    "kitahama",
    "dobutsuen-mae",
    "tengachaya",
  ],
);
osakaMetroData.addLineData(
  "nagahori-tsurumiryokuchi",
  ["大阪メトロ長堀鶴見緑地線", "長堀鶴見緑地線"],
  ["taisho", "shinsaibashi", "morinomiya", "kyobashi"],
);
osakaMetroData.addLineData(
  "imazatosuji",
  ["大阪メトロ今里筋線", "今里筋線"],
  ["shigino", "midoribashi"],
);

export default osakaMetroData;
