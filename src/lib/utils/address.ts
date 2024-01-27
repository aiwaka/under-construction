export interface AddressSchema {
  prefecture: string;
  county?: string;
  municipality: string;
  ward?: string;
  remainder: string;
}

export class Address implements AddressSchema {
  prefecture: string;
  county?: string;
  municipality: string;
  ward?: string;
  remainder: string;

  constructor(address: AddressSchema) {
    this.prefecture = address.prefecture;
    this.county = address.county;
    this.municipality = address.municipality;
    this.ward = address.ward;
    this.remainder = address.remainder;
  }
}

/**
 * 文字列から住所オブジェクトにする。
 * 場当たり的に更新していく。
 * 追加したらテストを書くこと -> `./address.test.ts`。
 */
export const addressFromStr = (addressStr: string): AddressSchema | null => {
  const re = /(...??[都道府県])(.+?[郡])?(.+?[市町村])(.+?[区])?(.+)/i;
  const matched = addressStr.match(re);
  if (matched === null) return null;
  const prefecture = matched[1] ?? "_県";
  const county = matched[2];
  const municipality = matched[3] ?? "_市";
  const ward = matched[4];
  const remainder = matched[5];
  return {
    prefecture,
    county,
    municipality,
    ward,
    remainder,
  };
};
