import fs from "node:fs";
import type { StationCollectionsSchema } from "src/integrations/load-station-collections";

export const getLocalStationCollectionsData = () => {
  // ファイル読み込み作業
  const dataDir = import.meta.env.DEV
    ? "../../../generated/station-collections.json"
    : "../../../dist/generated/station-collections.json";
  const resolvedDataPath = new URL(dataDir, import.meta.url);
  if (!fs.existsSync(resolvedDataPath)) {
    const errorMessage =
      "Station collections data does not exist. Check the path settings output to the console." +
      `\n\`import.meta.url\` : ${import.meta.url}` +
      `\nreferencing path (\`path.href\`) : ${resolvedDataPath.href}`;
    throw errorMessage;
  }
  const stationCollectionsData: StationCollectionsSchema = JSON.parse(
    fs.readFileSync(resolvedDataPath, "utf8"),
  );
  return stationCollectionsData;
};
