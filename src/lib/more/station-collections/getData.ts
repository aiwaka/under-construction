import fs from "node:fs";

import { getCollection } from "astro:content";

import type { StationEntry } from "./types";
import type { DownloadedStationCollection } from "@lib/schema/station";
import { CollectionsStationEntry } from "@lib/schema/station";

/**
 * 駅コレクションのリストを返す.
 */
export const getStationEntries = async (
  downloadedData: DownloadedStationCollection,
): Promise<StationEntry[]> => {
  const allValidStations = await getCollection("station", (entry) => {
    return entry.slug in downloadedData;
  });
  // スキーマに従ったオブジェクトのリストにremarkで追加される情報を付与する
  const stationEntries = await Promise.all(
    allValidStations.map(async (sta) => {
      const collectionsEntry = await CollectionsStationEntry.create(
        sta,
        downloadedData,
      );
      const stationEntry = collectionsEntry.toEntryObject();
      return stationEntry;
    }),
  );
  return stationEntries;
};

export const getLocalStationCollectionsData = () => {
  // ファイル読み込み作業
  const dataDir = import.meta.env.DEV
    ? "../../../generated/station-collections.json"
    : "../../../dist/generated/station-collections.json";
  const resolvedDataPath = new URL(dataDir, import.meta.url);
  if (!fs.existsSync(resolvedDataPath)) {
    const errorMessage =
      "[station-collections/getData.ts]: " +
      "Station collections data does not exist. Check the path settings output to the console." +
      `\n\`import.meta.url\` : ${import.meta.url}` +
      `\nreferencing path (\`path.href\`) : ${resolvedDataPath.href}`;
    throw errorMessage;
  }
  const stationCollectionsData: DownloadedStationCollection = JSON.parse(
    fs.readFileSync(resolvedDataPath, "utf8"),
  );
  return stationCollectionsData;
};
