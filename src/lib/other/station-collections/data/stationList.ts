import { CompanyData } from "./dataclasses";
import { stationDict } from "./utils";

import { getDownloadedStationCollectionsData } from "@lib/other/station-collections";
import type { CompanyDataSchema } from "@lib/types";

import JRWestData from "./companyData/JRWestData";
import JRCentralData from "./companyData/JRCentralData";
import JREastData from "./companyData/JREastData";
import JRShikokuData from "./companyData/JRShikokuData";
import JRKyushuData from "./companyData/JRKyushuData";
import ainokazeData from "./companyData/ainokazeData";
import tokitetsuData from "./companyData/tokitetsuData";
import kintetsuData from "./companyData/kintetsuData";
import keihanData from "./companyData/keihanData";
import ichibataData from "./companyData/ichibataData";
import eizanData from "./companyData/eizanData";
import iyotetsuData from "./companyData/iyotetsuData";
import kikudenData from "./companyData/kikudenData";
import kyotoCityData from "./companyData/kyotoCityData";
import osakaMetroData from "./companyData/osakaMetroData";
import osakaMonorailData from "./companyData/osakaMonorailData";
import kitaosakaExpressData from "./companyData/kitaosakaExpressData";
import nankaiData from "./companyData/nankaiData";

const stationList: { [companyId: string]: CompanyDataSchema } = {};

const addCompanyData = (...companyData: CompanyData[]) => {
  for (const data of companyData) {
    stationList[data.companyId] = data;
  }
};

addCompanyData(JRWestData);
addCompanyData(JRCentralData);
addCompanyData(JREastData);
addCompanyData(JRShikokuData);
addCompanyData(JRKyushuData);
addCompanyData(ainokazeData);
addCompanyData(tokitetsuData);
addCompanyData(kintetsuData);
addCompanyData(keihanData);
addCompanyData(nankaiData);
addCompanyData(ichibataData);
addCompanyData(eizanData);
addCompanyData(iyotetsuData);
addCompanyData(kikudenData);
addCompanyData(kyotoCityData);
addCompanyData(osakaMetroData);
addCompanyData(osakaMonorailData);
addCompanyData(kitaosakaExpressData);

const downloadedData = getDownloadedStationCollectionsData();
/** リモートのデータに無いものはdisabledとする */
Object.values(stationList).forEach((company) => {
  Object.values(company.lines).forEach((line) => {
    line.stations.forEach((sta) => {
      if (
        !Object.keys(downloadedData).includes(sta.slug) ||
        !(sta.slug in stationDict)
      ) {
        sta.disabled = true;
      }
    });
  });
});

export default stationList;
