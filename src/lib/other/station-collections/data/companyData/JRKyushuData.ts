import { createCompanyData } from "../utils";

const JRKyushuData = createCompanyData("JRKyushu", "JR九州", ["JR"]);

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

export default JRKyushuData;
