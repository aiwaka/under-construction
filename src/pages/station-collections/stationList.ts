import fs from "node:fs";
import yaml from "yaml";

import type { LineData } from "@lib/types";
import { getCollection } from "astro:content";

/** 全駅のIDと駅名対応マップ */
const stationDict: { [id: string]: string } = yaml.parse(
  fs.readFileSync("src/pages/station-collections/stationDict.yaml", "utf8"),
);

const createLineObject = (lineName: string, stationIDs: string[]) => {
  return {
    lineName,
    stations: stationIDs.flatMap((id) => {
      if (id in stationDict) {
        return { name: stationDict[id], slug: id };
      } else {
        console.warn(
          `[station/index.astro]: slug id '${id}' undefined (in yaml dict).`,
        );
        return [];
      }
    }),
  } as LineData;
};

/**
 * 行ったことのある駅の路線別データ.
 * 企業ごと、路線ごとに登録される.
 */
const stationList: { [company: string]: { [lineId: string]: LineData } } = {
  JRWest: {
    ako: createLineObject("赤穂線", ["aioi", "banshu-ako", "saidaiji"]),
    etsumiNorth: createLineObject("越美北線", [
      "fukui",
      "echizen-ono",
      "kuzuryuko",
    ]),
    oito: createLineObject("大糸線", ["minamiotari", "itoigawa"]),
    osakaLoop: createLineObject("大阪環状線", [
      "tennnoji",
      "kyobashi",
      "osaka",
    ]),
    osakaEast: createLineObject("おおさか東線", [
      "osaka",
      "jr-awaji",
      "hanaten",
      "takaida-chuo",
      "kyuhoji",
    ]),
    obama: createLineObject("小浜線", ["tsuruga", "mihama"]),
    katamachi: createLineObject("片町線", ["kizu", "hanaten", "kyobashi"]),
    kansai: createLineObject("関西本線", [
      "kameyama",
      "tsuge",
      "iga-ueno",
      "kamo",
      "kizu",
      "nara",
      "oji",
      "kawachi-katakami",
      "kashiwara",
      "tennnoji",
      "jr-namba",
    ]),
    kishin: createLineObject("姫新線", [
      "himeji",
      "harima-shingu",
      "sayo",
      "tsuyama",
    ]),
    kisuki: createLineObject("木次線", [
      "bingo-ochiai",
      "izumo-sakane",
      "izumo-yokota",
      "kisuki",
      "kamonaka",
      "shinji",
    ]),
    kisei: createLineObject("紀勢本線", [
      "shirahama",
      "kushimoto",
      "kii-katsuura",
      "shingu",
    ]),
    kibi: createLineObject("吉備線", ["okayama", "soja"]),
    geibi: createLineObject("芸備線", [
      "niimi",
      "bingo-ochiai",
      "miyoshi",
      "shimofukawa",
      "hiroshima",
    ]),
    sakai: createLineObject("境線", ["yonago", "sakai-minato"]),
    sannin: createLineObject("山陰本線", [
      "kyoto",
      "umekoji-kyotonishi",
      "nijo",
      "ayabe",
      "fukuchiyama",
      "kamikawaguchi",
      "wadayama",
      "hamasaka",
      "tottori",
      "yonago",
      "matsue",
      "shinji",
      "izumoshi",
      "masuda",
      "hatabu",
    ]),
    sanyo: createLineObject("山陽本線", [
      "himeji",
      "aioi",
      "okayama",
      "kurashiki",
      "mihara",
      "shiraichi",
      "saijo",
      "hiroshima",
      "shin-yamaguchi",
      "hatabu",
      "shimonoseki",
    ]),
    takayama: createLineObject("高山本線", ["toyama", "ecchu-yatsuo"]),
    tsuyama: createLineObject("津山線", ["tsuyama", "kanagawa", "okayama"]),
    tokaido: createLineObject("東海道本線", [
      "maibara",
      "otsu",
      "kyoto",
      "kishibe",
      "shin-osaka",
      "osaka",
      "sannnomiya",
    ]),
    nanao: createLineObject("七尾線", ["wakura-onsen"]),
    nara: createLineObject("奈良線", ["kizu", "joyo", "kyoto"]),
    hakubi: createLineObject("伯備線", ["okayama", "soja", "niimi"]),
    hanwa: createLineObject("阪和線", ["tennnoji", "nagai", "wakayama"]),
    bantan: createLineObject("播但線", [
      "himeji",
      "teramae",
      "takeda--jrw",
      "wadayama",
    ]),
    fukuchiyama: createLineObject("福知山線", ["fukuchiyama", "sasayamaguchi"]),
    hokuriku: createLineObject("北陸本線", [
      "maibara",
      "takatsuki--shiga",
      "tsuruga",
      "takefu",
      "fukui",
      "kanazawa",
    ]),
    wakayama: createLineObject("和歌山線", [
      "oji",
      "takada",
      "gojo--jrw",
      "hashimoto",
      "wakayama",
    ]),
  },
  JRCentral: {
    iida: createLineObject("飯田線", [
      "toyohashi",
      "honnnagashino",
      "touei",
      "chubu-tenryu",
      "misakubo",
      "ozore",
      "tenryukyo",
    ]),
    kansai: createLineObject("関西本線", ["kameyama", "yokkaichi", "nagoya"]),
    kisei: createLineObject("紀勢本線", [
      "shingu",
      "kumanoshi",
      "kii-nagashima",
      "taki",
      "matsusaka",
      "kameyama",
    ]),
    tokaido: createLineObject("東海道本線", [
      "toyohashi",
      "nagoya",
      "owari-ichinomiya",
      "gifu",
      "ogaki",
      "maibara",
    ]),
    meisho: createLineObject("名松線", ["matsusaka", "ieki", "ise-okitsu"]),
  },
  JREast: {
    oito: createLineObject("大糸線", [
      "matsumoto",
      "kitamatsumoto",
      "shinano-omachi",
      "minamiotari",
    ]),
    shinonoi: createLineObject("篠ノ井線", ["shiojiri", "matsumoto"]),
    chuo: createLineObject("中央本線", [
      "shinjuku",
      "takao",
      "kobuchizawa",
      "kofu",
      "okaya",
      "shiojiri",
    ]),
  },
  ainokaze: {
    ainokaze: createLineObject("あいの風とやま鉄道線", ["toyama", "tomari"]),
  },
  tokimeki: {
    "hisui-line": createLineObject("糸魚川ひすいライン", ["itoigawa"]),
  },
  kintetsu: {
    osaka: createLineObject("近鉄大阪線", [
      "osaka-uehommachi",
      "tsuruhashi",
      "fuse",
      "yamato-takada",
      "yamato-yagi",
      "ise-nakagawa",
    ]),
    nagano: createLineObject("近鉄長野線", ["furuichi", "kawachi-nagano"]),
    nara: createLineObject("近鉄奈良線", [
      "osaka-namba",
      "kintetsu-nippombashi",
      "tsuruhashi",
      "fuse",
      "ishikiri",
      "ikoma",
      "gakuenmae",
      "yamato-saidaiji",
      "kintetsu-nara",
    ]),
  },
  keihan: {
    keihan: createLineObject("京阪本線", [
      "yodoyabashi",
      "kitahama",
      "temmabashi",
      "kyobashi",
      "noe",
      "hirakatashi",
      "tambabashi",
      "fushimiinari",
      "tobakaido",
      "shichijo",
      "gion-shijo",
      "sanjo",
      "jingumarutamachi",
      "demachiyanagi",
    ]),
  },

  ichibata: {
    kitamatsue: createLineObject("北松江線", [
      "dentetsu-izumoshi",
      "kawato",
      "matsue-shinjiko-onsen",
    ]),
    taisha: createLineObject("大社線", ["kawato", "izumotaishamae"]),
  },
};

const stationCollections = await getCollection("station");
const stationIDsInCollections = stationCollections.map((sta) => sta.slug);
/** データに見当たらないものはdisabledとする */
Object.values(stationList).forEach((lines) => {
  Object.values(lines).forEach((line) => {
    line.stations.forEach((sta) => {
      if (!(stationIDsInCollections as readonly string[]).includes(sta.slug)) {
        sta["disabled"] = true;
      }
    });
  });
});

export default stationList;
