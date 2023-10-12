import { createCompanyData } from "../utils";

const keihanData = createCompanyData("keihan", "京阪電気鉄道", [
  "major-private",
  "private",
]);

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
export default keihanData;
