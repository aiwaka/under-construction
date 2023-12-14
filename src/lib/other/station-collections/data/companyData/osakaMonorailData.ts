import { createCompanyData } from "../utils";

const osakaMonorailData = createCompanyData(
  "osaka-monorail",
  "大阪モノレール",
  ["semi-public"],
);

osakaMonorailData.addLineData(
  "osaka-monorail",
  ["大阪モノレール線", "本線"],
  ["osaka-airport", "hotarugaike", "shibahara-handaimae", "senri-chuo"],
);

export default osakaMonorailData;
