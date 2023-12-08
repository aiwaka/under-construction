/**
 * 駅が属する路線ごとの隣接駅を扱うための型
 */
export interface SiblingStationType {
  lineData: LineDataSchema;
  prev: StationDataSchema | null;
  next: StationDataSchema | null;
}

/**
 * StationEntryは駅の情報を表すが、こちらは処理する上でのデータとする。
 */
export interface StationDataSchema {
  name: string;
  slug: string;
  disabled: boolean;
  notBelongsToLine: boolean;
}

export interface LineDataSchema {
  lineId: string;
  lineName: string;
  stations: StationDataSchema[];
  formalLineName: string;
}

export interface CompanyDataSchema {
  companyId: string;
  companyName: string;
  lines: {
    [lineId: string]: LineDataSchema;
  };
  tag: Set<string>;
}
