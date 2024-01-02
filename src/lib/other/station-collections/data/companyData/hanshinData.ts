import { createCompanyData } from "../utils";

const hanshinData = createCompanyData("hanshin", "阪神電気鉄道", [
  "major-private",
  "private",
]);

hanshinData.addLineData(
  "hanshin-main",
  ["阪神本線", "本線"],
  [
    "osaka-umeda--hanshin",
    "amagasaki--hanshin",
    "ashiya--hanshin",
    "kobe-sannnomiya--hanshin",
    "motomachi--hanshin",
  ],
);
hanshinData.addLineData(
  "namba",
  ["阪神なんば線", "なんば線"],
  ["amagasaki--hanshin", "nishikujo", "osaka-namba"],
);

export default hanshinData;
