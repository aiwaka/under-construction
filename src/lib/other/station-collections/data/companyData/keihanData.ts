import { createCompanyData } from "../utils";

const keihanData = createCompanyData("keihan", "京阪電気鉄道", [
  "major-private",
  "private",
]);

keihanData.addLineData("keihan-main", "京阪本線", [
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
  "tofukuji",
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
keihanData.addLineData(
  "ishiyama-sakamoto",
  ["京阪石山坂本線", "石山坂本線"],
  ["ishiyamadera", "keihan-ishiyama", "biwako-hamaotsu"],
);
keihanData.addLineData(
  "keishin",
  ["京阪京津線", "京津線"],
  ["misasagi", "keihan-yamashina", "biwako-hamaotsu"],
);

export default keihanData;
