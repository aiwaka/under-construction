import { createCompanyData } from "../utils";

const JRCentralData = createCompanyData("JRCentral", "JR東海", ["JR"]);

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
JRCentralData.addLineData("takayama", "高山本線", [
  "gifu",
  "mino-ota",
  "gero",
  "takayama",
  "hida-furukawa",
  "inotani",
]);
JRCentralData.addLineData("chuo", "中央本線", ["shiojiri", "nagoya"]);
JRCentralData.addLineData("tokaido-shinkansen", "東海道新幹線", [
  "tokyo",
  "shinagawa",
  "shin-yokohama",
  "toyohashi",
  "nagoya",
  "gifu-hashima",
  "maibara",
  "kyoto",
  "shin-osaka",
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

export default JRCentralData;
