import { addressFromStr, type AddressSchema } from "./address";
import { expect, test } from "vitest";

const cases: [string, AddressSchema][] = [
  [
    "奈良県北葛城郡王寺町久度",
    {
      prefecture: "奈良県",
      county: "北葛城郡",
      municipality: "王寺町",
      ward: undefined,
      remainder: "久度",
    },
  ],
  [
    "大阪府大阪市天王寺区悲田院町",
    {
      prefecture: "大阪府",
      county: undefined,
      municipality: "大阪市",
      ward: "天王寺区",
      remainder: "悲田院町",
    },
  ],
  [
    "大阪府柏原市上市一丁目",
    {
      prefecture: "大阪府",
      county: undefined,
      municipality: "柏原市",
      ward: undefined,
      remainder: "上市一丁目",
    },
  ],
];

test.each(cases)("address from str correctness", (str, address) => {
  expect(addressFromStr(str)).toEqual(address);
});
