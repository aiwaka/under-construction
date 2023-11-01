import { createCompanyData } from "../utils";

const JREastData = createCompanyData("JREast", "JR東日本", ["JR"]);

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

export default JREastData;
