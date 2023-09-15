import type { LineData } from "@lib/types";
import { getCollection } from "astro:content";

const createLineObject = (
  lineName: string,
  ...stations: [string, string][]
) => {
  return {
    lineName,
    stations: stations.map((st) => {
      return { name: st[0], slug: st[1] };
    }),
  } as LineData;
};

/** 行ったことのある駅データ */
const stationList: { [company: string]: { [lineId: string]: LineData } } = {
  JRWest: {
    ako: createLineObject(
      "赤穂線",
      ["播州赤穂", "banshu-ako"],
      ["西大寺", "saidaiji"],
    ),
    etsumiNorth: createLineObject(
      "越美北線",
      ["福井", "fukui"],
      ["越前大野", "echizen-ono"],
      ["九頭竜湖", "kuzuryuko"],
    ),
    oito: createLineObject(
      "大糸線",
      ["南小谷", "minami-otari"],
      ["糸魚川", "itoigawa"],
    ),
    osakaLoop: createLineObject(
      "大阪環状線",
      ["天王寺", "tennnoji"],
      ["大阪", "osaka"],
    ),
    osakaEast: createLineObject("おおさか東線", ["大阪", "osaka"]),
    obama: createLineObject("小浜線", ["敦賀", "tsuruga"], ["美浜", "mihama"]),
    katamachi: createLineObject("片町線", ["木津", "kizu"]),
    kansai: createLineObject(
      "関西本線",
      ["亀山", "kameyama"],
      ["柘植", "tsuge"],
      ["伊賀上野", "iga-ueno"],
      ["加茂", "kamo"],
      ["木津", "kizu"],
      ["奈良", "nara"],
      ["王寺", "oji--jrw"],
      ["柏原", "kashiwara"],
      ["天王寺", "tennnoji"],
      ["JR難波", "jr-namba"],
    ),
    kishin: createLineObject(
      "姫新線",
      ["姫路", "himeji"],
      ["播磨新宮", "harima-singu"],
      ["佐用", "sayo"],
      ["津山", "tsuyama"],
    ),
    kisei: createLineObject(
      "紀勢本線",
      ["白浜", "shirahama"],
      ["串本", "kushimoto"],
      ["紀伊勝浦", "kii-katsuura"],
      ["新宮", "singu"],
    ),
    kure: createLineObject("呉線", ["三原", "mihara"]),
    geibi: createLineObject(
      "芸備線",
      ["新見", "niimi"],
      ["備後落合", "bingo-ochiai"],
      ["三次", "miyoshi"],
    ),
    sakai: createLineObject(
      "境線",
      ["米子", "yonago"],
      ["境港", "sakai-minato"],
    ),
    sannin: createLineObject(
      "山陰本線",
      ["京都", "kyoto"],
      ["福知山", "fukuchiyama"],
      ["上川口", "kamikawaguchi"],
      ["和田山", "wadayama"],
      ["浜坂", "hamasaka"],
      ["鳥取", "tottori"],
      ["米子", "yonago"],
      ["松江", "matsue"],
      ["出雲市", "izumoshi"],
      ["幡生", "hatabu"],
    ),
    sanyo: createLineObject(
      "山陽本線",
      ["姫路", "himeji"],
      ["相生", "aioi"],
      ["岡山", "okayama"],
      ["倉敷", "kurashiki"],
      ["三原", "mihara"],
      ["白市", "shiraichi"],
      ["西条", "saijo"],
      ["広島", "hiroshima"],
      ["下関", "shimonoseki"],
    ),
    takayama: createLineObject(
      "高山本線",
      ["富山", "toyama"],
      ["越中八尾", "echu-yatsuo"],
    ),
    tsuyama: createLineObject(
      "津山線",
      ["津山", "tsuyama"],
      ["金川", "kanagawa"],
      ["岡山", "okayama"],
    ),
    tokaido: createLineObject(
      "東海道本線",
      ["米原", "maibara"],
      ["大津", "otsu"],
      ["京都", "kyoto"],
      ["大阪", "osaka"],
      ["三ノ宮", "sannnomiya"],
    ),
    nanao: createLineObject("七尾線", ["和倉温泉", "wakura-onsenn"]),
    nara: createLineObject(
      "奈良線",
      ["木津", "kizu"],
      ["城陽", "joyo"],
      ["京都", "kyoto"],
    ),
    hakubi: createLineObject("伯備線", ["岡山", "okayama"], ["新見", "niimi"]),
    hanwa: createLineObject("阪和線", ["天王寺", "tennnoji"]),
    bantan: createLineObject(
      "播但線",
      ["姫路", "himeji"],
      ["寺前", "teramae"],
      ["竹田", "takeda-jrw"],
      ["和田山", "wadayama"],
    ),
    fukuchiyama: createLineObject(
      "福知山線",
      ["福知山", "fukuchiyama"],
      ["篠山口", "sasayamaguchi"],
    ),
    hokuriku: createLineObject(
      "北陸本線",
      ["金沢", "kanazawa"],
      ["福井", "fukui"],
      ["武生", "takefu"],
      ["敦賀", "tsuruga"],
      ["高月", "takatsuki--shiga"],
    ),
    wakayama: createLineObject(
      "和歌山線",
      ["王寺", "oji--jrw"],
      ["高田", "takada"],
      ["五条", "gojo-jrw"],
    ),
  },
  JRCentral: {
    iida: createLineObject(
      "飯田線",
      ["豊橋", "toyohashi"],
      ["本長篠", "honnnagashino"],
      ["東栄", "touei"],
      ["中部天竜", "tyubu-tenryu"],
      ["水窪", "misakubo"],
      ["天竜峡", "tenryukyo"],
    ),
    kansai: createLineObject(
      "関西本線",
      ["亀山", "kameyama"],
      ["四日市", "yokkaichi"],
      ["名古屋", "nagoya"],
    ),
    kisei: createLineObject(
      "紀勢本線",
      ["新宮", "singu"],
      ["熊野市", "kumanoshi"],
      ["新鹿", "atashika"],
      ["紀伊長島", "kii-nagashima"],
      ["多気", "taki"],
      ["松阪", "matsusaka"],
      ["亀山", "kameyama"],
    ),
    tokaido: createLineObject(
      "東海道本線",
      ["豊橋", "toyohashi"],
      ["名古屋", "nagoya"],
      ["尾張一宮", "owari-ichinomiya"],
      ["岐阜", "gifu"],
      ["大垣", "ogaki"],
      ["米原", "maibara"],
    ),
    meisho: createLineObject(
      "名松線",
      ["松阪", "matsusaka"],
      ["家城", "ieki"],
      ["伊勢奥津", "ise-okitsu"],
    ),
  },
};

const stationCollections = await getCollection("station");
const staIDs = stationCollections.map((sta) => sta.slug);
/** データに見当たらないものはdisabledとする */
Object.values(stationList).forEach((lines) => {
  Object.values(lines).forEach((line) => {
    line.stations.forEach((sta) => {
      if (!(staIDs as readonly string[]).includes(sta.slug)) {
        sta["disabled"] = true;
      }
    });
  });
});

export default stationList;
