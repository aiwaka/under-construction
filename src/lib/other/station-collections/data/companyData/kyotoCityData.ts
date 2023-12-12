import { createCompanyData } from "../utils";

const kyotoCityData = createCompanyData("kyoto-city", "京都市交通局", [
  "municipal",
  "subway",
]);

kyotoCityData.addLineData(
  "kyoto-tozai",
  ["京都市営地下鉄東西線", "東西線"],
  [
    "nijojomae",
    "karasuma-oike",
    "kyotoshiyakushomae",
    "sanjo-keihan",
    "higashiyama--kyoto",
    "misasagi",
    "yamashina",
    "rokujizo",
  ],
);
kyotoCityData.addLineData(
  "karasuma",
  ["京都市営地下鉄烏丸線", "烏丸線"],
  [
    "kitaoji",
    "kuramaguchi",
    "imadegawa",
    "karasuma-oike",
    "shijo",
    "kyoto",
    "kujo--kyoto",
    "jujo--karasuma",
    "takeda",
  ],
);

export default kyotoCityData;
