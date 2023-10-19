import { createCompanyData } from "../utils";

const JRWestData = createCompanyData("JRWest", "JR西日本", ["JR"]);

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
  "kamo--kyoto",
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
JRWestData.addLineData("kusatsu", "草津線", ["kusatsu", "kibukawa", "tsuge"]);
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
JRWestData.addLineData("sakai", "境線", ["yonago", "sakaiminato"]);
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
  "kusatsu",
  "ishiyama",
  "otsu",
  "yamashina",
  "kyoto",
  "kishibe",
  "shin-osaka",
  "osaka",
  "nishinomiya",
  "sannnomiya",
]);
JRWestData.addLineData("nanao", "七尾線", ["kanazawa", "wakura-onsen"]);
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

export default JRWestData;
