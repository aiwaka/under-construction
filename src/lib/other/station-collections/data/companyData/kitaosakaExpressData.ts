import { createCompanyData } from "../utils";

const kitaosakaExpressData = createCompanyData(
  "kitaosaka-express",
  "北大阪急行電鉄",
  ["semi-public"],
);

kitaosakaExpressData.addLineData(
  "kita-kyu-namboku",
  ["北大阪急行電鉄南北線", "南北線"],
  ["senri-chuo", "ryokuchi-koen", "esaka"],
);

export default kitaosakaExpressData;
