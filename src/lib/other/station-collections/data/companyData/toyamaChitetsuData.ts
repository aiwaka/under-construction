import { createCompanyData } from "../utils";

const toyamaChitetsuData = createCompanyData(
  "toyama-chitetsu",
  "富山地方鉄道",
  ["private"],
);

toyamaChitetsuData.addLineData(
  "chitetsu-main",
  ["富山地方鉄道本線", "本線"],
  ["dentetsu-toyama"],
);
toyamaChitetsuData.addLineData(
  "fujikoshi",
  ["富山地鉄不二越線", "不二越線"],
  ["dentetsu-toyama", "minamitoyama"],
);
toyamaChitetsuData.addLineData(
  "kamidaki",
  ["富山地鉄上滝線", "上滝線"],
  ["minamitoyama"],
);

toyamaChitetsuData.addLineData("toyama-tram-main", "富山軌道線本線", [
  "minamitoyamaeki-mae",
  "nishicho",
  "dentetsu-toyama-esta-mae",
  "toyama-sta",
]);
toyamaChitetsuData.addLineData("toyama-tram-branch", "富山軌道線支線", [
  "dentetsu-toyama-esta-mae",
  // "shintomicho"
]);
toyamaChitetsuData.addLineData("toyama-tram-ns", "富山駅南北接続線", [
  "toyama-sta",
  // "shintomicho"
]);
toyamaChitetsuData.addLineData(
  "toyama-tram-toshin",
  ["富山軌道線富山都心線", "富山都心線"],
  ["nishicho"],
);
toyamaChitetsuData.addLineData("toyama-tram-toyama-port", "富山港線", [
  "toyama-sta",
]);

export default toyamaChitetsuData;
