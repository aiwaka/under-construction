import { createCompanyData } from "../utils";

const tokitetsuData = createCompanyData("tokitetsu", "えちごトキめき鉄道", [
  "semi-public",
]);

tokitetsuData.addLineData("hisui-line", "糸魚川ひすいライン", ["itoigawa"]);

export default tokitetsuData;
