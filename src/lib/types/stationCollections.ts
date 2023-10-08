export interface LineDataSchema {
  lineName: string;
  stations: {
    name: string;
    slug: string;
    disabled?: boolean;
    notBelongs: boolean;
  }[];
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
