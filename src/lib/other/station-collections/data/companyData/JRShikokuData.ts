import { createCompanyData } from "../utils";

const JRShikokuData = createCompanyData("JRShikoku", "JR四国", ["JR"]);

JRShikokuData.addLineData("yosan", "予讃線", [
  "takamatsu",
  "tadotsu",
  "matsuyama",
]);
JRShikokuData.addLineData("dosan", "土讃線", ["tadotsu", "kochi"]);
JRShikokuData.addLineData("tokushima", "徳島線", ["gaku", "tokushima"]);
JRShikokuData.addLineData("kotoku", "高徳線", ["takamatsu", "tokushima"]);

export default JRShikokuData;
