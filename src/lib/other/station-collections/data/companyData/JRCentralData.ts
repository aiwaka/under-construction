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
