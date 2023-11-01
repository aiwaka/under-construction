import { createCompanyData } from "../utils";

const ainokazeData = createCompanyData("ainokaze", "あいの風とやま鉄道", [
  "semi-public",
]);

ainokazeData.addLineData("ainokaze", "あいの風とやま鉄道線", [
  "toyama",
  "tomari",
]);

export default ainokazeData;
