import type { CollectionStationSchema } from "@lib/schema/station";
import type { LineDataSchema, CompanyDataSchema } from "@lib/types";

export type StationDict = Record<string, CollectionStationSchema>;

export class CompanyData implements CompanyDataSchema {
  companyId: string;
  companyName: string;
  lines: Record<string, LineDataSchema>;
  stationDict: StationDict;
  tag: Set<string>;

  constructor(
    companyId: string,
    companyName: string,
    stationDict: StationDict,
    tag: Iterable<string> = [],
  ) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.lines = {};
    this.stationDict = stationDict;
    this.tag = new Set(tag);
  }

  /**
   *
   * @param lineId 路線id
   * @param lineName 路線名. タプルの場合は2つめは正式名称を登録する.
   * @param stationIDs 駅IDの配列
   */
  public addLineData(
    lineId: string,
    lineName: string | [string, string],
    stationIDs: string[],
  ) {
    const displayLineName =
      typeof lineName === "object" ? lineName[0] : lineName;
    const formalLineName =
      typeof lineName === "object" ? lineName[1] : lineName;
    const lineObj = {
      lineId,
      lineName: displayLineName,
      stations: stationIDs.flatMap((id) => {
        if (id in this.stationDict) {
          // 各エントリーの所属路線に含まれていないが路線の駅一覧には含まれていない場合がある.
          // この場合は所属ではないが系統などに含まれるとみなしてそのフラグを立てる.
          const linesByStationData = this.stationDict[id].lines;
          const notBelongsToLine = !linesByStationData.includes(lineId);
          return {
            name: this.stationDict[id].name,
            slug: id,
            disabled: false,
            notBelongsToLine,
          };
        } else {
          // console.warn(
          //   `[station/index.astro]: slug id '${id}' undefined.`,
          // );
          return [];
        }
      }),
      formalLineName,
    } satisfies LineDataSchema;
    this.lines[lineId] = lineObj;
  }
}

// const stationCollections = await getCollection("station");
// const stationDict = Object.fromEntries(
//   stationCollections.map((sta) => [sta.slug, sta.data.name]),
// );
