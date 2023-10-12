import { createCompanyData } from "../utils";

const ichibataData = createCompanyData("ichibata", "一畑電気鉄道", ["private"]);

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

export default ichibataData;
