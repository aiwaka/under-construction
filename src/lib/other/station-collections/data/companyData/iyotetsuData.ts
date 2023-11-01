import { createCompanyData } from "../utils";

const iyotetsuData = createCompanyData("iyotetsu", "伊予鉄道", ["private"]);

iyotetsuData.addLineData("jonan", "城南線", ["dogo-onsen"]);

export default iyotetsuData;
