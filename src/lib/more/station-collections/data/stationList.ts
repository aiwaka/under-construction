import { getCollection } from "astro:content";

import { getDownloadedStationCollectionsData } from "@lib/more/station-collections";
import type { CompanyDataSchema } from "@lib/types";
import { CompanyData } from "./dataclasses";

/** 全駅のIDと駅名対応マップ */
// const stationDict: { [id: string]: string } = yaml.parse(
//   fs.readFileSync("src/pages/station-collections/stationDict.yaml", "utf8"),
// );
const stationCollections = await getCollection("station");
const stationDict = Object.fromEntries(
  stationCollections.map((sta) => [sta.slug, sta.data]),
);

const JRWestData = new CompanyData("JRWest", "JR西日本", stationDict, ["JR"]);
const JRCentralData = new CompanyData("JRCentral", "JR東海", stationDict, [
  "JR",
]);
const JREastData = new CompanyData("JREast", "JR東日本", stationDict, ["JR"]);
const ainokazeData = new CompanyData(
  "ainokaze",
  "あいの風とやま鉄道",
  stationDict,
  ["semi-public"],
);
const tokitetsuData = new CompanyData(
  "tokitetsu",
  "えちごトキめき鉄道",
  stationDict,
  ["semi-public"],
);
const kintetsuData = new CompanyData("kintetsu", "近畿日本鉄道", stationDict, [
  "major-private",
  "private",
]);
const keihanData = new CompanyData("keihan", "京阪電気鉄道", stationDict, [
  "major-private",
  "private",
]);
const ichibataData = new CompanyData("ichibata", "一畑電鉄", stationDict, [
  "private",
]);

JRWestData.addLineData("ako", "赤穂線", ["aioi", "banshu-ako", "saidaiji"]);
JRWestData.addLineData("etsumi-north", "越美北線", [
  "fukui",
  "echizen-ono",
  "kuzuryuko",
]);
JRWestData.addLineData("oito", "大糸線", ["minamiotari", "itoigawa"]);
JRWestData.addLineData("osaka-loop", "大阪環状線", [
  "tennnoji",
  "kyobashi",
  "osaka",
]);
JRWestData.addLineData("osaka-east", "おおさか東線", [
  "osaka",
  "jr-awaji",
  "hanaten",
  "takaida-chuo",
  "kyuhoji",
]);
JRWestData.addLineData("obama", "小浜線", ["tsuruga", "mihama"]);
JRWestData.addLineData("katamachi", "片町線", [
  "kizu",
  "hosono",
  "doshishamae",
  "hanaten",
  "kyobashi",
]);
JRWestData.addLineData("kansai", "関西本線", [
  "kameyama",
  "tsuge",
  "iga-ueno",
  "kamo",
  "kizu",
  "nara",
  "oji",
  "kawachi-katakami",
  "kashiwara",
  "tennnoji",
  "jr-namba",
]);
JRWestData.addLineData("kishin", "姫新線", [
  "himeji",
  "harima-shingu",
  "sayo",
  "tsuyama",
]);
JRWestData.addLineData("kisuki", "木次線", [
  "bingo-ochiai",
  "izumo-sakane",
  "izumo-yokota",
  "kisuki",
  "kamonaka",
  "shinji",
]);
JRWestData.addLineData("kisei", "紀勢本線", [
  "shirahama",
  "kushimoto",
  "kii-katsuura",
  "shingu",
]);
JRWestData.addLineData("kibi", "吉備線", ["okayama", "soja"]);
JRWestData.addLineData("geibi", "芸備線", [
  "niimi",
  "bingo-ochiai",
  "miyoshi",
  "shimofukawa",
  "hiroshima",
]);
JRWestData.addLineData("kosei", "湖西線", [
  "kyoto",
  "yamashina",
  "omi-maiko",
  "omi-imazu",
  "omi-shiotsu",
]);
JRWestData.addLineData("sakai", "境線", ["yonago", "sakai-minato"]);
JRWestData.addLineData("sannin", "山陰本線", [
  "kyoto",
  "umekoji-kyotonishi",
  "nijo",
  "ayabe",
  "fukuchiyama",
  "kamikawaguchi",
  "wadayama",
  "hamasaka",
  "tottori",
  "yonago",
  "matsue",
  "shinji",
  "izumoshi",
  "masuda",
  "hatabu",
]);
JRWestData.addLineData("sanyo", "山陽本線", [
  "himeji",
  "aioi",
  "okayama",
  "kurashiki",
  "mihara",
  "shiraichi",
  "saijo",
  "hiroshima",
  "shin-yamaguchi",
  "hatabu",
  "shimonoseki",
]);
JRWestData.addLineData("takayama", "高山本線", ["toyama", "ecchu-yatsuo"]);
JRWestData.addLineData("tsuyama", "津山線", ["tsuyama", "kanagawa", "okayama"]);
JRWestData.addLineData("tokaido", "東海道本線", [
  "maibara",
  "otsu",
  "kyoto",
  "kishibe",
  "shin-osaka",
  "osaka",
  "sannnomiya",
]);
JRWestData.addLineData("nanao", "七尾線", ["wakura-onsen"]);
JRWestData.addLineData("nara", "奈良線", [
  "kizu",
  "joyo",
  "uji",
  "tofukuji",
  "kyoto",
]);
JRWestData.addLineData("hakubi", "伯備線", ["okayama", "soja", "niimi"]);
JRWestData.addLineData("hanwa", "阪和線", ["tennnoji", "nagai", "wakayama"]);
JRWestData.addLineData("bantan", "播但線", [
  "himeji",
  "teramae",
  "takeda--jrw",
  "wadayama",
]);
JRWestData.addLineData("fukuchiyama", "福知山線", [
  "fukuchiyama",
  "sasayamaguchi",
]);
JRWestData.addLineData("hokuriku", "北陸本線", [
  "maibara",
  "takatsuki--shiga",
  "omi-shiotsu",
  "tsuruga",
  "takefu",
  "fukui",
  "awazu",
  "komatsu",
  "kanazawa",
]);
JRWestData.addLineData("wakayama", "和歌山線", [
  "oji",
  "takada",
  "gojo--jrw",
  "hashimoto",
  "wakayama",
]);

JRCentralData.addLineData("iida", "飯田線", [
  "toyohashi",
  "honnnagashino",
  "touei",
  "chubu-tenryu",
  "misakubo",
  "ozore",
  "tenryukyo",
]);
JRCentralData.addLineData("kansai", "関西本線", [
  "nagoya",
  "yokkaichi",
  "kameyama",
]);
JRCentralData.addLineData("kisei", "紀勢本線", [
  "shingu",
  "kumanoshi",
  "kii-nagashima",
  "taki",
  "matsusaka",
  "kameyama",
]);
JRCentralData.addLineData("tokaido", "東海道本線", [
  "toyohashi",
  "nagoya",
  "owari-ichinomiya",
  "gifu",
  "ogaki",
  "maibara",
]);
JRCentralData.addLineData("meisho", "名松線", [
  "matsusaka",
  "ieki",
  "ise-okitsu",
]);

JREastData.addLineData("oito", "大糸線", [
  "matsumoto",
  "kitamatsumoto",
  "shinano-omachi",
  "minamiotari",
]),
  JREastData.addLineData("shinonoi", "篠ノ井線", ["shiojiri", "matsumoto"]),
  JREastData.addLineData("chuo", "中央本線", [
    "shinjuku",
    "takao",
    "kobuchizawa",
    "kofu",
    "okaya",
    "shiojiri",
  ]),
  ainokazeData.addLineData("ainokaze", "あいの風とやま鉄道線", [
    "toyama",
    "tomari",
  ]);
tokitetsuData.addLineData("hisui-line", "糸魚川ひすいライン", ["itoigawa"]);

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
  "kintetsu-kyoto",
  ["近鉄京都線", "京都線"],
  [
    "yamato-saidaiji",
    "takanohara",
    "shin-hosono",
    "kintetsu-tambabashi",
    "jujo--kintetsu",
    "kyoto",
  ],
);
keihanData.addLineData("keihan", "京阪本線", [
  "yodoyabashi",
  "kitahama",
  "temmabashi",
  "kyobashi",
  "noe",
  "hirakatashi",
  "chushojima",
  "tambabashi",
  "fushimiinari",
  "tobakaido",
  "shichijo",
  "gion-shijo",
  "sanjo",
  "jingumarutamachi",
  "demachiyanagi",
]);
keihanData.addLineData(
  "uji",
  ["京阪宇治線", "宇治線"],
  ["chushojima", "uji--keihan"],
);

ichibataData.addLineData("kitamatsue", "北松江線", [
  "dentetsu-izumoshi",
  "kawato",
  "matsue-shinjiko-onsen",
]);
ichibataData.addLineData(
  "taisha",
  ["一畑電鉄大社線", "大社線"],
  ["kawato", "izumotaishamae"],
);

const stationList: { [companyId: string]: CompanyDataSchema } = {};

const addCompanyData = (...companyData: CompanyData[]) => {
  for (const data of companyData) {
    stationList[data.companyId] = data;
  }
};

addCompanyData(JRWestData);
addCompanyData(JRCentralData);
addCompanyData(JREastData);
addCompanyData(ainokazeData);
addCompanyData(tokitetsuData);
addCompanyData(kintetsuData);
addCompanyData(keihanData);
addCompanyData(ichibataData);

const downloadedData = getDownloadedStationCollectionsData();
/** リモートのデータに無いものはdisabledとする */
Object.values(stationList).forEach((company) => {
  Object.values(company.lines).forEach((line) => {
    line.stations.forEach((sta) => {
      if (
        !Object.keys(downloadedData).includes(sta.slug) ||
        !(sta.slug in stationDict)
      ) {
        sta["disabled"] = true;
      }
    });
  });
});

export default stationList;
