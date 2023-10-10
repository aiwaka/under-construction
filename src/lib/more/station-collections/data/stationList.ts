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

const createCompanyData = (id: string, name: string, tags: string[]) => {
  return new CompanyData(id, name, stationDict, tags);
};

// 企業データを定義
const JRWestData = createCompanyData("JRWest", "JR西日本", ["JR"]);
const JRCentralData = createCompanyData("JRCentral", "JR東海", ["JR"]);
const JREastData = createCompanyData("JREast", "JR東日本", ["JR"]);
const JRShikokuData = createCompanyData("JRShikoku", "JR四国", ["JR"]);
const JRKyushuData = createCompanyData("JRKyushu", "JR九州", ["JR"]);
const ainokazeData = createCompanyData("ainokaze", "あいの風とやま鉄道", [
  "semi-public",
]);
const tokitetsuData = createCompanyData("tokitetsu", "えちごトキめき鉄道", [
  "semi-public",
]);
const kintetsuData = createCompanyData("kintetsu", "近畿日本鉄道", [
  "major-private",
  "private",
]);
const keihanData = createCompanyData("keihan", "京阪電気鉄道", [
  "major-private",
  "private",
]);
const ichibataData = createCompanyData("ichibata", "一畑電鉄", ["private"]);
const eizanData = createCompanyData("eizan", "叡山電鉄", ["private"]);
const iyotetsuData = createCompanyData("iyotetsu", "伊予鉄道", ["private"]);
const kumamotoDentetsuData = createCompanyData("kumamoto", "熊本電鉄", [
  "private",
]);

// ここから駅追加
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
  "wakayamashi",
  "wakayama",
  "kainan",
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
  "tsuruga",
]);
JRWestData.addLineData("sakai", "境線", ["yonago", "sakai-minato"]);
JRWestData.addLineData("sakurai", "桜井線", ["takada", "kanahashi", "nara"]);
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
  "yunotsu",
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
  "nishinomiya",
  "sannnomiya",
]);
JRWestData.addLineData("nanao", "七尾線", ["wakura-onsen"]);
JRWestData.addLineData("nara", "奈良線", [
  "nara",
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
  "osaka",
  "sasayamaguchi",
  "fukuchiyama",
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
  "yamato-shinjo",
  "gojo--jrw",
  "hashimoto--wakayama",
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
  "okaya",
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
]);
JREastData.addLineData("shinonoi", "篠ノ井線", ["shiojiri", "matsumoto"]);
JREastData.addLineData("chuo", "中央本線", [
  "shinjuku",
  "takao",
  "kobuchizawa",
  "kofu",
  "okaya",
  "shiojiri",
]);

JRShikokuData.addLineData("yosan", "予讃線", [
  "takamatsu",
  "tadotsu",
  "matsuyama",
]);
JRShikokuData.addLineData("dosan", "土讃線", ["tadotsu", "kochi"]);
JRShikokuData.addLineData("tokushima", "徳島線", ["gaku", "tokushima"]);
JRShikokuData.addLineData("kotoku", "高徳線", ["takamatsu", "tokushima"]);

JRKyushuData.addLineData("hohi", "豊肥本線", ["kumamoto", "musashizuka"]);
JRKyushuData.addLineData("kagoshima", "鹿児島本線", [
  "mojiko",
  "moji",
  "kokura",
  "orio",
  "hakata",
  "kurume",
  "kamikumamoto",
  "kumamoto",
]);
JRKyushuData.addLineData("sanyo", "山陽本線", ["shimonoseki", "moji"]);

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
  "oto",
  ["京阪鴨東線", "鴨東線"],
  ["sanjo", "jingumarutamachi", "demachiyanagi"],
);
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
eizanData.addLineData("eizan", "叡山本線", [
  "demachiyanagi",
  "chayama-kyotogeijutsudaigaku",
]);
iyotetsuData.addLineData("jonan", "城南線", ["dogo-onsen"]);
kumamotoDentetsuData.addLineData(
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
kumamotoDentetsuData.addLineData(
  "fujisaki",
  ["熊本電鉄藤崎線", "藤崎線"],
  ["kitakumamoto", "fujisakigumae"],
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
addCompanyData(JRShikokuData);
addCompanyData(JRKyushuData);
addCompanyData(ainokazeData);
addCompanyData(tokitetsuData);
addCompanyData(kintetsuData);
addCompanyData(keihanData);
addCompanyData(ichibataData);
addCompanyData(eizanData);
addCompanyData(iyotetsuData);
addCompanyData(kumamotoDentetsuData);

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
