export interface LineData {
  lineName: string;
  stations: {
    name: string;
    slug: string;
    disabled?: boolean;
  }[];
}
