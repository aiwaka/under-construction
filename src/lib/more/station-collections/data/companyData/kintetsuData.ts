import { createCompanyData } from "../utils";

const kintetsuData = createCompanyData("kintetsu", "近畿日本鉄道", [
  "major-private",
  "private",
]);

kintetsuData.addLineData(
  "osaka",
  ["近鉄大阪線", "大阪線"],
  [
    "osaka-uehommachi",
    "tsuruhashi",
    "fuse",
    "yamato-takada",
    "yamato-yagi",
    "ise-nakagawa",
  ],
);
kintetsuData.addLineData(
  "kashihara",
  ["近鉄橿原線", "橿原線"],
  [
    "yamato-saidaiji",
    "kintetsu-koriyama",
    "tawaramoto",
    "ninokuchi",
    "yamato-yagi",
    "kashiharajingumae",
  ],
);
kintetsuData.addLineData(
  "kintetsu-kyoto",
  ["近鉄京都線", "京都線"],
  [
    "kyoto",
    "jujo--kintetsu",
    "kintetsu-tambabashi",
    "shin-hosono",
    "takanohara",
    "yamato-saidaiji",
  ],
);
kintetsuData.addLineData(
  "nagano",
  ["近鉄長野線", "長野線"],
  ["furuichi", "kawachi-nagano"],
);
kintetsuData.addLineData(
  "kintetsu-nara",
  ["近鉄奈良線", "奈良線"],
  [
    "osaka-namba",
    "kintetsu-nippombashi",
    "tsuruhashi",
    "fuse",
    "ishikiri",
    "ikoma",
    "gakuenmae",
    "yamato-saidaiji",
    "kintetsu-nara",
  ],
);
kintetsuData.addLineData(
  "yoshino",
  ["近鉄吉野線", "吉野線"],
  ["kashiharajingumae", "yoshino"],
);

export default kintetsuData;
