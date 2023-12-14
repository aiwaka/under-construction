import { createCompanyData } from "../utils";

const kintetsuData = createCompanyData("kintetsu", "近畿日本鉄道", [
  "major-private",
  "private",
]);

kintetsuData.addLineData(
  "ikoma",
  ["近鉄生駒線", "生駒線"],
  ["ikoma", "nabata", "minamiikoma", "higashiyama--nara", "heguri", "oji"],
);
kintetsuData.addLineData(
  "osaka",
  ["近鉄大阪線", "大阪線"],
  [
    "osaka-uehommachi",
    "tsuruhashi",
    "fuse",
    "yamato-takada",
    "yamato-yagi",
    "sakurai--nara",
    "haibara",
    "muroguchi-ono",
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
    "toji",
    "jujo--kintetsu",
    "takeda",
    "kintetsu-tambabashi",
    "momoyamagoryomae",
    "shin-hosono",
    "takanohara",
    "yamato-saidaiji",
  ],
);
kintetsuData.addLineData(
  "keihannna",
  ["近鉄けいはんな線", "けいはんな線"],
  ["takaida", "ikoma", "gakken-kitaikoma", "gakken-naratomigaoka"],
);
kintetsuData.addLineData(
  "tawaramoto",
  ["近鉄田原本線", "田原本線"],
  ["shin-oji", "nishitawaramoto"],
);
kintetsuData.addLineData(
  "domyoji",
  ["近鉄道明寺線", "道明寺線"],
  ["domyoji", "kashiwara"],
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
  "minamiosaka",
  ["近鉄南大阪線", "南大阪線"],
  ["osaka-abenobashi", "domyoji", "furuichi", "takadashi", "kashiharajingumae"],
);
kintetsuData.addLineData(
  "yoshino",
  ["近鉄吉野線", "吉野線"],
  ["kashiharajingumae", "yoshino"],
);

export default kintetsuData;
