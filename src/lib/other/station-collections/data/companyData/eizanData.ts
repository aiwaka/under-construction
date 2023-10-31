import { createCompanyData } from "../utils";

const eizanData = createCompanyData("eizan", "叡山電鉄", ["private"]);

eizanData.addLineData("eizan", "叡山本線", [
  "demachiyanagi",
  "chayama-kyotogeijutsudaigaku",
]);

export default eizanData;